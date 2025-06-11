import RawgSearch from "../../components/RawgSearch/RawgSearch";
import TrendingGames from "../../components/TrendingGames/TrendingGames";

export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <RawgSearch />
      <hr />
      <TrendingGames />
    </div>
  );
};