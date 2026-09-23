import { register, login } from "../Server/Api";
import { useAuth } from "./auth.context";

export const useUser = () => {

    const {
        user,
        setUser,
        loading,
        setLoading
    } = useAuth();


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

            console.error("LOGIN ERROR:", err);

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

            console.error("REGISTER ERROR:", err);

            throw err;

        } finally {

            setLoading(false);

        }
    };


    // ================================
    // LOGOUT
    // ================================

    const handleLogout = () => {

        setUser(null);

        localStorage.removeItem("token");
    };


    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout
    };
};