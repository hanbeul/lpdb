import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.send(message);
    setMessage("");
  }
  
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:9000");
    setSocket(ws);

    ws.onopen = () => {
    }

    ws.onmessage = (msg) => {
      messages.push(msg.data);
      let x = [...messages];
      setMessages(x);
      console.log(x);
    }

  }, []);

  return (
    <div className="App">
    <ul>
    {messages.map((m, index) => {
      (
        <li key={index}>{m}</li>
      )
    }
    )}
    </ul>
    <form onSubmit={handleSubmit}>
    <label>
      Message:
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
    </div>
  );
}

export default App;
