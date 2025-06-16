import { useState, useEffect } from 'react';
import { getUser } from '../../services/authService';
import * as reviewService from '../../services/reviewService';

export default function ReviewList({ reviews, onEdit, onDelete }) {
    const currentUser = getUser();
    const [pendingFlags, setPendingFlags] = useState({});

    useEffect(() => {
        async function loadPendingFlags() {
            const flagsMap = {};
            for (const review of reviews) {
                const { pending } = await reviewService.checkReviewFlag(review._id);
                flagsMap[review._id] = pending;
            }
            setPendingFlags(flagsMap);
        }
        if (reviews.length) loadPendingFlags();
    }, [reviews]);

    return (
        <div>
            {reviews.map((review) => {
                const isOwner = currentUser?._id === review.reviewer._id.toString();
                const isAdmin = Boolean(currentUser?.isAdmin);
                const alreadyRequested = pendingFlags[review._id];

                return (
                    <div key={review._id} className="review">
                        <p>
                            <strong>{review.reviewer.username}</strong> rated {review.rating}/5
                        </p>
                        <p>{review.content}</p>

                        {(isOwner || isAdmin) && (
                            <div>
                                <button onClick={() => onEdit(review)}>Edit</button>
                                <button onClick={() => onDelete(review._id)}>Delete</button>
                            </div>
                        )}

                        {!isOwner && !isAdmin && currentUser && !alreadyRequested && (
                            <button
                                onClick={async () => {
                                    try {
                                        await reviewService.flagReview(review._id, "Delete Request");
                                        setPendingFlags(m => ({ ...m, [review._id]: true }));
                                    } catch (err) {
                                        if (err.message.includes("409")) {
                                            setPendingFlags(m => ({ ...m, [review._id]: true }));
                                        } else {
                                            console.error(err);
                                        }
                                    }
                                }}
                            >
                                Report Bad Review
                            </button>
                        )}

                        {!isOwner && !isAdmin && currentUser && alreadyRequested && (
                            <p style={{ fontStyle: 'italic' }}>Flag Requested</p>
                        )}
                    </div>
                );
            })}
        </div>
    );
};