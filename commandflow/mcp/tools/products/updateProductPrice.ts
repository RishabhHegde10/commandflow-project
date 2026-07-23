import { z } from "zod";
import { Permission, ToolCategory, type MCPTool } from "../../types";
import { updateProduct } from "../../../services/product.service";
import { loginDemoBackend, registerDemoBackend } from "../../../services/demo-auth.service";

async function getServiceAccountToken() {
  try {
    const data = await loginDemoBackend({ username: "commandflow_orchestrator", password: "service_password" });
    return data.token;
  } catch {
    await registerDemoBackend({ username: "commandflow_orchestrator", password: "service_password", role: "admin" });
    const data = await loginDemoBackend({ username: "commandflow_orchestrator", password: "service_password" });
    return data.token;
  }
}

export function createUpdateProductPriceTool(): MCPTool {
  return {
    name: "products.updateProductPrice",
    description: "Update the price of an existing product. You MUST provide the exact productId (e.g. PROD-001). If you only know the product name, you MUST call products.getProducts first to find the correct productId.",
    category: ToolCategory.PRODUCTS,
    permissions: [Permission.ADMIN],
    inputSchema: z.object({
      productId: z.string().min(1),
      price: z.number().positive(),
    }),
    async execute(input) {
      const { productId, price } = input as { productId: string; price: number };
      const token = await getServiceAccountToken();
      
      const updatedProduct = await updateProduct(productId, { price }, token);
      return updatedProduct;
    },
  };
}
