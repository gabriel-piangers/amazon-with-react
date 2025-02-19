import { useState } from "react";

function UpdateQuantity({
  cartItem,
  cart,
  setCart,
  cartQuantity,
  setCartQuantity,
}) {
  const [updateButton, setUpdateButton] = useState(false);
  const [selectedValue, setSelectedValue] = useState(cartItem.quantity);

  if (updateButton) {
    return (
      <div className="flex gap-1">
        <select className="bg-stone-100 rounded-md border border-stone-400"
          name={`quantity-selector-${cartItem.product.id}`}
          value={selectedValue}
          onChange={(event) => {
            setSelectedValue(Number.parseInt(event.target.value));
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>

        <button
          className="text-blue-600 hover:cursor-pointer  mx-1"
          onClick={() => {
            const newCart = cart.map((item) => {
              if (item.product.id === cartItem.product.id) {
                return { ...item, quantity: selectedValue };
              } else {
                return item;
              }
            });
            setCartQuantity(cartQuantity + (selectedValue - cartItem.quantity));
            setCart(newCart);
            localStorage.setItem("cart", JSON.stringify(newCart));
            setUpdateButton(false);
          }}
        >
          Save
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex gap-1">
        <div>{cartItem.quantity}</div>
        <button
          className="text-blue-600 hover:cursor-pointer mx-1"
          onClick={() => {
            setUpdateButton(true);
          }}
        >
          Update
        </button>
      </div>
    );
  }
}

export default UpdateQuantity;
