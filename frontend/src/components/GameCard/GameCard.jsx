import { Link } from 'react-router';
import './GameCard.css';

export default function GameCard({ game }) {
    return (
        <div className='game-card'>
            <Link to={`/games/${game._id}`} className='game-card__link'>
                <img 
                    src={game.coverImageUrl} 
                    alt={`Cover image for ${game.title}`} 
                    className='game-card__image'
                />
                <div className='game-card__info'>
                    <h3 className='game-card__title'>{game.title}</h3>
                    <p>
                        {game.developer} - {new Date(game.releaseDate).getFullYear()}
                    </p>
                </div>
            </Link>
        </div>
    );
};