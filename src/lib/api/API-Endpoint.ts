const URL_PREFIX = "http://3.89.90.31:8000"; //import.meta.env.VITE_API_URL // 
const WEBSOCKET_PREFIX = "ws://3.89.90.31:8000/ws/users";// import.meta.env.VITE_WEBSOCKET_URL 

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
    updateUser: `${URL_PREFIX}/users/me`,
    searchUsers: `${URL_PREFIX}/users/?text={text}`,
};

export const FRIEND_API = {
    getFriends: `${URL_PREFIX}/friends`,
    getPendingFriends: `${URL_PREFIX}/friends/pending`,
    makeFriend: `${URL_PREFIX}/friends/{friend_id}`,
    acceptFriend: `${URL_PREFIX}/friends/{friend_id}`,
    removeFriend: `${URL_PREFIX}/friends/{friend_id}`,
};

export const GROUP_API = {
    getGroups: `${URL_PREFIX}/groups`,
    createGroup: `${URL_PREFIX}/groups`,
    getGroup: `${URL_PREFIX}/groups/{id}`,
    updateGroup: `${URL_PREFIX}/groups/{id}`,
    getPrivateGroup: `${URL_PREFIX}/groups/private/{friend_id}`

};

export const MEDIA_API = {
    upload: `${URL_PREFIX}/medias/upload?is_public=true&bucket=zalo-private-test`,
    getAllFiles: `${URL_PREFIX}/medias/me?bucket=zalo-private-test`,
    download: `${URL_PREFIX}/medias/get-public-file-url?s3_key={s3_key}&is_public=true&bucket=zalo-private-test`
}

export const WEBSOCKET = {
    connect: `${WEBSOCKET_PREFIX}/{id}`,
    getConversation: `${URL_PREFIX}/chats/chat/{group_id}?limit={num_message}`,
}
