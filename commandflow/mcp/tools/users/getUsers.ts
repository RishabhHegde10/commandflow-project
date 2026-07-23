import { z } from "zod";
import { Permission, ToolCategory, type MCPTool } from "../../types";
import { getUsers } from "../../../services/user.service";
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

export function createGetUsersTool(): MCPTool {
  return {
    name: "users.getUsers",
    description: "Fetch all users registered in the system.",
    category: ToolCategory.USERS,
    permissions: [Permission.VIEWER],
    inputSchema: z.object({}),
    async execute() {
      const token = await getServiceAccountToken();
      const users = await getUsers(token);
      return users;
    },
  };
}
