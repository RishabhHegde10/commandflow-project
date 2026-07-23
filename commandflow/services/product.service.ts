import axios from "axios";
import { z } from "zod";

const API_BASE_URL = "http://localhost:5000/products";

// We define minimal validation schemas for safety, mimicking the expected backend types.
const productSchema = z.object({
  productId: z.string().optional(),
  name: z.string().min(1).optional(),
  brand: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
  variants: z.array(z.any()).optional(),
  price: z.number().optional(),
  stock: z.number().optional(),
});

/**
 * Fetch all products from the Demo Backend
 */
export async function getProducts() {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch products from Demo Backend");
    }
    throw error;
  }
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(productId: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${productId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch product from Demo Backend");
    }
    throw error;
  }
}

/**
 * Create a new product. 
 * Note: The demo backend requires an admin/manager JWT token for this route.
 */
export async function createProduct(data: unknown, token: string) {
  const validatedData = productSchema.parse(data);
  
  try {
    const response = await axios.post(API_BASE_URL, validatedData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to create product");
    }
    throw error;
  }
}

/**
 * Update an existing product.
 * Requires admin/manager JWT token.
 */
export async function updateProduct(productId: string, data: unknown, token: string) {
  const validatedData = productSchema.parse(data);
  
  try {
    const response = await axios.put(`${API_BASE_URL}/${productId}`, validatedData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to update product");
    }
    throw error;
  }
}

/**
 * Delete a product.
 * Requires admin JWT token.
 */
export async function deleteProduct(productId: string, token: string) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to delete product");
    }
    throw error;
  }
}
