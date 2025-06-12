import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as gameService from '../../services/gameService';
import * as reviewService from '../../services/reviewService';
import GameCard from "../../components/GameCard/GameCard";

export default function GameDetail() {
    const { gameId } = useParams();
    const [game, setGame] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function fetchGameAndReviews() {
            try {
                const gameData = await gameService.show(gameId);
                const reviewsData = await reviewService.getReviews(gameId);
                setGame(gameData);
                setReviews(reviewsData);
            } catch (err) {
                console.log('Failed to Load Game or Reviews', err);
            }
        };
        fetchGameAndReviews();
    }, [gameId]);

    if (!game) return <p>Loading Game Details...</p>;

    return (
        <div>
            <GameCard game={game} />
            <div style={{ padding: '1rem' }}>
                <h2>About:</h2>
                <p>{game.description}</p>
                <h3>Reviews</h3>
                {reviews.length ? (
                    <ul>
                        {reviews.map((review) => (
                            <li key={review._id}>
                                <strong>{review.reviewer.username}</strong>: {review.content}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </div>
    );
};