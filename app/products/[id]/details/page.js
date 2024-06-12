
import ProductDetails from "@/app/Component/productDetails";
import { db } from "@/app/firebaseConfig";
import { getSession } from "@/app/lib";
import { getDoc, doc } from "firebase/firestore";

async function fetchCoffeeRecord(docId){
    const docRef = await doc(db, "products", docId);
    const docSnap = await getDoc(docRef);
    
    const data = [];
    
    data.push({id:docId, brand: docSnap.get("brand"), description: docSnap.get("description"), logo: docSnap.get("logo"), name: docSnap.get("name"), price: docSnap.get("price"), pType: docSnap.get("pType"), roast: docSnap.get("roast"), type: docSnap.get("type"), weight: docSnap.get("weight"), quantity: docSnap.get("quantity")});
    return data;
}

export default async function coffeeDetail({props, params}){
    const session = await getSession();
    const coffeeData = fetchCoffeeRecord(params.id);
    let userID = "";
    if (session) {
        userID = session.user ? session.user.uId : session.admin.uId;
    }
    console.log(session);
    const brand  = await coffeeData.then(result => result[0].brand);
    const description  = await coffeeData.then(result => result[0].description);
    const logo  = await coffeeData.then(result => result[0].logo);
    const name  = await coffeeData.then(result => result[0].name);
    const price  = await coffeeData.then(result => result[0].price);
    const pType  = await coffeeData.then(result => result[0].pType);
    const roast  = await coffeeData.then(result => result[0].roast);
    const type  = await coffeeData.then(result => result[0].type);
    const weight  = await coffeeData.then(result => result[0].weight);
    const quantity  = await coffeeData.then(result => result[0].quantity);
    

    return(
        <ProductDetails props={{productId:params.id, uId: userID, brand: brand, description: description, logo: logo, name: name, price: price, pType: pType, roast: roast, type: type, weight: weight, quantity: quantity}}/>
    )
}