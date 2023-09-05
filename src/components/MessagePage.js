import React from 'react';
import { Badge, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function MessagePage({ messages }) {
  const { messageId } = useParams();
  const messageIdString = messageId.toString();

  // Find the message with the matching ID
  const message = messages.find((message) => message.id === messageIdString);

  if (!message) {
    return <div>Message not found</div>;
  }

  const { senderMail, recieverMail, subject, content } = message;

  return (
    <div>
      <Card className='p-4 shadow mt-5'>
      <Badge bg='warning' style={{fontSize:'20px'}}>Sender: {senderMail}</Badge>
      <Badge bg='primary' className='mt-3' style={{fontSize:'20px'}}>Recipient: {recieverMail}</Badge>
      <hr />
      <Badge style={{width:'fit-content' }}>Subject:</Badge><h3><i>{subject}</i></h3>
      <hr />
      <p>{content}</p>
      </Card>
      
    </div>
  );
}

export default MessagePage;
