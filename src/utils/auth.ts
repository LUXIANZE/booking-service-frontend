import {JWT_KEY} from "../constants/local-storage-constants";
import {login as httpLogin} from "../../src/http/security-api";
import {setBearerToken} from "../http/axios-config";
import jwtDecode from 'jwt-decode';

export const login = async (identity: string, pin: string) => {
    const loginRes = await httpLogin({
        identity: identity,
        pin: pin
    });

    if (loginRes && loginRes.status === 200) {
        localStorage.setItem(JWT_KEY, loginRes.data);
        setBearerToken(loginRes.data);
    }
};

export const logout = async () => {
    localStorage.removeItem(JWT_KEY);
};

export const isLoggedIn = () => {
    return !!localStorage.getItem(JWT_KEY);
};

export const getLoggedInIdentity = () => {
    const jwt = localStorage.getItem(JWT_KEY);

    if (jwt) {
        return jwtDecode<{ sub: string }>(jwt).sub;
    } else {
        throw new Error('No JWT found');
    }
};