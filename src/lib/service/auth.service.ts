import { LoginUser, RequestUser, VerifyUser } from "@/types/auth.types";
import axios from "axios";

const createUser = async (user: RequestUser) => {
    try {   
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/create`, user);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const loginUser = async (user: LoginUser) => {
    try {   
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, user);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const verifyUser = async (user: VerifyUser) => {
    try {   
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user/verify-email`, user);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export { createUser, loginUser, verifyUser };
