import axios, { type AxiosInstance, AxiosError } from "axios";
import { z } from "zod";
import type { Product, PaginatedProductsResponse } from "../Interfaces/product";
import { CreateProductSchema, UpdateProductSchema } from "../validation";

// Define error response shape for AxiosError
interface ApiErrorResponse {
  message?: string;
}

const API_BASE_URL = "http://localhost:3000/";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);

// Update PaginatedProductsResponseSchema to match interface
const UpdatedPaginatedProductsResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      article: z.string(),
      name: z.string(),
      price: z.string().transform((val) => parseFloat(val)),
      quantity: z.number(),
      createdAt: z
        .string()
        .datetime()
        .transform((str) => new Date(str)),
    })
  ),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const productApi = {
  // Создание товара
  async createProduct(
    data: z.infer<typeof CreateProductSchema>
  ): Promise<Product> {
    const validatedData = CreateProductSchema.parse(data);
    const response = await api.post("/products", validatedData);
    return response.data;
  },

  // Список товаров с пагинацией
  async getProducts(page = 1, limit = 50): Promise<PaginatedProductsResponse> {
    const response = await api.get("/products", {
      params: { page, limit },
    });
    return UpdatedPaginatedProductsResponseSchema.parse(response.data);
  },

  // Получение одного товара по ID (не используется, т.к у нас нет отдельной страницы под него)
  async getProduct(id: number): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Обновление товара
  async updateProduct(
    id: number,
    data: z.infer<typeof UpdateProductSchema>
  ): Promise<Product> {
    const validatedData = UpdateProductSchema.parse(data);
    const response = await api.put(`/products/${id}`, validatedData);
    return response.data;
  },

  // Удаление товара
  async deleteProduct(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};
