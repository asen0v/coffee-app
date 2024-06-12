'use client';
import { cartDelete } from '@/app/libDB';
import { useEffect, useState } from "react";
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import Image from 'next/image';
import { updateCartQuantity, removeCartItem } from './cartUpdate';

async function fetchDataFromFirebase(uId) {
    const collectionRef = collection(db, "cart");
    const q = query(collectionRef, where("uId", "==", uId));
    const querySnapShot = await getDocs(q);
    const data = [];
    querySnapShot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

async function getUserData(uId) {
    const userDocRef = doc(db, "users", uId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
        return userDoc.data();
    } else {
        throw new Error("User does not exist");
    }
}

async function updateUserMoney(uId, newMoney) {
    const userDocRef = doc(db, "users", uId);
    await updateDoc(userDocRef, { money: newMoney });
}

async function addOrderToFirebase(uId) {
    const cartData = await fetchDataFromFirebase(uId);
    const ordersCollectionRef = collection(db, "orders");
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const formattedDate = `${day}.${month}.${year} - ${hours}:${minutes}`;

    const orderData = {
        uId,
        items: cartData,
        orderDate: formattedDate,
        status: "pending"
    };
    await addDoc(ordersCollectionRef, orderData);
}

export default function FireBaseFetchData({ props }) {
    const [coffeeData, setCoffeeData] = useState([]);
    const [messageCart, setMessageCart] = useState("");
    const [messageOrder, setMessageOrder] = useState("");

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataFromFirebase(props.uId);
            setCoffeeData(data);
        }
        fetchData();
    }, [props.uId]);

    function deleteAction(uId) {
        const delStatus = cartDelete(uId);
        if (delStatus) {
            setCoffeeData([]);
            setMessageCart("You successfully emptied your cart!");
        }
    }

    async function handleOrder(uId) {
        try {
            const cartData = await fetchDataFromFirebase(uId);
            const totalPrice = cartData.reduce((total, item) => total + (item.price * item.quantity), 0);

            const userData = await getUserData(uId);
            const newMoney = userData.money - totalPrice;

            if (newMoney < 0) {
                setMessageOrder("You do not have enough money to complete this order.");
                return;
            }

            await updateUserMoney(uId, newMoney);
            await addOrderToFirebase(uId);
            deleteAction(uId); // Clear the cart after making an order
            setMessageOrder("Your order was submitted successfully and is being processed!");
        } catch (error) {
            setMessageOrder(`Error: ${error.message}`);
        }
    }

    async function handleUpdateCart() {
        try {
            const updatedQuantities = coffeeData.map(cof => {
                const selectElement = document.getElementById(`quantity-select-${cof.id}`);
                const newQuantity = parseInt(selectElement.value, 10);
                return { id: cof.id, quantity: newQuantity };
            });

            for (const item of updatedQuantities) {
                await updateCartQuantity(item.id, item.quantity);
            }

            const updatedData = await fetchDataFromFirebase(props.uId);
            setCoffeeData(updatedData);
            setMessageCart("Cart updated successfully!");
        } catch (error) {
            setMessageCart(`Error: ${error.message}`);
        }
    }

    async function handleRemoveItem(cartId) {
        try {
            await removeCartItem(cartId);
            const updatedData = await fetchDataFromFirebase(props.uId);
            setCoffeeData(updatedData);
            setMessageCart("Item removed successfully!");
        } catch (error) {
            setMessageCart(`Error: ${error.message}`);
        }
    }

    return (
        <>
            <h1 className="display-4">User Cart</h1>
            {messageCart && <div className="alert alert-success">{messageCart}</div>}
            {messageOrder && <div className="alert alert-success">{messageOrder}</div>}

            {coffeeData.length === 0 ? (
                <div className="alert alert-info">Your cart is empty</div>
            ) : (
                <div className="col">
                    <div className="widget dashboard-container">
                        <table className="table table-responsive product-dashboard-table">
                            <thead>
                                <tr>
                                    <td colSpan={6} align="right">
                                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleUpdateCart}>Update Cart</button>
                                    </td>
                                </tr>
                                <tr className="text-center">
                                    <th scope="col">Photo</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Qty.</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody id="tbody">
                                {coffeeData.map(cof => (
                                    <tr key={cof.id}>
                                        <th className="product-thumb img-fluid"><Image src={`/images/products/${cof.logo}`} width={120} height={120} alt={cof.brand} /></th>
                                        <td className="product-details">
                                            <span><strong>Brand:</strong> {cof.brand}</span>
                                            <span><strong>ProductId: </strong>{cof.productId}</span>
                                            <span><strong>Price: </strong> £{cof.price}</span><br />
                                        </td>
                                        <td className="text-center">
                                            <div className="form-group">
                                                <label htmlFor={`quantity-select-${cof.id}`}></label>
                                                <select className="form-control" id={`quantity-select-${cof.id}`} defaultValue={cof.quantity}>
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option>
                                                    <option value={4}>4</option>
                                                    <option value={5}>5</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td className="text-center">£{cof.quantity * cof.price}</td>
                                        <td className="text-center">
                                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleRemoveItem(cof.id)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={4} align="left">
                                        <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => deleteAction(props.uId)}>Empty Cart</button>
                                    </td>
                                    <td colSpan={4} align="right">
                                        <button type="button" className="btn btn-outline-success btn-sm" onClick={() => handleOrder(props.uId)}>Submit order</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}
