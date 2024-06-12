import { getSession } from "@/app/lib";
import UserOrders from "@/app/Component/userOrders";


export default async function UserOrder(){
    const session = await getSession();
    let userID = "";
    if (session) {
        userID = session.user ? session.user.uId : session.admin.uId;
    }
    
    return(
        <UserOrders props={{uId: userID}}/>
    )
}