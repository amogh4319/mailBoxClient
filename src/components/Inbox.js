
import React, { useEffect,useState } from 'react';
import { ListGroup, ListGroupItem,Badge, Button } from 'react-bootstrap';
import { useDispatch} from 'react-redux';
import { inboxActions } from '../store/inbox';
import bluedot from '../assets/bluedot.png'
import Navigation from './Navigation';
import useFirebaseData from './useFirebaseData';

import { useNavigate} from 'react-router-dom';






const Inbox = () => {
  const [messages, setInboxEmails] = useState([]);
  const recieverEmail = JSON.parse(localStorage.getItem('email')); // Get the sender's email from localStorage
  
  const dispatch=useDispatch();
  const history=useNavigate()
  
  


  const onDataLoaded = (data) => {
    if (data) {
      const inboxEmailList = Object.values(data).filter((email) => recieverEmail === email.recieverMail);
      setInboxEmails(inboxEmailList);
      dispatch(inboxActions.loadMessages(inboxEmailList));
    }
  };

  const inboxData = useFirebaseData('https://mailbox-auth-5bce1-default-rtdb.firebaseio.com/mailData.json');

  useEffect(() => {
    onDataLoaded(inboxData);
  }, [inboxData]);


  const listHandle = async (messageId) => {
  
  

  // Update the read status in Redux store
  dispatch(inboxActions.updateReadStatus({ messageId, isRead: true }));
 
    history(`/inbox/${messageId.toString()}`);
  
  
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
                <div className="fw-bold"><strong>From:</strong> {message.senderMail}</div>
                <strong>Subject:</strong> {message.subject}
                <br />
                
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
