import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Get token from localStorage
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please login first");
    }

    return {
        Authorization: `Bearer ${token}`
    };
};


// BUY REQUEST
export const sendBuyRequest = async (itemId, message = "") => {

    const response = await api.post(
        `/api/requests/buy/${itemId}`,
        { message },
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// SWAP REQUEST
export const sendSwapRequest = async (itemId, message = "") => {

    const response = await api.post(
        `/api/requests/swap/${itemId}`,
        { message },
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// GET REQUESTS RECEIVED BY CURRENT USER
export const getReceivedRequests = async () => {

    const response = await api.get(
        "/api/requests/received",
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// GET REQUESTS SENT BY CURRENT USER
export const getMyRequests = async () => {

    const response = await api.get(
        "/api/requests/my",
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// ACCEPT REQUEST
export const acceptRequest = async (requestId) => {

    const response = await api.put(
        `/api/requests/${requestId}/accept`,
        {},
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// REJECT REQUEST
export const rejectRequest = async (requestId) => {

    const response = await api.put(
        `/api/requests/${requestId}/reject`,
        {},
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// CANCEL REQUEST
export const cancelRequest = async (requestId) => {

    const response = await api.put(
        `/api/requests/${requestId}/cancel`,
        {},
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};
