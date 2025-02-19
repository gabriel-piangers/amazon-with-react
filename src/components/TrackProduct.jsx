import { NavLink } from "react-router";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

function TrackProduct({ product }) {
  const progress = Math.abs(
    dayjs().subtract(dayjs(product.placedTime)) /
      dayjs(product.arrivingOn).subtract(dayjs())
  );
  console.log(progress.toString());
  return (
    <div className="py-6 flex flex-col gap-10 w-[90%] max-w-[1000px] mx-auto">
      <NavLink to={"/orders"} className="text-sky-700 underline">
        View all orders
      </NavLink>

      <div>
        <div className="text-2xl font-medium my-2">
          Arriving on {dayjs(product.arrivingOn).format("dddd, MMMM, D")}
        </div>
        <div>{product.name}</div>
        <div className="mb-8">Quantity: {product.quantity}</div>
        <div>
          <img
            src={`../../${product.image}`}
            className="h-[200px] w-[200px] object-contain mb-4"
          />
        </div>
      </div>

      <div className="w-[90%] max-w-[1000px]">
        <div className="flex justify-between p-2 text-xl">
          <p className={`${progress < 0.5 && "text-green-700"}`}>Preparing</p>
          <p
            className={`${progress < 1 && progress > 0.5 && "text-green-700"}`}
          >
            Shipped
          </p>
          <p className={`${progress >= 1 && "text-green-700"}`}>Delivered</p>
        </div>
        <div className="border border-stone-400 shadow-md  h-[30px] rounded-2xl overflow-hidden">
          <div
            className={`bg-green-700 h-[100%] rounded-2xl`}
            style={{
              width: `${progress * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default TrackProduct;
