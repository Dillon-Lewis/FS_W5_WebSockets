import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { Socket } from 'socket.io-client';

interface SocketProps {
    socket: Socket;
}

interface Message {
    user: string;
    text: string;
}

const ChatBody = ({ socket }: SocketProps) => {
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        // socket.on checks for when a "message" event occurs and then executes the function
        socket.on('message', (message: Message) => {
            //console.log(message)
            setMessages([...messages, message])
        })
    },[messages, socket])

  return (
    <>
        {
            messages.map((message) => (
                <Card className='my-3'>
                    <Card.Title>{message.user}</Card.Title>
                    <Card.Body>{message.text}</Card.Body>
                </Card>
            ))
        }
    </>
  )
}

export default ChatBody