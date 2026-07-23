import { z } from "zod";
import { Permission, ToolCategory, type MCPTool } from "../../types";
import { getProducts } from "../../../services/product.service";

export function createGetProductsTool(): MCPTool {
  return {
    name: "products.getProducts",
    description: "Retrieve products for the store.",
    category: ToolCategory.PRODUCTS,
    permissions: [Permission.VIEWER, Permission.EMPLOYEE, Permission.MANAGER, Permission.ADMIN],
    inputSchema: z.object({}),
    async execute() {
      // Call the external Demo Backend
      const products = await getProducts();
      return products;
    },
  };
}
