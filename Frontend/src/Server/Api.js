import axios from "axios"


const api = axios.create({
    baseURL :import.meta.env.VITE_API_URL
})

export async function register( form) {

    try {


        const response = await api.post("/api/auth/register",  form)

        return response.data;
    }
    catch (err) {
        console.log(err);

    }

}

export async function login(formData){

    try{

        const response = await api.post("/api/auth/login", formData)

        
        sessionStorage.setItem(
            "token",
            response.data.token
        );



        return response.data

    }
    catch(err){
        console.error(
            "LOGIN ERROR:",
            err.response?.data || err.message
        );

        throw err;
        
    }

}

export async function getMe() {

    try {

        const response = await api.get("/api/auth/get-me");

        return response.data;

    } catch (err) {

        console.log("Get Me Error:", err);

        throw err;
    }
}


// ================= ITEM APIs =================

export async function getItems() {

    try {

        const response = await api.get(
            "/api/items"
        );

        return response.data;

    } catch (err) {

        console.log("Get Items Error:", err);
        throw err;

    }
}


export async function getItemById(id) {

    try {

        const response = await api.get(
            `/api/items/${id}`
        );

        return response.data;

    } catch (err) {

        console.log("Get Item Error:", err);
        throw err;

    }
}


export async function createItem(formData) {

    try {

        const response = await api.post(
            "/api/items",
            formData
        );

        return response.data;

    } catch (err) {

        console.log("Create Item Error:", err);
        throw err;

    }
}



// ================= WISHLIST APIs =================

export async function getWishlist() {

    try {

        const response = await api.get(
            "/api/wishlist"
        );

        return response.data;

    } catch (err) {

        console.log("Get Wishlist Error:", err);
        throw err;

    }
}


export async function addToWishlist(itemId) {

    try {

        const response = await api.post(
            `/api/wishlist/${itemId}`
        );

        return response.data;

    } catch (err) {

        console.log("Add Wishlist Error:", err);
        throw err;

    }
}


export async function removeFromWishlist(itemId) {

    try {

        const response = await api.delete(
            `/api/wishlist/${itemId}`
        );

        return response.data;

    } catch (err) {

        console.log("Remove Wishlist Error:", err);
        throw err;

    }
}


api.interceptors.request.use((config) => {

    const token = sessionStorage.getItem("token");

    if (token) {

        config.headers.Authorization = `Bearer ${token}`;

    }

    return config;
});
