import Hero from "../components/Hero";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import ProductsTable from "../components/products/table/ProductsTable";

export const HomePage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <ProductsTable />
      <Footer />
    </div>
  );
};
