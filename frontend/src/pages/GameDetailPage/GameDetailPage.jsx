import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as gameService from '../../services/gameService';
import * as reviewService from '../../services/reviewService';
import GameCard from "../../components/GameCard/GameCard";
import ReviewList from "../../components/ReviewList/ReviewList";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import { getUser } from "../../services/authService";

export default function GameDetail() {
    const { gameId } = useParams();
    const currentUser = getUser();
    const [game, setGame] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingReview, setEditingReview] = useState(null);

    async function loadReviews() {
        try {
            const data = await reviewService.getReviews(gameId);
            setReviews(data);
        } catch (err) {
            console.log('Failed to Load Reviews', err);
        }
    };

    useEffect(() => {
        async function fetchGameAndReviews() {
            try {
                const gameData = await gameService.show(gameId);
                const reviewdata = await reviewService.getReviews(gameId);
                setGame(gameData);
                setReviews(reviewdata);
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

      <section style={{ padding: '1rem' }}>
        <h2>About:</h2>
        <p>{game.description}</p>

        <h3>Reviews</h3>

        {currentUser && !showForm && (
          <button
            onClick={() => {
              setEditingReview(null);
              setShowForm(true);
            }}
          >
            Add Review
          </button>
        )}

        {showForm && (
          <ReviewForm
            gameId={gameId}
            reviewToEdit={editingReview}
            onSuccess={() => {
              setShowForm(false);
              setEditingReview(null);
              loadReviews();
            }}
            onCancel={() => {
              setShowForm(false);
              setEditingReview(null);
            }}
          />
        )}

        <ReviewList
          reviews={reviews}
          onEdit={review => {
            setEditingReview(review);
            setShowForm(true);
          }}
          onDelete={async reviewId => {
            await reviewService.deleteReview(gameId, reviewId);
            loadReviews();
          }}
        />
      </section>
    </div>
  );
};