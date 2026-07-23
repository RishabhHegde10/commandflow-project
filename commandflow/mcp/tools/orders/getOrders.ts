import { z } from "zod";
import { Permission, ToolCategory, type MCPTool } from "../../types";
import { getOrders } from "../../../services/order.service";
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

export function createGetOrdersTool(): MCPTool {
  return {
    name: "orders.getOrders",
    description: "Fetch all customer orders.",
    category: ToolCategory.ORDERS,
    permissions: [Permission.VIEWER],
    inputSchema: z.object({
      limit: z.number().int().min(1).max(100).optional(),
      offset: z.number().int().min(0).optional(),
    }),
    async execute() {
      const token = await getServiceAccountToken();
      const orders = await getOrders(token);
      return orders;
    },
  };
}
