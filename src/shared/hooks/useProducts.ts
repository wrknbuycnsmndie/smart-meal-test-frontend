import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";

import type { Product, PaginatedProductsResponse } from "../Interfaces/product";
import type { CreateProductDto, UpdateProductDto } from "../validation";
import { productApi } from "../api/products";

// Ключи для кэширования запросов к продуктам
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: { page: number; limit: number }) =>
    [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
};

// Хук для получения списка товаров с пагинацией
export const useProducts = (page = 1, limit = 50) => {
  return useQuery<PaginatedProductsResponse, Error>({
    queryKey: productKeys.list({ page, limit }),
    queryFn: () => productApi.getProducts(page, limit),
    placeholderData: keepPreviousData,
    retry: 5,
    staleTime: 5 * 60 * 1000,
  });
};

//Хук для получения одного товара по ID (не используется, т.к. у нас нет отдельной страницы под него)
export const useProduct = (id: number) => {
  return useQuery<Product, Error>({
    queryKey: productKeys.detail(id),
    queryFn: () => productApi.getProduct(id),
    enabled: !!id,
    retry: 5,
    staleTime: 5 * 60 * 1000,
  });
};

// Хук под создание товара
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, CreateProductDto>({
    mutationFn: productApi.createProduct,
    onSuccess: () => {
      // Инвалидация кэша ключей для списка продуктов при успешной мутации
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
    onError: (error) => {
      console.error("Failed to create product:", error.message);
    },
  });
};

// Хук для обновления товара
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Product,
    Error,
    { id: number; data: UpdateProductDto },
    { previousProduct?: Product }
  >({
    mutationFn: ({ id, data }) => productApi.updateProduct(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: productKeys.detail(id) });
      const previousProduct = queryClient.getQueryData<Product>(
        productKeys.detail(id)
      );

      queryClient.setQueryData(
        productKeys.detail(id),
        (old: Product | undefined) => (old ? { ...old, ...data } : old)
      );

      return { previousProduct };
    },
    onError: (error, { id }, context) => {
      queryClient.setQueryData(
        productKeys.detail(id),
        context?.previousProduct
      );
      console.error("Failed to update product:", error.message);
    },
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(productKeys.detail(id), data);
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

// Хук для удаления товара
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number, { previousProduct?: Product }>({
    mutationFn: productApi.deleteProduct,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: productKeys.detail(id) });
      const previousProduct = queryClient.getQueryData<Product>(
        productKeys.detail(id)
      );

      queryClient.removeQueries({ queryKey: productKeys.detail(id) });

      return { previousProduct };
    },
    onError: (error, id, context) => {
      queryClient.setQueryData(
        productKeys.detail(id),
        context?.previousProduct
      );
      console.error("Failed to delete product:", error.message);
    },
    onSuccess: () => {
      // Инвалидация кэша ключей для списка продуктов при успешной мутации
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};
