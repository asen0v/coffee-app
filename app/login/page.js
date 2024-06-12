
import Header from "../Component/Header";
import { getSession, login } from "../lib";

export default async function UserLogin() {

    const session = await getSession();
    const handleSubmit = async (formData) => {
    'use server';
    const loginStatus = await login(formData.get("txtUserName"), formData.get("txtUserPassword"));
        return false;
    }

return (
    <>
    <div className="d-flex justify-content-center widget welcome-message py-4">
    <main className="form-signin align-items-center w-50 ">
            <h1 className="display-4 fw-normal text-center">Login</h1><br />
    <form id="formLogin" action={handleSubmit}>
                <div className="form-floating mb-2">
                    <label  className="form-label"></label>
                    <input type="text" id="txtUserName" name="txtUserName"  placeholder="Username" className="form-control"  required/>
                    <label for="floatingInput">Username</label>
                    
                </div>
                <div className="form-floating mb-2">
                    <label className="form-label"></label>
                    <input type="password" id="txtUserPassword" name="txtUserPassword" placeholder="Password" className="form-control"  required/>
                    <label for="floatingPassword">Password</label>
                </div>
                
                <button type="submit" className="btn btn-primary w-100 py-2 mb-2" >Submit</button>
            </form>

          
            </main>
            </div>

    </>
)
}