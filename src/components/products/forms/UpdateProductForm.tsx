import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateProduct } from "../../../shared/hooks/useProducts";
import { UpdateProductSchema } from "../../../shared/validation";
import ReusableModal from "../../../shared/ui/ReusableModal";
import { closeDialog } from "../../../shared/ui/ReusableModalCloseButton";
import type { Product } from "../../../shared/Interfaces/product";

type UpdateProductFormData = z.infer<typeof UpdateProductSchema>;

interface UpdateProductFormProps {
  product: Product;
}

export const UpdateProductForm = ({ product }: UpdateProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateProductFormData>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      article: product.article,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    },
  });

  const { mutate: updateProduct, isPending, error } = useUpdateProduct();

  const onSubmit = async (data: UpdateProductFormData) => {
    try {
      await updateProduct(
        { id: product.id, data },
        {
          onSuccess: () => {
            reset();
            closeDialog(`update-product-modal-${product.id}`);
          },
        }
      );
    } catch (err) {
      console.error("Ошибка при обновлении товара:", err);
    }
  };
  console.log("UpdateProductForm rendered for product:", product.id);
  return (
    <ReusableModal
      id={`update-product-modal-${product.id}`}
      heading="Обновить товар"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Артикул</span>
          </label>
          <input
            type="text"
            {...register("article")}
            className={`input input-bordered w-full ${
              errors.article ? "input-error" : ""
            }`}
            placeholder="Введите артикул товара"
          />
          {errors.article && (
            <span className="text-error text-sm">{errors.article.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Наименование</span>
          </label>
          <input
            type="text"
            {...register("name")}
            className={`input input-bordered w-full ${
              errors.name ? "input-error" : ""
            }`}
            placeholder="Введите наименование товара"
          />
          {errors.name && (
            <span className="text-error text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Цена</span>
          </label>
          <input
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
            className={`input input-bordered w-full ${
              errors.price ? "input-error" : ""
            }`}
            placeholder="Введите цену товара"
          />
          {errors.price && (
            <span className="text-error text-sm">{errors.price.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Количество</span>
          </label>
          <input
            type="number"
            {...register("quantity", { valueAsNumber: true })}
            className={`input input-bordered w-full ${
              errors.quantity ? "input-error" : ""
            }`}
            placeholder="Введите количество товара"
          />
          {errors.quantity && (
            <span className="text-error text-sm">
              {errors.quantity.message}
            </span>
          )}
        </div>

        {error && (
          <div className="alert alert-error">
            <span>{error.message || "Не удалось обновить товар"}</span>
          </div>
        )}

        <div className="modal-action">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || isPending}
          >
            {isSubmitting || isPending
              ? "Обновление товара..."
              : "Обновить товар"}
          </button>
        </div>
      </form>
    </ReusableModal>
  );
};
