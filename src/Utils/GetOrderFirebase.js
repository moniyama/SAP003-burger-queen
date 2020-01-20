import { db } from "../firebase/firebase-config";

export default function getOrder(page, setState) {
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
          setState(newOrders);
        })
    : db
        .collection("ORDERS")
        .where("order_status_cooked", "==", true)
        .onSnapshot(querySnapshot => {
          const newOrder = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }));
          setState(newOrder);
        });
}
