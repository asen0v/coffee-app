'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { db } from '@/app/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import Link from 'next/link';

async function cartUpdate(id, price, brand, logo, uId) {
    try {
        await addDoc(collection(db, 'cart'), {
            productId: id,
            price: parseFloat(price),
            brand: brand,
            logo: logo,
            quantity: 1,
            uId: uId
        });
        return true;
    } catch (error) {
        console.error('Error occurred while adding the product to cart', error);
        return false;
    }
}

export default function ProductDetails({ props }) {
    const [message, setMessage] = useState('');

    function cartButtonCheck() {
        if (props.uId !== '') {
            return (
                <button
                    className="fa fa-cart-plus btn btn-success"
                    onClick={() => addCartAction(props.productId, props.price, props.brand, props.logo, props.uId)}
                >
                    Add to Cart
                </button>
            );
        } else {
            return (
                <Link href="/login" className="text-white btn btn-info fa fa-plus-circle">
                    Login to buy
                </Link>
            );
        }
    }

    async function addCartAction(id, price, brand, logo, uId) {
        const cartStatus = await cartUpdate(id, price, brand, logo, uId);
        if (cartStatus) {
            setMessage('Item successfully added to your cart!');
        } else {
            setMessage('Failed to add item to cart. Please try again.');
        }
    }

    return (
        <>
            <div className="col">
                <div className="widget dashboard-container">
                    <h1 className="text-center">{props.brand} - {props.name}</h1>
                    <table className="table table-responsive product-dashboard-table">
                        <thead>
                            <tr className="text-center">
                                <th scope="col">Photo</th>
                                <th scope="col">Description</th>
                                <th scope="col">In Stock</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            <tr>
                                <th className="product-thumb">
                                    <Image src={`/images/products/${props.logo}`} width={240} height={240} alt={props.brand} />
                                </th>
                                <td className="product-details">
                                    <span className="add-id"><strong>Description:</strong> {props.description}</span>
                                    <span><strong>Type: </strong>{props.pType}</span>
                                    <span><strong>Weight: </strong> {props.weight}kg.</span><br />
                                    <span className="text-center"><strong>Roast </strong>
                                        <div className="progress">
                                            <div className="progress-bar bg-warning text-center" role="progressbar" style={{ width: `${props.roast}0%` }} aria-valuenow={props.roast} aria-valuemin="0" aria-valuemax="10">{props.roast}</div>
                                        </div>
                                    </span>
                                </td>
                                <td className="product-category"><span className="categories">{props.quantity} in stock.</span></td>
                                <td>£{props.price}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <p className="text-right">{cartButtonCheck()}</p>
                    {message && <p className="alert alert-success">{message} - You can view your items in your <Image src="/icons/cart.png" width={24} height={24} alt={"cart icon"} /> <Link href="/cart"><b>Cart</b></Link></p>}
                </div>
            </div>
        </>
    );
}
