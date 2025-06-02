import Link from "next/link";

const OrderSummaryCard = ({ ordersummary, quantity = 1 }) => {
  return (
    <div className="flex flex-row border-gray-400 mx-3 border-b sm:border rounded sm:m-5">
      <Link
        href={`/product/${ordersummary._id}`}
        className="block relative sm:w-38 md:w-56 h-full flex-shrink-0 rounded-3xl"
      >
        <img
          src={ordersummary.images[0]}
          alt={ordersummary.name}
          className="w-30 sm:w-50 object-contain pr-2 object-center transition-transform duration-300 group-hover:scale-105 border-r border-gray-300 mt-5"
        />
      </Link>

      <div className="flex-1 p-4 sm:p-6 flex flex-col">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {ordersummary.category}
            </span>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 line-clamp-2">
              {ordersummary.name}
            </h2>
            <span className="text-sm text-gray-600">{ordersummary.brand}</span>
            <span className="font-semibold text-gray-700 mt-1 line-clamp-2">
              ₹{ordersummary.price.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center mt-2 mb-4">
        </div>
        <span className="text-gray-500 text-sm mb-3">
          stock {ordersummary.stock}
        </span>
        <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Qty: {quantity}</span>
          </div>

        </div>
        <div className="mt-5 ps-7">
          <span className="text-xl font-bold text-gray-900">
            ₹{(ordersummary.price * quantity).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderSummaryCard;