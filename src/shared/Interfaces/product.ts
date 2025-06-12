export interface Product {
  id: number;
  name: string;
  article: string;
  price: number;
  quantity: number;
  createdAt: Date;
}

export interface PaginatedProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
