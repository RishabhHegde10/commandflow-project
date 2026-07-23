import axios from "axios";
import { z } from "zod";

const API_BASE_URL = "http://localhost:5000/orders";

const orderSchema = z.object({
  id: z.string().optional(),
  orderId: z.string(),
  userId: z.string(),
  status: z.string(),
  totalAmount: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  items: z.array(z.any()).optional(),
  user: z.any().optional(),
});

export type Order = z.infer<typeof orderSchema>;

export async function getOrders(token: string): Promise<Order[]> {
  try {
    const response = await axios.get(API_BASE_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return z.array(orderSchema).parse(response.data);
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders from Demo Backend");
  }
}

export async function updateOrderStatus(orderId: string, status: string, token: string): Promise<Order> {
  try {
    const response = await axios.put(`${API_BASE_URL}/${orderId}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return orderSchema.parse(response.data);
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error(`Failed to update status for order ${orderId}`);
  }
}

export async function deleteOrder(orderId: string, token: string): Promise<void> {
  try {
    await axios.delete(`${API_BASE_URL}/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    throw new Error(`Failed to delete order ${orderId}`);
  }
}
