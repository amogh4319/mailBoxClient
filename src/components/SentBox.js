// SentBox.js
import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem,Badge } from 'react-bootstrap';

const SentBox = () => {
  const [sentEmails, setSentEmails] = useState([]);
  const senderEmail = JSON.parse(localStorage.getItem('email')); // Get the sender's email from localStorage
  
  useEffect(() => {
    const fetchSentEmails = async () => {
      try {
        const response = await fetch(`https://mailbox-auth-5bce1-default-rtdb.firebaseio.com/mailData.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch sent emails');
        }
        const data = await response.json();
        let sentEmailList=[];
        if (data) {
          sentEmailList = Object.values(data).filter((email)=>email.senderMail===senderEmail);
          setSentEmails(sentEmailList);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchSentEmails();
  }, [senderEmail]);

  return (
    <div >
      <h2 style={{textAlign:'center'}}>Sent Box</h2>
      <ListGroup as='ol' style={{width:'90%',margin:'1rem'}} className='shadow'>
        {sentEmails.map((email, index) => (
          <ListGroupItem as='li' key={index} className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold"><strong>Recipient:</strong> {email.recieverMail}</div>
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

export default SentBox;
