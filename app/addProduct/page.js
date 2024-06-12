'use client';
import Header from "@/app/Component/Header";
import { db } from '@/app/firebaseConfig';
import { useState, useEffect } from "react";
import { addDoc, collection } from 'firebase/firestore';
import { getSession } from "@/app/lib";
import Link from 'next/link';
import Image from "next/image";

async function addProducts(cBrand, cDescription, cLogo, cName, cPrice, cpType, cRoast, cType, cWeight, cQuantity) {
    try {
        const docRef = await addDoc(collection(db, "products"), {
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
        });
        return true;
    } catch (error) {
        console.error("Error occurred while adding product", error);
    }
}

export default function AddProduct() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState("nologo.png");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [pType, setpType] = useState("Coffee Beans");
    const [roast, setRoast] = useState(0);
    const [type, setType] = useState("100% Arabica - example");
    const [weight, setWeight] = useState(0);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const sessionData = await getSession();
            setSession(sessionData);
            setLoading(false);
        }
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const added = await addProducts(brand, description, logo, name, price, pType, roast, type, weight, quantity);
        if (added) {
            setBrand("");
            setDescription("");
            setLogo("");
            setName("");
            setPrice(0);
            setpType("");
            setRoast("");
            setType("");
            setWeight("");
            setQuantity("");
            alert('Coffee product added successfully');
        }
    }

    if (loading) return <div className="alert alert-info">Loading...</div>;
    if (!session || !session.admin) return <div className="alert alert-danger">You must be an admin to view this page. Please log in as an admin from here - <Link href="/login"><b>Login</b></Link></div>;

    return (
        <>
              <div className="d-flex justify-content-center widget welcome-message py-4">
            
            <main className="form-signin align-items-center w-50 ">
            <h1 className="display-4 text-center">Add Product</h1><hr />
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
                <button type="submit" className="btn btn-primary w-100 py-2 mb-2">Add New Product</button>
            </form>
            </main>
            </div>
        </>
    )
}
