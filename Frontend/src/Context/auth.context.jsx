import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { getMe } from "../Server/Api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    // true while checking existing login
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const restoreUser = async () => {

            const token = localStorage.getItem("token");

            // No token means user is logged out
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {

                console.log("🔄 Restoring user...");

                const data = await getMe();

                console.log("✅ User restored:", data.user);

                setUser(data.user);

            } catch (error) {

                console.error("❌ Failed to restore user:", error);

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
                setLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
};