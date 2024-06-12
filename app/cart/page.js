import { getSession } from "@/app/lib";
import CartDetails from "@/app/Component/cartDetails";


export default async function CartDetail(){
    const session = await getSession();
    let userID = "";
    if (session) {
        userID = session.user ? session.user.uId : session.admin.uId;
    }
    
    return(
        <CartDetails props={{uId: userID}}/>
    )
}