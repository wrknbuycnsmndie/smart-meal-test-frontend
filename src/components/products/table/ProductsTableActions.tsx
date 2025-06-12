import type { FC } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import ReusableModalOpenButton from "../../../shared/ui/ReusableModalOpenButton";

interface ProductActionsProps {
  productId: number;
}

const ProductActions: FC<ProductActionsProps> = ({ productId }) => {
  return (
    <div className="">
      <ReusableModalOpenButton
        id={`update-product-modal-${productId}`}
        icon={<SquarePen />}
        className="btn btn-primary m-1"
      />

      <ReusableModalOpenButton
        id={`delete-product-modal-${productId}`}
        icon={<Trash2 />}
        className="btn btn-error m-1"
      />
    </div>
  );
};

export default ProductActions;
