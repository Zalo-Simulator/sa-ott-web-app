import { IndexedDb } from "$lib/service/IndexedDb";
import API from '$lib/api/Interceptor'
import { MEDIA_API } from '$lib/api/API-Endpoint'

const dbInstance = IndexedDb.getInstance("common-cache", "image-cache");

export const getCachedImageUrl = async (token: string) => {
    let res = await dbInstance.getValue(token)
    if (!res && token) {
        let url = ''
        try {
            url = (await API.get(
                MEDIA_API.download.replace('{s3_key}', encodeURIComponent(token)), undefined, '', null, true
            )).data.url
        }
        catch (error) {
            url = ''
        }
        cacheImageUrl(token, url)
        return url;
    }
    return res;
}

export const cacheImageUrl = async (token: string, url: string) => {
    dbInstance.saveValue(token, url);
}