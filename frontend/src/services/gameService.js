import sendRequest from "./sendRequest";

const BASE_URL = '/api/games';
const FLAG_URL = '/api/flags/games';

export async function index() {
  return sendRequest(BASE_URL);
};

export async function show(id) {
  return sendRequest(`${BASE_URL}/${id}`);
};

export async function createGame(gameData) {
  return sendRequest(BASE_URL, 'POST', gameData);
};

export async function updateGame(id, gameData) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', gameData);
};

export async function deleteGame(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
};

export async function importFromRawg(rawgId) {
  return await sendRequest(`/api/rawg/games/${rawgId}/import`, 'POST');
};

export async function flagGame(gameId, reason) {
  return sendRequest(`${FLAG_URL}/${gameId}`, 'POST', { reason });
};

export async function checkGameFlag(gameId) {
  return sendRequest(`${FLAG_URL}/${gameId}`);
};