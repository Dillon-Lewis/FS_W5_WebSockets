import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { io } from "socket.io-client";
import MessageInput from "./components/MessageInput";
import ChatBody from "./components/ChatBody";

const socket = io("http://127.0.0.1:5000", {
  autoConnect: false,
});

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState('')

  const handleConnect = () => {
    // socket.connect() is the function that will connect to our server to establish our FDC (full duplex connection)
    // this initiates our handshake
    socket.connect();
    setIsConnected(true)
  }

  const handleDisconnect = () => {
    socket.disconnect();
    setIsConnected(false);
  }

  return (
    <Container>
      <h3>
        Connection Status: {isConnected ? "Connected" : "Not Connected yet!"}
      </h3>

      <>
        {isConnected ? (
          <>
            <ChatBody socket={socket} />
            <MessageInput socket={socket} username ={username}/>
            <Button onClick={handleDisconnect} variant="danger">Disconnect</Button>
          </>
        ) : (
          <>
            <Form onSubmit={handleConnect}>
              <Form.Group controlId="formUsername">
                <Form.Label>Please enter your username</Form.Label>
                <Form.Control type="text" placeholder="Enter your username" value={username} onChange={(user) => setUsername(user.target.value)} />
              </Form.Group>
              <Button type="submit">Connect</Button>
            </Form>
            
          </>
        )}
      </>
    </Container>
  );
}

export default App;