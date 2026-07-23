import { z } from "zod";
import { Permission, ToolCategory, type MCPTool } from "../../types";
import { deleteProduct } from "../../../services/product.service";
import { loginDemoBackend, registerDemoBackend } from "../../../services/demo-auth.service";

// Helper to get a Demo Backend JWT for orchestration
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

export function createDeleteProductTool(): MCPTool {
  return {
    name: "products.deleteProduct",
    description: "Delete a product for the store. You MUST provide the exact productId (e.g. PROD-001). If you only know the product name, you MUST call products.getProducts first to find the correct productId.",
    category: ToolCategory.PRODUCTS,
    permissions: [Permission.MANAGER, Permission.ADMIN],
    inputSchema: z.object({
      productId: z.string().min(1),
    }),
    async execute(input) {
      const { productId } = input as { productId: string };
      const token = await getServiceAccountToken();
      await deleteProduct(productId, token);
      return { success: true, message: `Product ${productId} deleted successfully` };
    },
  };
}
