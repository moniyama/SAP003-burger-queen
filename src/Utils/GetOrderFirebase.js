import { db } from "../firebase/firebase-config";

export default function getOrder(page, setState) {
  let isSubscribed = true;
  page === "Kitchen"
    ? db
        .collection("ORDERS")
        .orderBy("timestamp_ordered", "desc")
        .limit(20)
        .onSnapshot(querySnapshot => {
          const newOrders = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }));
          if (isSubscribed) setState(newOrders);
        })
    : db
        .collection("ORDERS")
        .where("order_status_cooked", "==", true)
        .onSnapshot(querySnapshot => {
          const newOrders = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }));
          if (isSubscribed) setState(newOrders);
        });
  return () => (isSubscribed = false);
}
