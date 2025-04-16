import { IndexedDb } from "$lib/service/IndexedDb";
const dbInstance = IndexedDb.getInstance("common-storage-db", "session");
import { AUTH_API } from '$lib/api/API-Endpoint'
import API from '$lib/api/Interceptor'
import { pageHomeClass } from '$lib/service/store'
import { goto } from '$app/navigation'

const EXPIRATION_TIME = 1 * 60 * 60 * 1000; // 1 hour in milliseconds

export const isUserLoggedIn = async () => {
    let res = await dbInstance.getValue("session-login")
    return !!res;
}

export const logInUserSession = async (data: any, phone: string) => {
    dbInstance.saveValue("session-login", {
        access_token: data.access_token,
        token_type: data.token_type,
        cachedTime: Date.now()
    });
    updateUserSession({
        id: data.id,
        full_name: data.full_name,
        avatar_url: data.avatar_url,
        phone: phone,
        is_online: true
    })
}

export const logOutUserSession = async () => {
    dbInstance.saveValue("session-login", null);
    dbInstance.saveValue("current-user", null);
}

export const refeshUserSession = async () => {
    let oldSession = await dbInstance.getValue("session-login")
    if (!!oldSession && (!oldSession?.cachedTime || Date.now() - oldSession?.cachedTime > EXPIRATION_TIME)) {
        let session = (
            await API.post(
                AUTH_API.refreshToken,
                undefined,
                '',
                null,
                true
            )
        ).data
        dbInstance.saveValue("session-login", {
            access_token: session.access_token,
            token_type: session.token_type,
            cachedTime: Date.now()
        });
    }
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

export const redirect = async () => {
    if (await isUserLoggedIn()) {
        goto('/chat').then(() => {
            pageHomeClass.set('')
        })
    }
}