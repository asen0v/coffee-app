'use client';
import { useEffect, useState } from "react";
import { db } from '@/app/firebaseConfig';
import Header from "@/app/Component/Header";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { ImgCard2 } from "@/app/Component/Card";
import { getSession } from "@/app/lib";
import Link from 'next/link';

async function fetchDataFromFirebase() {
    const collectionRef = collection(db, "products");
    const q = query(collectionRef, orderBy("brand"));

    const querySnapShot = await getDocs(q);

    const data = [];
    querySnapShot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });

    return data;
}

export default function FireBaseFetchData() {
    const [coffeeData, setCoffeeData] = useState([]);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSession = async () => {
            const sessionData = await getSession();
            setSession(sessionData);
            setLoading(false);
        };
        loadSession();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataFromFirebase();
            setCoffeeData(data);
        }
        fetchData();
    }, []);

    if (loading) {
        return <div className="alert alert-info">Loading...</div>;
    }

    return (
        <>
            <hr />
            <h1 className="display-4 text-center">All Products</h1>
            <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-1">
                {
                    coffeeData.map(cof => (
                        <div className="col" id={cof.id} key={cof.id}>
                            <ImgCard2 values={{ id: cof.id, brand: cof.brand, name: cof.name, description: cof.description, pType: cof.pType, weight: cof.weight, type: cof.type, price: parseFloat(cof.price).toFixed(2), roast: cof.roast, logo: cof.logo }} session={session} />
                        </div>
                    ))
                }
            </div>
        </>
    );
}