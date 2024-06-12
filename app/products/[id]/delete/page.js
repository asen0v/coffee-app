import Header from "@/app/Component/Header";

export default function DeleteProduct({params}){
    return(
        <>
            <h1>Delete Car</h1>
            <p>{params.id}</p>
        </>
    )
}