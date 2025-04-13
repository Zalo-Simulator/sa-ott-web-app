import { IndexedDb } from "$lib/service/IndexedDb";
import API from '$lib/api/Interceptor'
import { MEDIA_API } from '$lib/api/API-Endpoint'

const dbInstance = IndexedDb.getInstance("common-cache-db", "data-cache");
const PREFIX_S3_KEY = "S3KEY:"
const PRIVATE_GROUP = "PRIVATEGROUPS"

export const getCachedImageUrl = async (token: string) => {
    let res = await dbInstance.getValue(PREFIX_S3_KEY + token)
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
    dbInstance.saveValue(PREFIX_S3_KEY + token, url);
}

export const getAllPrivateGroupIds = async () => {
    let res = await dbInstance.getValue(PRIVATE_GROUP)
    if (!res) {
        return {};
    }
    return res;
}

export const cahchePrivateGroupId = async (userId: any, groupId: any) => {
    let groups = await getAllPrivateGroupIds();
    groups['user' + userId] = groupId;
    dbInstance.saveValue(PRIVATE_GROUP, groups);
}