import axios from "axios";

const API = axios.create({
    //backend port
    baseURL: "http://localhost:5000",
});

//register user

export const registerUser =  (userData) => {
    return API.post("/register", userData);
};