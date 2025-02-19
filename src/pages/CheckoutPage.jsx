import CartProducts from "../components/CartProducts";
import OrderSummary from "../components/OrderSumarry";
import CheckoutHeader from "../components/CheckoutHeader";
import { useState } from "react";
import { getCartQuantity } from "../scripts/Cart";

function CheckoutPage() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const [cartQuantity, setCartQuantity] = useState(getCartQuantity());

  return (
    <div className="flex flex-col pb-6">
      <CheckoutHeader cartQuantity={cartQuantity} />
      <div className="max-lg:mx-auto flex justify-center">
        <div className="w-full max-w-[1200px] px-6">
          <div className="flex justify-center">
          <h1 className="w-full text-2xl font-bold my-6">Review your order</h1>
          </div>

          <div className="flex max-lg:flex-col gap-6 justify-center">
            <CartProducts
              cart={cart}
              setCart={setCart}
              cartQuantity={cartQuantity}
              setCartQuantity={setCartQuantity}
            />

            <OrderSummary cart={cart} cartQuantity={cartQuantity} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
