import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import ReactDOM from 'react-dom/client';

function App() {

    const [error, setError] = useState(null);
    const [nameError, setNameError] = useState("");
    const [numberError, setNumberError] = useState("");
    const [limitError, setLimitError] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [limit, setLimit] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");

        setNameError("");
        setNumberError("");
        setLimitError("");
        if (!name) {
            setNameError("Name field is required");
        }
        if (!number) {
            setNumberError("Number field is required");
        }
        if (!limit) {
            setLimitError("Limit field is required");
        }
        if(nameError == "" && numberError == "" && limitError == "") {
            fetch("http://localhost:8080/card-service/card", {
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                "body": JSON.stringify({
                    name: name,
                    number: number,
                    limit: limit,
                })
            }).then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            }).then(function (response) {
                console.log("ok");
            }).catch(function (error) {
                console.log(error);
                setError("Card Not Added - Please try again");
            });
        }
    }
    return (
        <div>
            <h1>
                Credit Card System
            </h1>
            <div>{error}</div>
            <form onSubmit={handleSubmit}>
                <label><span class="form-field-name">Name:</span><br/>
                    <input class="form-field"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label><br/>
                <span className="error-message">{nameError}</span><br/>
                <label><span className="form-field-name">Card number:</span><br/>
                    <input
                        class="form-field"
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </label><br/>
                <span className="error-message">{numberError}</span><br/>
                <label><span className="form-field-name">Limit:</span><br/>
                    <input
                        class="form-field"
                        type="text"
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                    />
                </label><br/>
                <span className="error-message">{limitError}</span><br/>
                <input class="button" type="submit" value="Add"/>
            </form>
        </div>

    )
}

export default App;
