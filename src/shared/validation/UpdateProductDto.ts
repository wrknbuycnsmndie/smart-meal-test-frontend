import { z } from "zod";

// Схема для обновления продукта (все поля optional)
export const UpdateProductSchema = z
  .object({
    article: z
      .string()
      .min(1, "Артикул не может быть пустым")
      .trim()
      .optional(),
    name: z.string().min(1, "Название не может быть пустым").trim().optional(),
    price: z
      .number()
      .positive("Цена должна быть больше 0")
      .min(0.01, "Цена должна быть больше 0")
      .optional(),
    quantity: z
      .number()
      .nonnegative("Количество не может быть меньше 0")
      .min(0, "Количество не может быть меньше 0")
      .optional(),
  })
  .partial(); // .partial() делает все поля необязательными

export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;

// Схема для пагинированного ответа
export const PaginatedProductsResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      article: z.string(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      createdAt: z.string().datetime(), // или z.date() если будет преобразование
    })
  ),
  total: z.number(),
});

export type PaginatedProductsResponse = z.infer<
  typeof PaginatedProductsResponseSchema
>;
