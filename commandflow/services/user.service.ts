import axios from "axios";
import { z } from "zod";

const API_BASE_URL = "http://localhost:5000/users";

const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  role: z.string(),
  createdAt: z.string().optional()
});

export type User = z.infer<typeof userSchema>;

export async function getUsers(token: string): Promise<User[]> {
  try {
    const response = await axios.get(API_BASE_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return z.array(userSchema).parse(response.data);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users from Demo Backend");
  }
}

export async function createUser(data: { username: string; role?: string }, token: string): Promise<User> {
  try {
    const response = await axios.post(API_BASE_URL, { ...data, password: 'password123' }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return userSchema.parse(response.data);
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}

export async function disableUser(userId: string, token: string): Promise<User> {
  try {
    const response = await axios.put(`${API_BASE_URL}/${userId}/disable`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return userSchema.parse(response.data);
  } catch (error) {
    console.error("Error disabling user:", error);
    throw new Error(`Failed to disable user ${userId}`);
  }
}
