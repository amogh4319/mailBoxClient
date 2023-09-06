import React from 'react';
import { useParams } from 'react-router-dom';
import {Badge,Card} from 'react-bootstrap'

function SentboxMessagePage({sentMessages}) {
    const { messageId } = useParams();
    console.log(messageId)
    console.log(sentMessages)
  const messageIdString = messageId.toString();
  const message = sentMessages.find((message) => message.id === messageIdString);

  if (!message) {
    return <div>Message not found</div>;
  }
  const { senderMail, recieverMail, subject, content } = message;
  return (
    <div>
      <h1 style={{textAlign:'center'}}>Sentmessage Page</h1>
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

export default SentboxMessagePage;
