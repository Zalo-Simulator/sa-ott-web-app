export const isUserLoggedIn = () => {
    return !!sessionStorage.getItem("session-login");
}

export const logInUserSession = (data: any, phone: string) => {
    sessionStorage.setItem("session-login", JSON.stringify({
        access_token: data.access_token,
        token_type: data.token_type
    }));
    updateUserSession({
        id: data.id,
        full_name: data.full_name,
        avatar_url: data.avatar_url,
        phone: phone
    })
}

export const logOutUserSession = () => {
    sessionStorage.setItem("session-login", "");
    sessionStorage.setItem("current-user", "");
}

export const getUserSession = () => {
    return sessionStorage.getItem("session-login");
}

export const updateUserSession = (currentUser: any) => {
    sessionStorage.setItem("current-user", JSON.stringify(currentUser));
}

export const getCurrentSessionUser = () => {
    let userObject = sessionStorage.getItem("current-user")
    if (userObject) {
        return JSON.parse(userObject);
    }
    return null;
}
