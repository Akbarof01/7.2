import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";
import { customFetch, formatPrice } from "../utils";
export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const { cartItems, orderTotal, numberOfItemsInCart } =
      store.getState().cartState;
    const { token } = store.getState().userState.user;

    const payloadInfo = {
      name,
      address,
      cartItems,
      chargeTotal: orderTotal,
      numItemsInCart: numberOfItemsInCart,
      orderTotal: formatPrice(orderTotal),
    };

    try {
      const response = await customFetch.post(
        "/orders",
        {
          data: payloadInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      queryClient.removeQueries(["orders"]);
      store.dispatch(clearCart());
      toast.success("Your order has been placed");
      return redirect("/orders");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "There was an error placing your order";
      if (error.response.status === 401 || error.response.status === 403) {
        return redirect("/login");
      }
      return toast.error(errorMessage);
    }
  };

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
    </Form>
  );
};

export default CheckoutForm;
