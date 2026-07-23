import { z } from "zod";
import { Permission, ToolCategory, type MCPTool } from "../../types";
import { createProduct } from "../../../services/product.service";
import { loginDemoBackend, registerDemoBackend } from "../../../services/demo-auth.service";

// Helper to get a Demo Backend JWT for orchestration
async function getServiceAccountToken() {
  try {
    const data = await loginDemoBackend({ username: "commandflow_orchestrator", password: "service_password" });
    return data.token;
  } catch {
    // If it fails, try registering the service account first
    await registerDemoBackend({ username: "commandflow_orchestrator", password: "service_password", role: "admin" });
    const data = await loginDemoBackend({ username: "commandflow_orchestrator", password: "service_password" });
    return data.token;
  }
}

export function createCreateProductTool(): MCPTool {
  return {
    name: "products.createProduct",
    description: "Create a new product for the store.",
    category: ToolCategory.PRODUCTS,
    permissions: [Permission.MANAGER, Permission.ADMIN],
    inputSchema: z.object({
      name: z.string().min(1),
      price: z.number().positive(),
      stock: z.number().int().min(0),
      description: z.string().optional(),
    }),
    async execute(input) {
      const { name, price, stock, description } = input as {
        name: string;
        price: number;
        stock: number;
        description?: string;
      };

      const token = await getServiceAccountToken();
      
      const newProduct = await createProduct({
        name,
        price,
        stock,
        brand: "CommandFlow API",
        category: "General",
        description: description || "Created via CommandFlow",
        status: "active"
      }, token);

      return newProduct;
    },
  };
}
