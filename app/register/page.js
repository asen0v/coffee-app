'use client';
import { useState } from "react";
import { db } from '../firebaseConfig';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

async function registerUser({ email, name, password, username }) {
    const usersCollectionRef = collection(db, "users");

    // Check for existing user with the same email
    const emailQuery = query(usersCollectionRef, where("email", "==", email));
    const emailQuerySnapshot = await getDocs(emailQuery);
    if (!emailQuerySnapshot.empty) {
        throw new Error("The email is already registered! Please try to log in!");
    }

    // Check for existing user with the same username
    const usernameQuery = query(usersCollectionRef, where("username", "==", username));
    const usernameQuerySnapshot = await getDocs(usernameQuery);
    if (!usernameQuerySnapshot.empty) {
        throw new Error("Username is already in use! Please try a different one.");
    }

    // Add new user if email and username are unique
    const userData = {
        avatar: "noavatar.png",
        email: email,
        money: 500,
        name: name,
        password: password,
        role: "user",
        username: username
    };
    await addDoc(usersCollectionRef, userData);
}

export default function RegistrationForm() {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        username: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            setMessage("Registration successful!");
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="d-flex justify-content-center widget welcome-message py-4">
            
        <main className="form-signin align-items-center w-50 ">
        {message && <div className={`alert ${message === "Registration successful!" ? 'alert-success' : 'alert-danger'} text-center`}>{message}</div>}

                <h1 className="display-4 fw-normal text-center">Register</h1><br />
           
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-2">
                <label  className="form-label"></label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                     <label for="floatingInput">Email</label>
                </div>
                <div className="form-floating mb-2">
                    <label className="form-label"></label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Name"
                    />
                     <label for="floatingName">Name</label>
                </div>
                <div className="form-floating mb-2">
                    <label className="form-label"></label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="password"
                        required
                    />
                     <label for="floatingPassword">Password</label>
                </div>
                <div className="form-floating mb-2">
                    <label className="form-label"></label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                    />
                     <label for="floatingUsername">Username</label>
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2 mb-2">Create an account</button>
            </form>
            </main>
        </div>
    );
}
