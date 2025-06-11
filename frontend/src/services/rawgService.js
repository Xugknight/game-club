export function searchRawgGames(search, page = 1) {
    const url = `/api/rawg/games?search=${encodeURIComponent(search)}&page=${page}`;
    return fetch(url)
        .then(res => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        });
};

export function getTrendingGames(page =1) {
    return fetch(`/api/rawg/games?page=${page}`)
    .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
    });
};