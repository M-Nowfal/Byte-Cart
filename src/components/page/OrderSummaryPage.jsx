
const OrderSummaryPage = ({ productid = null, quantity = null, cartid = null }) => {
  return (
    <div className="text-black">
      <h1>Id: {productid}</h1>
      <h1>Quantity: {quantity}</h1>
      <h1>CartId: {cartid}</h1>
    </div>
  );
}

export default OrderSummaryPage;