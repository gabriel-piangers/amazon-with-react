import { useState } from "react";
import Header from "../components/Header";
import Orders from "../components/Orders";
import { getCartQuantity } from "../scripts/Cart";

function OrdersPage() {
  const [orders] = useState(JSON.parse(localStorage.getItem('orders')) || []);
  const [cartQuantity, setCartQuantity] = useState(getCartQuantity())


  return (
    <div>
      <Header cartQuantity={getCartQuantity()} />
      <div className="flex">
        <Orders orders={orders} cartQuantity={cartQuantity} setCartQuantity={setCartQuantity}/>
      </div>
    </div>
  );
}

export default OrdersPage;
