import { z } from "zod";
import { Permission, ToolCategory, type MCPTool } from "../../types";
import { updateOrderStatus } from "../../../services/order.service";
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

export function createUpdateOrderStatusTool(): MCPTool {
  return {
    name: "orders.updateOrderStatus",
    description: "Update the status of an order. You MUST provide the exact orderId (e.g. ORD-123). If you don't know the exact orderId, you MUST call orders.getOrders first.",
    category: ToolCategory.ORDERS,
    permissions: [Permission.MANAGER, Permission.ADMIN],
    inputSchema: z.object({
      orderId: z.string().min(1),
      status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
    }),
    async execute(input) {
      const { orderId, status } = input as { orderId: string; status: string };
      const token = await getServiceAccountToken();
      const updatedOrder = await updateOrderStatus(orderId, status, token);
      return updatedOrder;
    },
  };
}
