import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import ReactDOM from 'react-dom/client';
import App from "./App";
function CardsComponent() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [cards, setCards] = useState([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("http://localhost:8080/card-service/cards")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCards(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <table>
                <tbody>
                <tr class="table-heading"><td>Name</td><td>Card Number</td><td>Balance</td><td>Limit</td></tr>
                {cards.map(card => (
                    <tr><td>{card.name}</td><td>{card.number}</td><td>{card.balance}</td><td>{card.limit}</td></tr>
                ))}
                </tbody>
            </table>
        );
    }
}

export default CardsComponent;