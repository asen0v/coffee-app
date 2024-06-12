import { getSession } from "../lib"

export default async function Wrapper({props, children}){
    const session = await getSession();
    return(
        <>
        {children}
        </>
    )
}