import { useState, useEffect } from "react";
import * as reviewService from '../../services/reviewService';

export default function ReviewForm({
    gameId,
    reviewToEdit = null,
    onSuccess,
    onCancel
}) {
    const isEdit = Boolean(reviewToEdit);
    const [rating, setRating] = useState(1);
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEdit) {
            setRating(reviewToEdit.rating);
            setContent(reviewToEdit.content);
        }
    }, [isEdit, reviewToEdit]);

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            if (isEdit) {
                await reviewService.updateReview(
                    gameId,
                    reviewToEdit._id,
                    { rating, content }
                );
            } else {
                await reviewService.createReview(gameId, { rating, content });
            }
            onSuccess();
        } catch (err) {
            console.log(err);
            setError('Failed to Submit Review.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Rating
                <select
                    value={rating}
                    onChange={evt => setRating(Number(evt.target.value))}
                >
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </label>
            <label>
                Review
                <textarea
                    value={content}
                    onChange={evt => setContent(evt.target.value)}
                    required
                />
            </label>
            <button type="submit">
                {isEdit ? 'Update Review' : 'Add Review'}
            </button>
            {onCancel && (
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};