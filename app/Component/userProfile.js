'use client';
import { db } from "@/app/firebaseConfig";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getSession } from "@/app/lib";

async function fetchUserProfile(userID) {
    try {
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Fetched user profile data: ", docSnap.data());
            return docSnap.data();
        } else {
            console.error("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user profile: ", error);
        throw error;
    }
}

async function updateUserProfile(userId, uName, uEmail, uPassword, username) {
    try {
        const docRef = doc(db, "users", userId);
        const data = {
            name: uName,
            email: uEmail,
            password: uPassword,
            username: username
        }

        await updateDoc(docRef, data);
        return true;

    } catch (error) {
        console.error("An error occurred, please try again.", error);
        return false;
    }
}

async function countUserOrders(userId) {
    const collectionRef = collection(db, "orders");
    const q = query(collectionRef, where("uId", "==", userId));
    const snapShot = await getDocs(q);
    const count = snapShot.size;
    return count;
}

async function countProducts() {
    const collectionRef = collection(db, "products");
    const snapShot = await getDocs(collectionRef);
    const count = snapShot.size;
    return count;
}

async function countUsers() {
    const collectionRef = collection(db, "users");
    const snapShot = await getDocs(collectionRef);
    const count = snapShot.size;
    return count;
}

async function countUserCart(userId) {
    const collectionRef = collection(db, "cart");
    const q = query(collectionRef, where("uId", "==", userId));
    const snapShot = await getDocs(q);
    const count = snapShot.size;
    return count;
}

export default function EditUserProfile({ params }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState(params.username);
    const [money, setMoney] = useState(params.money);
    const [role, setRole] = useState(params.role);
    const [userId, setUserId] = useState(params.id);
    const [orderCount, setOrderCount] = useState(0);
    const [userCount, setUsersCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);
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
        const loadUserProfile = async () => {
            try {
                const userData = await fetchUserProfile(params.id);
                if (userData) {
                    setName(userData.name);
                    setEmail(userData.email);
                    setAvatar(userData.avatar);
                    setPassword(userData.password);
                    setUsername(userData.username);
                    setMoney(parseFloat(userData.money).toFixed(2)); // Ensuring that the money is formatted with 2 decimals
                    setRole(userData.role);
                } else {
                    console.warn("No user data found for userID: ", params.id);
                }
            } catch (error) {
                console.error("Error loading user profile:", error);
            }
        }
        loadUserProfile();
    }, [params.id]);

    useEffect(() => {
        const loadUserOrders = async () => {
            try {
                const count = await countUserOrders(params.id);
                setOrderCount(count);
            } catch (error) {
                console.error("Error loading user orders:", error);
            }
        }
        loadUserOrders();
    }, [params.id]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const count = await countProducts(params.id);
                setProductCount(count);
            } catch (error) {
                console.error("Error loading products:", error);
            }
        }
        loadProducts();
    }, [params.id]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const count = await countUsers(params.id);
                setUsersCount(count);
            } catch (error) {
                console.error("Error loading users:", error);
            }
        }
        loadUsers();
    }, [params.id]);



    useEffect(() => {
        const loadUserCart = async () => {
            try {
                const count = await countUserCart(params.id);
                setCartCount(count);
            } catch (error) {
                console.error("Error loading user cart:", error);
            }
        }
        loadUserCart();
    }, [params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateStatus = await updateUserProfile(userId, name, email, password, username);
        if (updateStatus) {
            alert("User Profile Updated Successfully");
        }
    }

    if (loading) return <div className="alert alert-info">Loading...</div>;

    return (
        <>
            <section className="user-profile section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="sidebar">
                                <div className="widget user">
                                    <div className="image d-flex justify-content-center">
                                        <Image src={`/avatars/${avatar}`} width={150} height={150} alt={"User Avatar"} className="" />
                                    </div>
                                    <h5 className="text-center">{name} <br />
                                        <span className="badge badge-pill badge-primary text-center">{role}</span>
                                    </h5>
                                    <hr />
                                    <p className="text-center"><Image src={"/icons/user.png"} width={16} height={16} alt={"Username icon"} /> Username: {username}</p>
                                    <p className="text-center"><Image src={"/icons/pound.png"} width={16} height={16} alt={"Balance icon"} /> Balance: £{money}</p>
                                </div>
                                <div className="widget user-dashboard-menu">
                                    <ul>
                                        <li><Link href="/profile"><i className="fa fa-user"></i> Profile Dashboard</Link></li>
                                        <li><Link href="/profile/orders"><i className="fa fa-barcode"></i> My Orders <span>{orderCount} order(s)</span></Link></li>
                                        <li><Link href="/cart"><i className="fa fa-cart-arrow-down"></i> Items in cart <span>{cartCount} item(s)</span></Link></li>
                                        {session && session.admin && (
                                            <>
                                                <li><Link href="/addProduct"><i className="fa fa-plus"></i> Add Products</Link></li>
                                                <li><Link href="/products"><i className="fa fa-cogs"></i> Manage Products <span>{productCount} product(s)</span></Link></li>
                                                <li><Link href="#"><i className="fa fa-users"></i> Manage Users <span>{userCount} user(s)</span></Link></li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="widget welcome-message">
                                <h2><i className="fa fa-user"></i> {username}'s profile</h2>
                                <p>Hey, <b>{name}</b>! From here you can edit your profile and check your orders!</p>
                            </div>
                            <div className="widget personal-info">
                                <h3 className="widget-header user">Edit Personal Information</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="first-name">Name</label>
                                        <input type="text" id="txtName" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input type="email" id="txtEmail" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="current-password">Current Password</label>
                                        <input type="password" id="txtPassword" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="form-group choose-file d-inline-flex">
                                        <i className="fa fa-user text-center px-3"></i>
                                        <input type="file" className="form-control-file mt-2 pt-1" id="input-file" />
                                    </div>
                                    <button type="submit" className="btn btn-transparent">Save My Changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
