import { z } from "zod";
import { Permission, ToolCategory, type MCPTool } from "../../types";
import { deleteOrder } from "../../../services/order.service";
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

export function createCancelOrderTool(): MCPTool {
  return {
    name: "orders.cancelOrder",
    description: "Cancel a customer order. You MUST provide the exact orderId (e.g. ORD-123). If you don't know the exact orderId, you MUST call orders.getOrders first.",
    category: ToolCategory.ORDERS,
    permissions: [Permission.MANAGER, Permission.ADMIN],
    inputSchema: z.object({
      orderId: z.string().min(1),
    }),
    async execute(input) {
      const { orderId } = input as { orderId: string };
      const token = await getServiceAccountToken();
      await deleteOrder(orderId, token);
      return { success: true, message: `Order ${orderId} cancelled` };
    },
  };
}
