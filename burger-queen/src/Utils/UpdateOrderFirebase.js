import { db } from "../firebase/firebase-config";

export default function saveOrder(e, page, state, setState) {
  const id = e.currentTarget.id;
  page === "Kitchen"
    ? db
        .collection("ORDERS")
        .doc(id)
        .update({
          order_status_cooked: true,
          timestamp_cooked: new Date().getTime()
        })
    : db
        .collection("ORDERS")
        .doc(id)
        .update({
          order_status_delivered: true,
          timestamp_delivered: new Date().getTime()
        });

  const update = state.map(order =>
    order.id === id ? { ...order, order_status_cooked: true } : order
  );
  setState(update);
}
