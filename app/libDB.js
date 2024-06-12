import { db } from "@/app/firebaseConfig";
import { collection, getDoc, doc, deleteDoc, query, where, getDocs, getCountFromServer } from "firebase/firestore";
import Cookies from "js-cookie";

/// Client side session check ////
const secretKey = "QASolentKey";
const key = new TextEncoder().encode(secretKey);

export async function decrypt(input) {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"]
    })
    return payload
  }


export function getClientSession(){
    const session = Cookies.get("session", {domain: 'localhost' });
    return session;
    //if(!session) return null;
    //return await decrypt(session);
}


////////////FireStore Function ////////////////////////

export async function countCartItem(){
    //Check Firebase for cart record
    const collectionRef = collection(db, "cart");
    //const q = query(collectionRef, where("uName", "==", userName), where("uPass","==",userPassword));
    //"Select * from users where uName=`userName` AND uPass=`userPassword`";
    const q = query(collectionRef);
    const snapShot = await getCountFromServer(q);
    const count = snapShot.data().count;
    return count;
  }



  export async function cartDelete(uId){
    
    const collectionRef = collection(db,"cart");
    const q = query(collectionRef,where("uId", "==" , uId));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((d) => {
      deleteDoc(doc(db,"cart",d.id));
    })
    return true;
}