import { useContext } from "react";
import { register, login, getMe } from "../Server/Api";
import { AuthContext } from "./auth.context";

export const useAuth = () => {

    const context = useContext(AuthContext);

    const {
        user,
        setUser,

        loading,
        setLoading,

        myListings,
        setMyListings,

        wishlist,
        setWishlist

    } = context;


    // ================================
    // LOGIN
    // ================================

    const handleLogin = async (formData) => {

        setLoading(true);

        try {

            const data = await login(formData);

            setUser(data.user);

            return data;

        } catch (err) {

            console.log(err);
            throw err;

        } finally {

            setLoading(false);

        }
    };


    // ================================
    // REGISTER
    // ================================

    const handleRegister = async (form) => {

        setLoading(true);

        try {

            const data = await register(form);

            setUser(data.user);

            return data;

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }
    };


    // ================================
    // LOGOUT
    // ================================

    const handleLogout = () => {

        setUser(null);

        // Clear shared data on logout
        setMyListings([]);
        setWishlist([]);

    };


    return {

        user,
        loading,

        handleLogin,
        handleRegister,
        handleLogout,

        // Shared listings
        myListings,
        setMyListings,

        // Shared wishlist
        wishlist,
        setWishlist
    };
};