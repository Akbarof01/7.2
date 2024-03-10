import { PaginationContainer, ProductsContainer, Filters } from "../container";
import { customFetch } from "../utils";

const productsUrl = "/products";
const allProductsQuery = (queryParams) => {
  const { search, category, company, order, price, shipping, page } =
    queryParams;

  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "all",
      order ?? "a-z",
      price ?? "100000",
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch.get(productsUrl, {
        params: queryParams,
      }),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    console.log(params);
    const response = await queryClient.ensureQueryData(
      allProductsQuery(params),
    );

    const products = response.data.data;
    const meta = response.data.meta;
    return { products, meta, params };
  };

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;


