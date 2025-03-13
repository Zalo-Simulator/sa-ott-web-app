const URL_PREFIX = "http://3.87.160.66:8000";

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
    updateUser: `${URL_PREFIX}/users/{id}`,
    getContacts: `${URL_PREFIX}/users/{id}/contacts`,
    updateContact: `${URL_PREFIX}/users/{id}/contacts/{user_id}`,
    getGroups: `${URL_PREFIX}/users/{id}/groups`,
    getGroup: `${URL_PREFIX}/users/groups/{id}`,
    updateGroup: `${URL_PREFIX}/users/groups/{id}`,
    addGroupMember: `${URL_PREFIX}/users/groups/{id}/members`,
    removeGroupMember: `${URL_PREFIX}/users/groups/{id}/members/{user_id}`,
    
};
