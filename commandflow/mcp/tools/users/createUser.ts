import { z } from "zod";
import { Permission, ToolCategory, type MCPTool } from "../../types";
import { createUser } from "../../../services/user.service";
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

export function createCreateUserTool(): MCPTool {
  return {
    name: "users.createUser",
    description: "Create a new user in the system.",
    category: ToolCategory.USERS,
    permissions: [Permission.MANAGER, Permission.ADMIN],
    inputSchema: z.object({
      username: z.string().min(1),
      role: z.enum(["admin", "manager", "employee", "viewer"]).optional(),
    }),
    async execute(input) {
      const { username, role } = input as { username: string; role?: string };
      const token = await getServiceAccountToken();
      const user = await createUser({ username, role }, token);
      return user;
    },
  };
}
