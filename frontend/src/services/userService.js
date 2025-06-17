import sendRequest from './sendRequest';

const BASE_URL = '/api/users';

export function getProfile(userId) {
    return sendRequest(`${BASE_URL}/${userId}`);
};

export function getFavorites(userId) {
    return sendRequest(`${BASE_URL}/${userId}/favorites`);
};

export function addFavorite(userId, gameId) {
    return sendRequest(`${BASE_URL}/${userId}/favorites/${gameId}`, 'POST');
};

export function removeFavorite(userId, gameId) {
    return sendRequest(`${BASE_URL}/${userId}/favorites/${gameId}`, 'DELETE');
};