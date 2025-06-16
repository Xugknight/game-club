import sendRequest from "./sendRequest";

const BASE_URL = '/api/games';

export async function getReviews(gameId) {
    return await sendRequest(`${BASE_URL}/${gameId}/reviews`);
};

export async function createReview(gameId, data) {
    return await sendRequest(`${BASE_URL}/${gameId}/reviews`, 'POST', data);
};

export async function updateReview(gameId, reviewId, data) {
    return await sendRequest(`${BASE_URL}/${gameId}/reviews/${reviewId}`, 'PUT', data);
};

export async function deleteReview(gameId, reviewId,) {
    return await sendRequest(`${BASE_URL}/${gameId}/reviews/${reviewId}`, 'DELETE');
};

export function flagReview(gameId, reviewId, reason) {
  return sendRequest(`/api/flags/reviews/${reviewId}`, 'POST', { reason });
};

export async function checkReviewFlag(reviewId) {
  return sendRequest(`/api/flags/reviews/${reviewId}`);
};