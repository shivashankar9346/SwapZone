import axios from "axios"


const api = axios.create({
    baseURL :"http://localhost:3000"
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

        return response.data

    }
    catch(err){
        console.log(err);
        
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