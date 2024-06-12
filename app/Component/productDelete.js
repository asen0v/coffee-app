
import {db} from "@/app/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

export default async function ProductDelete(productDocId){
    
    const docRef = doc(db,"products",productDocId);
    const response = await deleteDoc(docRef);
    return response;
        
}