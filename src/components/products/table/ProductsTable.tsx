import { useState } from "react";
import { useProducts } from "../../../shared/hooks/useProducts";
import {
  DeleteProductForm,
  UpdateProductForm,
  CreateProductForm,
} from "../forms";
import Pagination from "./ProductsTablePagination";
import ProductActions from "./ProductsTableActions";
import type { Product } from "../../../shared/Interfaces/product";
import ReusableModalOpenButton from "../../../shared/ui/ReusableModalOpenButton";

export const ProductsTable = () => {
  const [page, setPage] = useState(1);
  const limit = 1;

  // Получение списка товаров с пагинацией
  const { data, isLoading, isError, error } = useProducts(page, limit);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (data?.totalPages || 1)) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-4">
      {/* Кнопка вызова модалки с формой для создания товара */}
      <div className="mb-4">
        <ReusableModalOpenButton
          id="create-product-modal"
          text="Добавить новый товар"
        />
      </div>

      {/* Форма для создания толвара */}
      <CreateProductForm />

      {/* Форма обновления товара */}
      {data?.data.map((product) => (
        <UpdateProductForm key={product.id} product={product} />
      ))}

      {data?.data.map((product) => (
        <DeleteProductForm productId={product.id} />
      ))}

      {/* Таблица товаров */}
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table min-w-full  divide-y divide-gray-200">
          <thead className="">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Наименование
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Артикул
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Цена
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Количество
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center ">
                  Загрузка товаров...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-error">
                  Ошибка: {error?.message || "Не удалось загрузить товары"}
                </td>
              </tr>
            ) : !data?.data.length ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center ">
                  Товары не найдены
                </td>
              </tr>
            ) : (
              data.data.map((product: Product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {product.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {product.article}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <ProductActions productId={product.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Пагинация */}
      {data && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          totalItems={data.total}
          isLoading={isLoading}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductsTable;
