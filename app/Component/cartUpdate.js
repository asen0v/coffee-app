import { db } from '../firebaseConfig';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

export async function updateCartQuantity(cartId, newQuantity) {
    const cartDocRef = doc(db, "cart", cartId);
    await updateDoc(cartDocRef, { quantity: newQuantity });
}

export async function removeCartItem(cartId) {
    const cartDocRef = doc(db, "cart", cartId);
    await deleteDoc(cartDocRef);
}
