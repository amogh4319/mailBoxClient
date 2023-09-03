// SentBox.js
import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem,Badge } from 'react-bootstrap';

const Inbox = () => {
  const [inboxEmails, setInboxEmails] = useState([]);
  const recieverEmail = JSON.parse(localStorage.getItem('email')); // Get the sender's email from localStorage
  
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
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchRecievedEmails();
  }, [recieverEmail]);

  return (
    <div >
      <h2 style={{textAlign:'center'}}>Inbox</h2>
      <ListGroup as='ol' style={{width:'90%',margin:'1rem'}} className='shadow'>
        {inboxEmails.map((email, index) => (
          <ListGroupItem as='li' key={index} className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold"><strong>Sender:</strong> {email.senderMail}</div>
                <strong>Subject:</strong> {email.subject}
                <br />
                <strong>Content:</strong> {email.content}
            </div>
            <Badge bg="primary" pill>
            <strong>Date:</strong> {new Date(email.timestamp).toLocaleString()}
            </Badge>
            </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default Inbox;
