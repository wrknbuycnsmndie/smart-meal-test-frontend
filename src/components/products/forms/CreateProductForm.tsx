import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateProduct } from "../../../shared/hooks/useProducts";
import { CreateProductSchema } from "../../../shared/validation";
import { closeDialog } from "../../../shared/ui/ReusableModalCloseButton";
import ReusableModal from "../../../shared/ui/ReusableModal";

type CreateProductFormData = z.infer<typeof CreateProductSchema>;

export const CreateProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      article: "",
      name: "",
      price: 0.01,
      quantity: 0,
    },
  });

  const { mutate: createProduct, isPending, error } = useCreateProduct();

  const onSubmit = async (data: CreateProductFormData) => {
    try {
      await createProduct(data, {
        onSuccess: () => {
          reset();
          closeDialog("create-product-modal");
        },
      });
    } catch (err) {
      console.error("Ошибка при создании товара:", err);
    }
  };

  return (
    <ReusableModal id="create-product-modal" heading="Создать товар">
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
            <span>{error.message || "Не удалось создать товар"}</span>
          </div>
        )}

        <div className="modal-action">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || isPending}
          >
            {isSubmitting || isPending ? "Создание товара..." : "Создать товар"}
          </button>
        </div>
      </form>
    </ReusableModal>
  );
};
