import { useEffect, useState } from "react";
import { getTrendingGames } from "../../services/rawgService";
import * as gameService from '../../services/gameService';
import GameCard from "../GameCard/GameCard";

export default function TrendingGames() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const { results: rawgResults = [] } = await getTrendingGames();
        const localGames = await gameService.index();
        const byRawgId = {};
        localGames.forEach(game => {
          if (game.rawgId != null) byRawgId[game.rawgId] = game;
        });
        const matched = rawgResults
          .map(rg => byRawgId[rg.id])
          .filter(Boolean);
        setCards(matched);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  return (
    <section>
      <h2>Recent Releases</h2>
      <div className="game-grid">
        {cards.map(game => (
          <GameCard key={game._id} game={game} />
        ))}
      </div>
    </section>
  );
}