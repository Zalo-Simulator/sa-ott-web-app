import { IndexedDb } from "$lib/service/IndexedDb";
const dbInstance = IndexedDb.getInstance("common-storage", "session");

export const isUserLoggedIn = async () => {
    let res = await dbInstance.getValue("session-login")
    return !!res;
}

export const logInUserSession = async (data: any, phone: string) => {
    dbInstance.saveValue("session-login", {
        access_token: data.access_token,
        token_type: data.token_type
    });
    updateUserSession({
        id: data.id,
        full_name: data.full_name,
        avatar_url: data.avatar_url,
        phone: phone
    })
}

export const logOutUserSession = async () => {
    dbInstance.saveValue("session-login", null);
    dbInstance.saveValue("current-user", null);
}

export const getUserSession = async () => {
    let res = await dbInstance.getValue("session-login")
    return res;
}

export const updateUserSession = async (currentUser: any) => {
    dbInstance.saveValue("current-user", currentUser);
}

export const getCurrentSessionUser = async () => {
    let userObject = await dbInstance.getValue("current-user")
    return userObject;
}
