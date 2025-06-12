import { z } from "zod";

// Схема для создания продукта
export const CreateProductSchema = z.object({
  article: z.string().min(1, "Артикул не может быть пустым").trim(),
  name: z.string().min(1, "Название не может быть пустым").trim(),
  price: z
    .number()
    .positive("Цена должна быть больше 0")
    .min(0.01, "Цена должна быть больше 0"),
  quantity: z
    .number()
    .nonnegative("Количество не может быть меньше 0")
    .min(0, "Количество не может быть меньше 0"),
});

export type CreateProductDto = z.infer<typeof CreateProductSchema>;
