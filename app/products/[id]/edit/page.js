'use client';

import Header from "@/app/Component/Header";
import { db } from "@/app/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { getSession } from "@/app/lib";
import Link from 'next/link';
import Image from "next/image";

async function fetchCoffeeRecord(docID) {
    const docRef = await doc(db, "products", docID);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

async function updateCoffeeRecord(productId, cBrand, cDescription, cLogo, cName, cPrice, cpType, cRoast, cType, cWeight, cQuantity) {
    try {
        const docRef = await doc(db, "products", productId);
        const data = {
            brand: cBrand,
            description: cDescription,
            logo: cLogo,
            name: cName,
            price: parseFloat(cPrice),
            pType: cpType,
            roast: parseInt(cRoast),
            type: cType,
            weight: parseFloat(cWeight),
            quantity: parseFloat(cQuantity)
        }

        await updateDoc(docRef, data);
        return true;

    } catch (error) {
        console.error("An error occurred, please try again.", error);
    }
}

export default function EditProduct({ params }) {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [pType, setpType] = useState("");
    const [roast, setRoast] = useState("");
    const [type, setType] = useState("");
    const [weight, setWeight] = useState("");
    const [quantity, setQuantity] = useState("");
    const [productId, setProductId] = useState(params.id);

    useEffect(() => {
        async function fetchData() {
            const sessionData = await getSession();
            setSession(sessionData);
            setLoading(false);

            if (sessionData && sessionData.admin) {
                const productData = await fetchCoffeeRecord(params.id);
                setBrand(productData.brand);
                setDescription(productData.description);
                setLogo(productData.logo);
                setName(productData.name);
                setPrice(productData.price);
                setpType(productData.pType);
                setRoast(productData.roast);
                setType(productData.type);
                setWeight(productData.weight);
                setQuantity(productData.quantity);
            }
        }
        fetchData();
    }, [params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        var txtBrand = document.getElementById("txtBrand").value;
        var txtDescription = document.getElementById("txtDescription").value;
        var txtLogo = document.getElementById("txtLogo").value;
        var txtName = document.getElementById("txtName").value;
        var txtPrice = document.getElementById("txtPrice").value;
        var txtpType = document.getElementById("txtpType").value;
        var txtRoast = document.getElementById("txtRoast").value;
        var txtType = document.getElementById("txtType").value;
        var txtWeight = document.getElementById("txtWeight").value;
        var txtQuantity = document.getElementById("txtQuantity").value;

        const updateStatus = await updateCoffeeRecord(productId, txtBrand, txtDescription, txtLogo, txtName, txtPrice, txtpType, txtRoast, txtType, txtWeight, txtQuantity);
        if (updateStatus) {
            alert("Coffee Product Updated Successfully");
        }
    }

    if (loading) return <div className="alert alert-info">Loading...</div>;
    if (!session || !session.admin) return <div className="alert alert-danger">You must be an admin to view this page. Please log in as an admin from here - <Link href="/login"><b>Login</b></Link></div>;

    return (
        <>
            <div className="d-flex justify-content-center widget welcome-message py-4">
            
            <main className="form-signin align-items-center w-50 ">
            <h1 className="display-4 text-center">Edit Product</h1><hr />
            <form onSubmit={handleSubmit}>

            <label  className="form-label"  htmlFor="txtBrand">Coffee Brand</label>
            <div class="mb-3 input-group ">
                <span class="input-group-text"><Image src={"/icons/brand.png"} width={24} height={24} alt={"coffee brand icon"} /></span>
                <input type="text" id="txtBrand" className="form-control"  value={brand} onChange={(e) => setBrand(e.target.value)} />
            </div>
               
            <label  className="form-label"  htmlFor="txtDescription">Coffee Description</label>
            <div class="mb-3 input-group ">
                <span class="input-group-text"><Image src={"/icons/description.png"} width={24} height={24} alt={"coffee description icon"} /></span>
                <input type="text" id="txtDescription" className="form-control"  value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
               <label  className="form-label"  htmlFor="txtName">Coffee Name</label>
            <div class="mb-3 input-group ">
                <span class="input-group-text"><Image src={"/icons/name.png"} width={24} height={24} alt={"coffee name icon"} /></span>
                <input type="text" id="txtName" className="form-control"  value={name} onChange={(e) => setName(e.target.value)} />
            </div>
             <label  className="form-label"  htmlFor="txtpType">Product Type</label>
            <div class="mb-3 input-group ">
                <span class="input-group-text"><Image src={"/icons/coffee-beans.png"} width={24} height={24} alt={"coffee product type icon"} /></span>
                <select id="txtpType" className="form-control"  value={pType} onChange={(e) => setpType(e.target.value)}>
                <option value="Coffee Beans">Coffee Beans</option>
<option value="Grounded Coffee">Grounded Coffee</option>
                
                    </select>

            </div>
            <label  className="form-label"  htmlFor="txtType">Coffee Type</label>
            <div class="mb-3 input-group ">
                <span class="input-group-text"><Image src={"/icons/beans.png"} width={24} height={24} alt={"coffee type icon"} /></span>
                <input type="text" id="txtType" className="form-control"  value={type} onChange={(e) => setType(e.target.value)} />
            </div>
            <label  className="form-label"  htmlFor="txtRoast">Coffee Roast</label>
            <div class="mb-3 input-group ">
                <span class="input-group-text"><Image src={"/icons/coffee-roast.png"} width={24} height={24} alt={"coffee roast icon"} /></span>
                <select  id="txtRoast" className="form-control"  value={roast} onChange={(e) => setRoast(e.target.value)}>
                <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option>
                                                    <option value={4}>4</option>
                                                    <option value={5}>5</option>
                                                    <option value={6}>6</option>
                                                    <option value={7}>7</option>
                                                    <option value={8}>8</option>
                                                    <option value={9}>9</option>
                                                    <option value={10}>10</option>

                                                    </select>
            </div>
            <label  className="form-label"  htmlFor="txtPrice">Price</label>
            <div class="mb-3 input-group ">
                <span class="input-group-text">£</span>
                <input type="number" id="txtPrice" step="0.01" className="form-control"  value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <label  className="form-label"  htmlFor="txtWeight">Weight</label>
            <div class="mb-3 input-group ">
                <span class="input-group-text"><Image src={"/icons/weight.png"} width={32} height={32} alt={"coffee weight icon"} /></span>
                <input type="number" id="txtWeight" step="0.001" className="form-control"  value={weight} onChange={(e) => setWeight(e.target.value)} />
                <span class="input-group-text">kg.</span>
            </div>
            <label  className="form-label"  htmlFor="txtQuantity">Quantity</label>
            <div class="mb-3 input-group ">
                <span class="input-group-text"><Image src={"/icons/quantity.png"} width={24} height={24} alt={"coffee quantity icon"} /></span>
                <input type="number" id="txtQuantity" className="form-control"  value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                
            </div>
            <label  className="form-label"  htmlFor="txtLogo">Logo</label>
            <div class="mb-3 input-group ">
                <span class="input-group-text"><Image src={"/icons/logo.png"} width={24} height={24} alt={"coffee logo icon"} /></span>
                <input type="text" id="txtLogo" className="form-control"  value={logo} onChange={(e) => setLogo(e.target.value)} />
               
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2 mb-2">Edit Product</button>
            </form>
            
            </main>
            </div>
            </>
    )
}
