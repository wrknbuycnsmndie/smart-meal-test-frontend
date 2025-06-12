import { useDeleteProduct } from "../../../shared/hooks/useProducts";
import ReusableModal from "../../../shared/ui/ReusableModal";
import { closeDialog } from "../../../shared/ui/ReusableModalCloseButton";

interface DeleteProductFormProps {
  productId: number;
}

export const DeleteProductForm = ({ productId }: DeleteProductFormProps) => {
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    deleteProduct(productId, {
      onSuccess: () => {
        closeDialog(`delete-product-modal-${productId}`);
      },
      onError: (error) => {
        console.error("Ошибка при удалении товара:", error);
      },
    });
  };

  const handleCancel = () => {
    closeDialog(`delete-product-modal-${productId}`);
  };

  return (
    <ReusableModal
      id={`delete-product-modal-${productId}`}
      heading="Удаление товара"
    >
      <form onSubmit={handleSubmit}>
        <div className="py-4">
          <p>Вы уверены, что хотите удалить этот товар?</p>
          <p className="text-sm text-gray-500 mt-2">
            Это действие нельзя будет отменить.
          </p>
        </div>

        <div className="modal-action">
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-outline"
            disabled={isDeleting}
          >
            Отмена
          </button>
          <button type="submit" className="btn btn-error" disabled={isDeleting}>
            {isDeleting ? (
              <>
                <span className=""></span>
                Удаление...
              </>
            ) : (
              "Удалить товар"
            )}
          </button>
        </div>
      </form>
    </ReusableModal>
  );
};
