// SentBox.js
import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem,Badge ,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { sentboxActions } from '../store/sentbox';
import { useDispatch} from 'react-redux';
import useFirebaseData from './useFirebaseData';

const SentBox = () => {
  const [sentEmails, setSentEmails] = useState([]);
  const senderEmail = JSON.parse(localStorage.getItem('email')); // Get the sender's email from localStorage
  const history=useNavigate()
  const dispatch=useDispatch()
  //const messages=useSelector(state=>state.sentbox.sentMessages);
const onDataLoaded=(data)=>{
  if (data) {
    const sentboxEmailList = Object.values(data).filter((email)=>email.senderMail===senderEmail);
    dispatch(sentboxActions.loadMessages(sentboxEmailList));
    setSentEmails(sentboxEmailList);
    
  }
}
 
 const sentData=useFirebaseData('https://mailbox-auth-5bce1-default-rtdb.firebaseio.com/mailData.json');

useEffect(()=>{
  onDataLoaded(sentData)
},[sentData])

  const clickHandler=(messageId)=>{
    const updatedMessages = sentEmails.map((message) =>
    message.id === messageId ? { ...message, isRead: true } : message
  );
  setSentEmails(updatedMessages);
    history(`/sentbox/${messageId}`);
  }

  return (
    <div >
      <div>
        <Button variant='secondary' onClick={()=>history('/inbox')} className='mt-3'>Go back</Button>
      </div>
      <h2 style={{textAlign:'center'}}>Sent Box</h2>
      <ListGroup as='ol' style={{width:'90%',margin:'1rem'}} >
        {sentEmails.map((email) => (
          <ListGroupItem as='li' key={email.id} className="d-flex justify-content-between align-items-start shadow mt-3" onClick={()=>clickHandler(email.id)}>
            <div className="ms-2 me-auto">
                <div className="fw-bold"><strong>Recipient:</strong> {email.recieverMail}</div>
                <strong>Subject:</strong> {email.subject}
                <br />
                
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
