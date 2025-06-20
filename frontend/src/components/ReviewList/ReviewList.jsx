import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { getUser } from '../../services/authService';
import * as reviewService from '../../services/reviewService';

export default function ReviewList({ reviews, onEdit, onDelete }) {
    const currentUser = getUser();
    const [pendingFlags, setPendingFlags] = useState({});

    useEffect(() => {
        if (!currentUser?._id) return;
        let isMounted = true;
        async function loadPendingFlags() {
            const flagsMap = {};
            for (const review of reviews) {
                try {
                    const { pending } = await reviewService.checkReviewFlag(review._id);
                    flagsMap[review._id] = pending;
                } catch {
                    flagsMap[review._id] = false;
                }
            }
            if (isMounted) setPendingFlags(flagsMap);
        }
        if (reviews.length) loadPendingFlags();
        return () => { isMounted = false; };
    }, [reviews]);

    return (
        <div>
            {reviews.map((review) => {
                const isOwner = currentUser?._id === review.reviewer._id.toString();
                const isAdmin = Boolean(currentUser?.isAdmin);
                const alreadyRequested = pendingFlags[review._id];

                return (
                    <div key={review._id} className="review-card">
                        <Link to={`/users/${review.reviewer._id}`}>
                            <strong>{review.reviewer.username}</strong></Link> rated {review.rating}/5
                        <p>{review.content}</p>

                        {(isOwner || isAdmin) && (
                            <div>
                                <button className="btn btn-primary" onClick={() => onEdit(review)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => onDelete(review._id)}>Delete</button>
                            </div>
                        )}

                        {!isOwner && !isAdmin && currentUser && !alreadyRequested && (
                            <button
                                className="btn btn-danger"
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