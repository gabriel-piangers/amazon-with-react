import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../scripts/DeliveryOprions";
import { NavLink } from "react-router";
import { formatCurrency } from "../scripts/money";
import UpdateQuantity from "./UpdateQuantity";

function CartProducts({ cart, setCart, dispatchCartQuantity}) {
  const CurrentTime = dayjs();

  function setDeliveryOption(deliveryId, productId) {
    let selected = undefined;
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryId) {
        selected = option;
      }
    });
    if (selected) {
      const newCart = cart.map((cartItem) => {
        if (cartItem.product.id === productId) {
          return { ...cartItem, deliveryOption: selected };
        } else {
          return cartItem;
        }
      });
      localStorage.setItem('cart', JSON.stringify(newCart))
      setCart(newCart);
    }
  }

  if (cart.length > 0) {
    return (
      <div className="flex flex-col gap-6 max-lg:order-2">
        
        {cart.map((cartItem) => (
          
          <div
            key={cartItem.product.id}
            className="max-w-[900px] p-4 border border-slate-300 shadow-md rounded-md"
          >
            <div className="mb-4 text-[20px] font-medium text-green-700">
              Delivery Date:{" "}
              {CurrentTime.add(
                cartItem.deliveryOption.timeToDelivery,
                "days"
              ).format("MMMM, D")}
            </div>
            <div className="flex gap-6 max-lg:flex-col justify-between">
              <div className="flex gap-6">
              <div className="h-[100px] min-w-[100px] w-[100px]">
                <img
                  src={`../../${cartItem.product.image}`}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-1 ">
                <p className="font-medium max-w-[80%]">{cartItem.product.name}</p>
                <p className="font-medium text-red-800">
                  ${cartItem.product.priceCents / 100}
                </p>
                <div className="flex gap-1">
                  <p>Quantity: </p>
                  <div className={`update-div-${cartItem.product.id}`}>
                   < UpdateQuantity cartItem={cartItem} cart={cart} setCart={setCart} dispatchCartQuantity={dispatchCartQuantity}/>
                  </div>

                  <button
                    className="text-blue-600 hover:cursor-pointer"
                    onClick={() => {
                      let newCart = cart.filter((newCartItem) => {
                        const bool =
                          newCartItem.product.id !== cartItem.product.id;
                        if (!bool) {
                          dispatchCartQuantity({type:'decrement', quantity: newCartItem.quantity});
                        }
                        return bool;
                      });
                      localStorage.setItem('cart', JSON.stringify(newCart))
                      setCart(newCart);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              </div>

              <div className="min-w-[220px] w-[220px]">
                <div className="font-medium mb-1">Choose a delivery Option</div>

                <div className="flex flex-col *:gap-2">
                  {deliveryOptions.map((option) => (                     
                     <div className="flex" key={option.id}>
                     <input
                       type="radio"
                       name={`delivery-option-${cartItem.product.id}`}
                       checked={cartItem.deliveryOption.id === option.id ? true : false}
                       onChange={() => {}}
                       className="hover:cursor-pointer"
                       onClick={() => {
                         setDeliveryOption(option.id, cartItem.product.id);
                       }}
                     />
                     <div className="leading-tight mb-1">
                       <p className="text-green-700 font-medium">{CurrentTime.add(option.timeToDelivery, "days").format("dddd, MMMM, D")}</p>
                       <p className="font-light text-stone-600">{option.priceCents===0 ? 'Free' : formatCurrency(option.priceCents)} Shipping</p>
                     </div>
                   </div>
                   ))}

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
     <div className="w-full max-w-[900px] p-4 my-6 max-lg:order-2">
      <div>Your Cart is Empty</div>
      <div className="my-4">
        <NavLink to={'/'} className="px-6 py-1 bg-yellow-400 rounded-md">View Products</NavLink>
      </div>
     </div>
    )
  }
}

export default CartProducts;
