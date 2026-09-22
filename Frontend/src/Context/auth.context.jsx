import { createContext, useState } from "react";
import { getMe } from "../Server/Api";
import { useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // Shared listings and wishlist
    const [myListings, setMyListings] = useState([]);
    const [wishlist, setWishlist] = useState([]);


     useEffect(() => {

        const restoreUser = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {

                const data = await getMe();

                console.log("✅ USER RESTORED:", data.user);

                setUser(data.user);

            } catch (error) {

                console.log("❌ TOKEN INVALID OR EXPIRED");

                localStorage.removeItem("token");
                setUser(null);

            } finally {

                setLoading(false);
            }
        };

        restoreUser();

    }, []);


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,

                loading,
                setLoading,

                myListings,
                setMyListings,

                wishlist,
                setWishlist
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};