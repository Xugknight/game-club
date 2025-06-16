import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getUser } from "../../services/authService";
import * as gameService from '../../services/gameService';
import * as reviewService from '../../services/reviewService';
import GameCard from "../../components/GameCard/GameCard";
import ReviewList from "../../components/ReviewList/ReviewList";
import ReviewForm from "../../components/ReviewForm/ReviewForm";

export default function GameDetailPage() {
  const { gameId } = useParams();
  const currentUser = getUser();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [pendingFlag, setPending] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [gameData, reviewData] = await Promise.all([
          gameService.show(gameId),
          reviewService.getReviews(gameId)
        ]);
        setGame(gameData);
        setReviews(reviewData);
        const { pending } = await gameService.checkGameFlag(gameId);
        setPending(pending);
      } catch (err) {
        console.error("Failed to Load Game or Reviews", err);
      }
    };
    fetchData();
  }, [gameId]);

  async function loadReviews() {
    try {
      const data = await reviewService.getReviews(gameId);
      setReviews(data);
    } catch (err) {
      console.error("Failed to Load Reviews", err);
    }
  };

  async function handleDeleteRequest() {
    try {
    await gameService.flagGame(gameId, "Delete Request");
    setPending(true);
    setFeedback("Delete Request Submitted");
  } catch (err) {
    if (err.message.includes("409")) {
      setPending(true);
      setFeedback("Already Requested");
    } else {
      setFeedback("Failed to Submit Delete Request");
    }
  }
  setTimeout(() => setFeedback(""), 5000);
  };

  async function handleAdminDelete() {
    await gameService.deleteGame(gameId);
    navigate('/games');
  };

  if (!game) return <p>Loading…</p>

  return (
    <div>
      <GameCard game={game} />
      <section style={{ padding: "1rem" }}>
        <h2>About:</h2>
        <p>{game.description}</p>

        {feedback && <p className="feedback">{feedback}</p>}

        {currentUser && (
          currentUser.isAdmin
            ? <button onClick={handleAdminDelete} className="danger">
                Delete Game
              </button>
            : !pendingFlag && <button onClick={handleDeleteRequest}>
                Request Deletion
              </button>
        )}

        <h3>Reviews</h3>

        {currentUser && !showForm && (
          <button
            onClick={() => {
              setEditingReview(null)
              setShowForm(true)
            }}
            style={{ marginBottom: "1rem" }}
          >
            Add Review
          </button>
        )}

        {showForm && (
          <ReviewForm
            gameId={gameId}
            reviewToEdit={editingReview}
            onSuccess={() => {
              setShowForm(false)
              setEditingReview(null)
              loadReviews()
            }}
            onCancel={() => {
              setShowForm(false)
              setEditingReview(null)
            }}
          />
        )}

        <ReviewList
          reviews={reviews}
          onEdit={review => {
            setEditingReview(review)
            setShowForm(true)
          }}
          onDelete={async reviewId => {
            await reviewService.deleteReview(gameId, reviewId)
            loadReviews()
          }}
        />
      </section>
    </div>
  )
};