import { z } from "zod";
import { Permission, ToolCategory, type MCPTool } from "../../types";
import { disableUser } from "../../../services/user.service";
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

export function createDisableUserTool(): MCPTool {
  return {
    name: "users.disableUser",
    description: "Disable a user account in the system. You MUST provide the exact userId. If you don't know the exact userId, you MUST call users.getUsers first to find it.",
    category: ToolCategory.USERS,
    permissions: [Permission.MANAGER, Permission.ADMIN],
    inputSchema: z.object({
      userId: z.string().min(1),
    }),
    async execute(input) {
      const { userId } = input as { userId: string };
      const token = await getServiceAccountToken();
      await disableUser(userId, token);
      return { success: true, message: `User ${userId} disabled` };
    },
  };
}
