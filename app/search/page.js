
'use client';
import { useEffect, useState, use } from "react";
import Header from "../Component/Header";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ImgCard2 } from "../Component/Card";
import { useRouter } from "next/navigation";

export default function Search(){

    const [allProducts, setAllProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const router = useRouter();

    async function getProductsData(){
        const collectionRef = collection(db, "products");
        const docsSnap = await getDocs(collectionRef);

        const data = [];
        docsSnap.forEach((doc) => {
            data.push({id:doc.id,...doc.data()});
        })

        setAllProducts(data);
        setFilteredProducts(data);
    }

    useEffect (()=> {
        getProductsData();
    }, []); //dependancy 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const filtered = allProducts.filter((product) => 
            product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()) || 
            product.type.toLowerCase().includes(searchQuery.toLocaleLowerCase())  
        );
        setFilteredProducts(filtered);
    };

    return(
        <>
        
        <hr />
            <h1 className="display-4 fw-normal">Search Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col col-lg-12 col-md-4 col-sm-2">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Type to search product by brand, name or type" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            <div className="input-group-append">
                                <button type="submit" className="btn btn-info">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-1">
                {
                    filteredProducts.map((cof, index) => (
                    
                        <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-1" key={cof.id}>
                        <ImgCard2 key={index} values={{id:cof.id, brand:cof.brand, name:cof.name, description:cof.description, pType:cof.pType, weight:cof.weight, type:cof.type, price: parseFloat(cof.price).toFixed(2), roast:cof.roast, logo:cof.logo}} />
                     </div>
                    ))
                }
            </div>
        </>
    )
}