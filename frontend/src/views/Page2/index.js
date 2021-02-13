import { useEffect, useState } from 'react'


function Page2() {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.send(message);
    setMessage("");
  }

  return (
    <div>
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
  )
}

export default Page2;

