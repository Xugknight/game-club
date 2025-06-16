import sendRequest from './sendRequest';

export function getAllFlags() {
  return sendRequest('/api/admin/flags')
};

export function deleteGame(id) {
  return sendRequest(`/api/admin/games/${id}`, 'DELETE')
};

export function deleteReview(id) {
  return sendRequest(`/api/admin/reviews/${id}`, 'DELETE')
};

export function resolveFlag(id) {
  return sendRequest(`/api/admin/flags/${id}`, 'DELETE')
};