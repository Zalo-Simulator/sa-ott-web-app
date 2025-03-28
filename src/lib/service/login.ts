import { getCurentUser } from "$lib/service/user"

export const isUserLoggedIn = () => {
    return !!sessionStorage.getItem("session-login");
}

export const logInUserSession = (data:any) => {
    sessionStorage.setItem("session-login", JSON.stringify(data));
    sessionStorage.setItem("current-user", JSON.stringify(getCurentUser()));
}

export const logOutUserSession = () => {
    sessionStorage.setItem("session-login", "");
    sessionStorage.setItem("current-user", "");
}

export const getUserSession = () => {
    return sessionStorage.getItem("session-login");
}

export const getcurrentSessionUser = () => {
    let userObject = sessionStorage.getItem("current-user")
    if (userObject) {
        return JSON.parse(userObject);
    }
    return null;
}