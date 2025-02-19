import { NavLink } from "react-router";
import { addToCart } from "../scripts/Cart";
import { formatCurrency } from "../scripts/money";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

function Orders({ orders, cartQuantity, setCartQuantity }) {
  return (
    <div className="p-10 mx-auto">
      <div className="mb-8 text-2xl font-medium">Your Orders</div>
      <div className="flex flex-col gap-10">
        {orders.map((order) => {
          return (
            <div key={order.id}>
              <div className="flex max-sm:flex-col max-sm:gap-1 justify-between bg-stone-100 rounded-t-md py-2 px-4 border border-stone-200 ">
                <div className="flex gap-10 max-sm:gap-1 max-sm:flex-col ">
                  <div className="max-sm:flex gap-2">
                    <p className="font-medium">Order Placed:</p>
                    <p>{dayjs(order.placedTime).format("MMMM, D")}</p>
                  </div>
                  <div className="max-sm:flex gap-2">
                    <p className="font-medium">Total:</p>
                    <p>{formatCurrency(order.totalPriceCents)}</p>
                  </div>
                </div>
                <div className="max-sm:flex gap-2">
                  <p className="font-medium">Order ID: </p>
                  <p>{order.id}</p>
                </div>
              </div>
              <div className="border-b-1 border-r-1 border-l-1 rounded-b-md border-stone-200 p-4 flex flex-col gap-4">
                {order.products.map((product) => {
                  return (
                    <div
                      key={product.id}
                      className="flex justify-between gap-4"
                    >
                      <div className="flex gap-4">
                        <div>
                          <img
                            src={`../../${product.image}`}
                            className="h-[150px]  min-w-[150px] w-[150px] object-contain p-4"
                          />
                        </div>
                        <div className="my-auto">
                          <div className="font-medium leading-loose">
                            {product.name}
                          </div>
                          <div className="leading-tight">
                            Arriving on:{" "}
                            {dayjs(product.arrivingOn).format("MMMM, D")}
                          </div>
                          <div className="mb-2">
                            Quantity: {product.quantity}
                          </div>
                          <div className="w-[150px] flex flex-col gap-2">
                            <button
                              className="bg-yellow-300 flex w-full py-1 gap-2 rounded-md hover:cursor-pointer px-3 shadow-md"
                              onClick={() => {
                                addToCart(product, 1);
                                setCartQuantity(cartQuantity + 1);
                              }}
                            >
                              <img
                                className="h-[25px] object-contain"
                                src="../../images/icons/buy-again.png"
                              />
                              <p>Buy it again</p>
                            </button>
                            <NavLink
                              to={`/tracking?orderId=${order.id}&productId=${product.id}`}
                              className="px-6 py-1 border border-stone-200 rounded-md shadow-md my-auto hover:cursor-pointer md:hidden"
                            >
                              Track package
                            </NavLink>
                          </div>
                        </div>
                      </div>
                      <div className="flex w-[200px] max-md:hidden">
                        <NavLink
                          to={`/tracking?orderId=${order.id}&productId=${product.id}`}
                          className="w-full text-center py-1 mx-4 border border-stone-200 rounded-md shadow-md my-auto hover:cursor-pointer "
                        >
                          Track package
                        </NavLink>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
