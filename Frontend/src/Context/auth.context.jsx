import {
    createContext,
    useContext,
    useState
} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const [myListings, setMyListings] = useState([]);
    const [wishlist, setWishlist] = useState([]);

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

export const useAuth = () => {
    return useContext(AuthContext);
};