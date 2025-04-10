const URL_PREFIX = "http://52.23.164.179:8000";
const WEBSOCKET_PREFIX = "ws://52.23.164.179:8000/ws/users";

export const AUTH_API = {
    login: `${URL_PREFIX}/auth/login`,
    register: `${URL_PREFIX}/auth/register`,
    logout: `${URL_PREFIX}/auth/logout`,
    refreshToken: `${URL_PREFIX}/auth/refresh-token`,
    changePassword: `${URL_PREFIX}/auth/change-password`,
    resetPassword: `${URL_PREFIX}/auth/reset-password`,
};


export const USER_API = {
    getUser: `${URL_PREFIX}/users/{id}`,
    getCurrentUser: `${URL_PREFIX}/users/me`,
    updateUser: `${URL_PREFIX}/users/{id}`,

    getContacts: `${URL_PREFIX}/users/{id}/contacts`,
    updateContact: `${URL_PREFIX}/users/{id}/contacts/{user_id}`,
    getGroups: `${URL_PREFIX}/users/{id}/groups`,
    getGroup: `${URL_PREFIX}/users/groups/{id}`,
    updateGroup: `${URL_PREFIX}/users/groups/{id}`,
    addGroupMember: `${URL_PREFIX}/users/groups/{id}/members`,
    removeGroupMember: `${URL_PREFIX}/users/groups/{id}/members/{user_id}`,
    
};

export const MEDIA_API = {
    upload: `${URL_PREFIX}/medias/upload?is_public=true&bucket=zalo-private-test`,
    download: `${URL_PREFIX}/medias/get-public-file-url?s3_key={s3_key}&is_public=true&bucket=zalo-private-test`
}

export const WEBSOCKET = {
    connect: `${WEBSOCKET_PREFIX}/{id}`,
    getConversation: `${URL_PREFIX}/chats/chat/{group_id}?limit=25`,
}
