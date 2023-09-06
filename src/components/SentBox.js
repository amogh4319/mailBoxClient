// SentBox.js
import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem,Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { sentboxActions } from '../store/sentbox';
import { useDispatch, useSelector } from 'react-redux';

const SentBox = () => {
  const [sentEmails, setSentEmails] = useState([]);
  const senderEmail = JSON.parse(localStorage.getItem('email')); // Get the sender's email from localStorage
  const history=useNavigate()
  const dispatch=useDispatch()
  //const messages=useSelector(state=>state.sentbox.sentMessages);

  useEffect(() => {
    const fetchSentEmails = async () => {
      try {
        const response = await fetch(`https://mailbox-auth-5bce1-default-rtdb.firebaseio.com/mailData.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch sent emails');
        }
        const data = await response.json();
        let loader=[];
        for(let key in data){
          loader.push({
            id:key,
            senderMail:data[key].Email,
            recieverMail:data[key].send,
            subject:data[key].subject,
            content:data[key].content,
            timestamp:new Date().toISOString(),
            isRead:false,
          })
        }
        setSentEmails(loader)
        if (data) {
          const sentboxEmailList = Object.values(data).filter((email)=>email.senderMail===senderEmail);
          dispatch(sentboxActions.loadMessages(sentboxEmailList));
          setSentEmails(sentboxEmailList);
          
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchSentEmails();
  }, [senderEmail,dispatch]);
  const clickHandler=(messageId)=>{
    const updatedMessages = sentEmails.map((message) =>
    message.id === messageId ? { ...message, isRead: true } : message
  );
  setSentEmails(updatedMessages);
    history(`/sentbox/${messageId}`);
  }

  return (
    <div >
      <h2 style={{textAlign:'center'}}>Sent Box</h2>
      <ListGroup as='ol' style={{width:'90%',margin:'1rem'}} >
        {sentEmails.map((email) => (
          <ListGroupItem as='li' key={email.id} className="d-flex justify-content-between align-items-start shadow" onClick={()=>clickHandler(email.id)}>
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
