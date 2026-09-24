import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // =====================================
    // RESTORE USER AFTER PAGE REFRESH
    // =====================================

    useEffect(() => {

        const restoreUser = async () => {

            const token = sessionStorage.getItem("token");

            // No token = not logged in
            if (!token) {
                setLoading(false);
                return;
            }

            try {

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/auth/get-me`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Session expired"
                    );
                }

                // Restore user
                setUser(data.user);

            } catch (error) {

                console.error(
                    "❌ RESTORE USER ERROR:",
                    error
                );

                // Invalid/expired token
                sessionStorage.removeItem("token");
                setUser(null);

            } finally {

                setLoading(false);

            }
        };


        restoreUser();

    }, []);


    // =====================================
    // LOGOUT
    // =====================================

    const logout = () => {

        setUser(null);

        sessionStorage.removeItem("token");

    };


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,

                loading,
                setLoading,

                logout
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