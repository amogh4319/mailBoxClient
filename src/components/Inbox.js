
import React, { useEffect,useState } from 'react';
import { ListGroup, ListGroupItem,Badge, Button } from 'react-bootstrap';
import { useDispatch} from 'react-redux';
import { inboxActions } from '../store/inbox';
import bluedot from '../assets/bluedot.png'
import Navigation from './Navigation';

import { useNavigate} from 'react-router-dom';






const Inbox = () => {
  const [messages, setInboxEmails] = useState([]);
  const recieverEmail = JSON.parse(localStorage.getItem('email')); // Get the sender's email from localStorage
  
  const dispatch=useDispatch();
  const history=useNavigate()
  
  


  useEffect(() => {
    const fetchRecievedEmails = async () => {
      try {
        const response = await fetch(`https://mailbox-auth-5bce1-default-rtdb.firebaseio.com/mailData.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch sent emails');
          
        }
        const data = await response.json();
        
        if (data) {
          const inboxEmailList = Object.values(data).filter((email)=>recieverEmail===email.recieverMail);
          setInboxEmails(inboxEmailList);
          dispatch(inboxActions.loadMessages(inboxEmailList));
        }
        
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchRecievedEmails();
    // Set up an interval to call the function every 2 seconds
  const intervalId = setInterval(fetchRecievedEmails, 2000);

  // Clean up the interval when the component unmounts
  return () => {
    clearInterval(intervalId);
  };
    
  }, [dispatch,recieverEmail]);
 
  const listHandle = async (messageId) => {
    const updatedMessages = messages.map((message) =>
    message.id === messageId ? { ...message, isRead: true } : message
  );
  setInboxEmails(updatedMessages);
  //dispatch(inboxActions.messageRead());

  // Update the read status in Redux store
  dispatch(inboxActions.updateReadStatus({ messageId, isRead: true }));
  // Navigate to MessagePage and pass the messages state as a prop
  console.log('Received messageId:', messageId); 
 
    history(`/inbox/${messageId.toString()}`);
  
  try {
    const response =await fetch(`https://mailbox-auth-5bce1-default-rtdb.firebaseio.com/mailData.json`)
    const data=await response.json()
    // Iterate through the data and update the isRead field to true
  for (let key in data) {
    
    await fetch(`https://mailbox-auth-5bce1-default-rtdb.firebaseio.com/mailData/${key}.json`, {
      method: 'PATCH',
      body: JSON.stringify({isRead:true}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  console.log('All messages updated with isRead set to true.');
  
  } catch (error) {
    console.error('Failed to update isRead status in Firebase:', error);
  }
  }

 
  return (
   
    <div >
      <header><Navigation/></header>
      <h2 style={{textAlign:'center'}}>Inbox</h2>
      <ListGroup as='ol' style={{width:'90%',margin:'1rem'}} >
        {messages.map((message) => {
          return (
          <ListGroupItem as='li' key={message.id} className='mb-3 shadow d-flex justify-content-between align-items-start'  onClick={() => listHandle(message.id)}>
              {console.log(message.isRead)}
              {!message.isRead && (
                <div>
                  <img src={bluedot} alt="bluedot" />
                  <Badge>{!message.isRead?'read':'unread'}</Badge>
                </div>
              )}
              
              <div className="ms-2 me-auto">
                <div className="fw-bold"><strong>Sender:</strong> {message.senderMail}</div>
                <strong>Subject:</strong> {message.subject}
                <br />
                <strong>Content:</strong> {message.content}
              </div>
              <Badge bg="primary" pill>
                <strong>Date:</strong> {new Date(message.timestamp).toLocaleString()}
              </Badge>
              
              
            </ListGroupItem>
      
        
    
          );
          
        })}
        
      </ListGroup>
    
      
    </div>
    
  );
};

export default Inbox;
