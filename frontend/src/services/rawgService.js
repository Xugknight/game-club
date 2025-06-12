export async function searchRawgGames(search, page = 1) {
    const url = `/api/rawg/games?search=${encodeURIComponent(search)}&page=${page}`;
    const res = await fetch(url)
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
};

export async function getTrendingGames(page = 1) {
    const url = `/api/rawg/games/trending?page=${page}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
};