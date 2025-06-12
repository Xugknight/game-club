import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as gameService from '../../services/gameService';
import * as reviewService from '../../services/reviewService';
import GameCard from "../../components/GameCard/GameCard";

export default function GameDetail() {
    const { gameId } = useParams();
    const [game, setGame] = useState(null);
    const [reviews, setReviews] = useState([]);
};