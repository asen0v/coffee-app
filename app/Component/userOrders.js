'use client';
import { useEffect, useState } from "react";
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";

async function fetchOrdersFromFirebase(uId) {
    const collectionRef = collection(db, "orders");
    const q = query(collectionRef, where("uId", "==", uId));
    const querySnapShot = await getDocs(q);
    const data = [];
    querySnapShot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

export default function UserOrders({ props }) {
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchOrdersFromFirebase(props.uId);
            setOrderData(data);
        }
        fetchData();
    }, [props.uId]);

    return (
        <>
            
            <div className="col">
				
				<div className="widget dashboard-container">
					<h3 className="widget-header text-center">My Orders</h3>
					<table className="table table-responsive product-dashboard-table">
                    <thead>
                        <tr className="text-center">
                            <th scope="col">#</th>
                            <th scope="col">Photo</th>
                            <th scope="col">Product</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th score="col">Order Status</th>
                        </tr>
                    </thead>
                    <tbody id="tbody">
                        {orderData.map((order, orderIndex) => (
                            order.items.map((item, itemIndex) => (
                                <tr key={`${order.id}-${item.id}`}>
                                    <th scope="row">{orderIndex + 1}.{itemIndex + 1}</th>
                                    <th className="product-thumb"><Image src={`/images/products/${item.logo}`} width={120} height={120} alt={item.brand}/></th>
                                    <td className="product-details">
									<h2 >{item.brand}</h2>
									<span className="add-id"><strong>Order ID:</strong> {order.id}</span>
									<span><strong>Product ID: </strong> {item.productId}</span>
                                    <span><strong>Order Time: </strong> {order.orderDate}</span>
									
									
								</td>
                                <td className="product-category"><span className="categories">{item.quantity}</span></td>
                                    <td>£{(item.price * item.quantity)}</td>
                                    <td className="action" data-title="Action">
									<span className="badge-pill badge-primary">{order.status}</span>
								</td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>

           
						
</div>
				
        </>
    );
}
