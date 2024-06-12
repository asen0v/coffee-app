'use client';

import { useEffect, useState } from 'react';
import EditUserProfile from '../Component/userProfile';
import { getSession } from '@/app/lib';
import { db } from "@/app/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Link from 'next/link';

export default function ProfilePage() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchSession() {
            try {
                const sessionData = await getSession();
                console.log("Session data: ", sessionData);
                setSession(sessionData);

                if (sessionData && sessionData.user && sessionData.user.uId) {
                    const userDoc = doc(db, "users", sessionData.user.uId); 
                    const userData = await getDoc(userDoc);
                    if (userData.exists()) {
                        const userProfile = { id: sessionData.user.uId, ...userData.data() };
                        console.log("User data: ", userProfile);
                        setUser(userProfile);
                    } else {
                        console.error("No user found with the provided ID.");
                    }
                } else if (sessionData && sessionData.admin && sessionData.admin.uId) {
                    const userDoc = doc(db, "users", sessionData.admin.uId); 
                    const userData = await getDoc(userDoc);
                    if (userData.exists()) {
                        const userProfile = { id: sessionData.admin.uId, ...userData.data() };
                        console.log("User data: ", userProfile);
                        setUser(userProfile);
                    } else {
                        console.error("No user found with the provided ID.");
                    }
                } else {
                    console.error("Session data is missing user information.");
                }
            } catch (error) {
                console.error("Error fetching session data: ", error);
            } finally {
                setLoading(false);
            }
        }
        fetchSession();
    }, []);

    if (loading) return <div className="alert alert-info">Loading...</div>;
    if (!session) return <div className="alert alert-danger">You must be logged in to view this page. Please log in from here - <Link href="/login"><b>Login</b></Link></div>;

    return (
        <div>
            <h1>Profile Page</h1>
            {user ? <EditUserProfile params={{ id: user.id }} /> : <div>Loading user data...</div>}
        </div>
    );
}
