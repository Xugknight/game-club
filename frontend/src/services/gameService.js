import sendRequest from "./sendRequest";

const BASE_URL = '/api/games';

export async function index(page = 1, limit = 20) {
  return sendRequest(`${BASE_URL}?page=${page}&limit=${limit}`);
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