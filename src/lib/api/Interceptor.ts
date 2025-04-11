/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "@zerodevx/svelte-toast";
import { loader } from "$lib/components/loader/loader";
import { TOAST_THEME } from "$lib/constants/constants";
import { getUserSession, getCurrentSessionUser } from "$lib/service/login"
import { MEDIA_API } from '$lib/api/API-Endpoint'

// implement a method to execute all the request from here.
const apiRequest = async (
    method: string,
    url: string,
    request?: any,
    message?: string,
    toastTheme?: any,
    hideLoader?: boolean
) => {
    if (!hideLoader) {
        loader.showLoader();
    }
    try {

        const session: any = await getUserSession();
        let token = ''
        if (session) {
            token = session.access_token
        }

        let options = {
            method: method,
            body: JSON.stringify(request),
            headers: { accept: "application/json", "content-type": "application/json", "Authorization": `Bearer ${token}` }
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            loader.hideLoader();

            const responseJSON = await response.json();
            let message = responseJSON?.detail[0]?.msg;
            if (message) {
                toast.push(message, TOAST_THEME.ERROR);
            }
            return;
        }

        const responseJSON = await response.json();

        loader.hideLoader();
        if (message) {
            toast.push(message, toastTheme || TOAST_THEME.SUCCESS);
        }
        return responseJSON;
    } catch (error) {
        loader.hideLoader();
    }

};

const fileRequest = async (
    file: any
) => {
    loader.showLoader();
    try {

        const currentUser = await getCurrentSessionUser()
        const session: any = await getUserSession();

        const formData = new FormData()
        formData.append('user_id', currentUser.id)
        formData.append('file', file)

        let token = ''
        if (session) {
            token = session.access_token
        }

        const response = await fetch(MEDIA_API.upload, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })

        if (!response.ok) {
            loader.hideLoader();

            const responseJSON = await response.json();
            let message = responseJSON?.detail[0]?.msg;
            if (message) {
                toast.push(message, TOAST_THEME.ERROR);
            }
            return;
        }

        const responseJSON = await response.json();

        const downloadRes = await get(
            MEDIA_API.download.replace('{s3_key}', responseJSON.data.key)
        )

        loader.hideLoader();
        return downloadRes.data.url;
    } catch (error) {
        loader.hideLoader();
    }

};

// function to execute the http get request
const get = async (
    url: string,
    request?: any,
    message?: string,
    toastTheme?: any,
    hideLoader?: boolean
) => await apiRequest("get", url, request, message, toastTheme, hideLoader);

// function to execute the http delete request
const deleteRequest = async (
    url: string,
    request?: any,
    message?: string,
    toastTheme?: any,
    hideLoader?: boolean
) => await apiRequest("delete", url, request, message, toastTheme, hideLoader);

// function to execute the http post request
const post = async (
    url: string,
    request?: any,
    message?: string,
    toastTheme?: any,
    hideLoader?: boolean
) => await apiRequest("post", url, request, message, toastTheme, hideLoader);

// function to execute the http put request
const put = async (
    url: string,
    request?: any,
    message?: string,
    toastTheme?: any,
    hideLoader?: boolean
) => await apiRequest("put", url, request, message, toastTheme, hideLoader);

// function to execute the http path request
const patch = async (
    url: string,
    request: any,
    message?: string,
    toastTheme?: any,
    hideLoader?: boolean
) => await apiRequest("patch", url, request, message, toastTheme, hideLoader);

// expose your method to other services or actions
const API = {
    get,
    delete: deleteRequest,
    post,
    put,
    patch,
    fileRequest
};
export default API;
