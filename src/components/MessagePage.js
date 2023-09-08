import React, { useEffect, useState } from 'react';
import { Badge, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { inboxActions } from '../store/inbox';
import useFirebaseData from './useFirebaseData';
import cancel from '../assets/cancel.png';

function MessagePage({ messages }) {
  const { messageId } = useParams();
  console.log(messages);
  const data=useFirebaseData('https://mailbox-auth-5bce1-default-rtdb.firebaseio.com/mailData.json');
  const messageIdString = messageId.toString();
  const message=messages.find((message)=>message.id===messageId);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [isRead, setIsRead] = useState(false); // Local state to track the isRead status

  useEffect(() => {
    // When the component mounts, update the isRead status for the message
    const updateIsReadStatus = async () => {
      try {
        
        for (let key in data) {
          if (data[key].id === messageIdString) {
            // Send a PATCH request to update the isRead status to true
            await fetch(`https://mailbox-auth-5bce1-default-rtdb.firebaseio.com/mailData/${key}.json`, {
              method: 'PATCH',
              body: JSON.stringify({ isRead: true }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
            setIsRead(true); // Update local state
            break;
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    updateIsReadStatus();
  }, [messageIdString,isRead,data]);

  const { senderMail, recieverMail, subject, content } = message || {};

  const deleteHandler = async (messageId) => {
    console.log(messageId);
    dispatch(inboxActions.deleteMessage(messageId));
    try {
     
      for (let key in data) {
        if (data[key].id === messageId) {
          const deleteResponse = await fetch(`https://mailbox-auth-5bce1-default-rtdb.firebaseio.com/mailData/${key}.json`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log(deleteResponse);
          if (!deleteResponse.ok) {
            throw new Error('Not able to delete');
          }
          break;
        }
      }
      history('/inbox');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      
      <Card className="p-4 shadow mt-5">
        <Badge bg="warning" style={{ fontSize: '20px' }}>
          Sender: {senderMail}
        </Badge>
        <Badge bg="primary" className="mt-3" style={{ fontSize: '20px' }}>
          Recipient: {recieverMail}
        </Badge>
        <hr />
        <Badge style={{ width: 'fit-content' }}>Subject:</Badge>
        <h3>
          <i>{subject}</i>
        </h3>
        <hr />
        <p>{content}</p>
        <div className="p-4 mt-3" style={{ margin: '1rem' }}>
        <Button variant="danger" onClick={() => deleteHandler(message.id)}>
         <img src={cancel} alt='delete' height={'25px'} width={'25px'}/> DELETE
        </Button>
        <Button onClick={() => history('/inbox')} style={{ margin: '1rem' }} variant='secondary'>
          Go Back
        </Button>
      </div>
      </Card>
      {isRead && <p style={{textAlign:'center'}}>This message has been marked as read.</p>}
    </div>
  );
}

export default MessagePage;
