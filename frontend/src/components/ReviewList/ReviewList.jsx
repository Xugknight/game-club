import { getUser } from '../../services/authService';

export default function ReviewList({ reviews, onEdit, onDelete }) {
    const currentUser = getUser();
    return (
        <div>
            {reviews.map((review) => (
                <div key={review._id} className='review'>
                    <p>
                        <strong>{review.reviewer.username}</strong> rated {review.rating}/5
                    </p>
                    <p>{review.content}</p>
                    {currentUser?._id === review.reviewer._id.toString() && (
                        <div>
                            <button onClick={() => onEdit(review)}>EDIT</button>
                            <button onClick={() => onDelete(review._id)}>DELETE</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};