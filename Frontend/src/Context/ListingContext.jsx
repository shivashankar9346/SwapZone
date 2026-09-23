import {
    createContext,
    useContext,
    useState
} from "react";

const ListingContext = createContext();

export const ListingProvider = ({ children }) => {

    const [myListings, setMyListings] = useState([]);

    return (
        <ListingContext.Provider
            value={{
                myListings,
                setMyListings
            }}
        >
            {children}
        </ListingContext.Provider>
    );
};

export const useListings = () => {

    const context = useContext(ListingContext);

    if (!context) {
        throw new Error(
            "useListings must be used inside ListingProvider"
        );
    }

    return context;
};