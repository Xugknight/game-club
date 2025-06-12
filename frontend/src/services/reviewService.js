import sendRequest from "./sendRequest";

const BASE_URL = '/api/games';

export function getReviews(gameId) {
    // GET /api/games/:gameId/reviews
    return sendRequest(`${BASE_URL}/${gameId}/reviews`);
};

export function createReview(gameId, data) {
    // POST /api/games/:gameId/reviews
    return sendRequest(`${BASE_URL}/${gameId}/reviews`, 'POST', data);
};

export function updateReview(gameId, reviewId, data) {
    // PUT /api/games/:gameId/reviews/:reviewId
    return sendRequest(`${BASE_URL}/${gameId}/reviews/${reviewId}`, 'PUT', data);
};

export function deleteReview(gameId, reviewId,) {
    // DELETE /api/games/:gameId/reviews/:reviewId
    return sendRequest(`${BASE_URL}/${gameId}/reviews/${reviewId}`, 'DELETE');
};