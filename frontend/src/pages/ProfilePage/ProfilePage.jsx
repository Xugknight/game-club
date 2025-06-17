import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as userService from '../../services/userService';
import GameCard from "../../components/GameCard/GameCard";

export default function ProfilePage() {
    const { userId } = useParams();
    const [profile, setProfile] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        async function loadProfile() {
            setProfile(await userService.getProfile(userId));
            setFavorites(await userService.getFavorites(userId));
        };
        loadProfile();
    }, [userId]);

    if (!profile) return <p>Loading...</p>;

    return (
        <section>
            <h1>{profile.username}'s Profile</h1>
            <h2>Favorites</h2>
            {favorites.length
            ? <div className="game-grid">
                {favorites.map((game) => (
                    <GameCard key={game._id} game={game} />
                ))}
            </div>
            : <p>No Favorites Yet</p>
            }
        </section>
    );
};