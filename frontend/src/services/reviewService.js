import sendRequest from "./sendRequest";

const BASE_URL = '/api/games';

export async function getReviews(gameId) {
    // GET /api/games/:gameId/reviews
    return await sendRequest(`${BASE_URL}/${gameId}/reviews`);
};

export async function createReview(gameId, data) {
    // POST /api/games/:gameId/reviews
    return await sendRequest(`${BASE_URL}/${gameId}/reviews`, 'POST', data);
};

export async function updateReview(gameId, reviewId, data) {
    // PUT /api/games/:gameId/reviews/:reviewId
    return await sendRequest(`${BASE_URL}/${gameId}/reviews/${reviewId}`, 'PUT', data);
};

export async function deleteReview(gameId, reviewId,) {
    // DELETE /api/games/:gameId/reviews/:reviewId
    return await sendRequest(`${BASE_URL}/${gameId}/reviews/${reviewId}`, 'DELETE');
};