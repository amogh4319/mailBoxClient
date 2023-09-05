import React from 'react';
import { Badge, Card,Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {inboxActions} from '../store/inbox'

function MessagePage({ messages }) {
  const { messageId } = useParams();
  const messageIdString = messageId.toString();
  const dispatch=useDispatch();
  const history=useNavigate();

  // Find the message with the matching ID
  const message = messages.find((message) => message.id === messageIdString);

  if (!message) {
    return <div>Message not found</div>;
  }

  const { senderMail, recieverMail, subject, content } = message;

  const deleteHandler=async(messageId)=>{
    console.log(messageId)
    dispatch(inboxActions.deleteMessage(messageId));
    try{
    const response=await fetch('https://mailbox-auth-5bce1-default-rtdb.firebaseio.com/mailData.json')
      
    if(!response.ok){
      throw new Error('cannot able to delete')
    }
    const data=await response.json();
    for(let key in data){
      if(data[key].id===messageId){
    const deleteResponse=await fetch(`https://mailbox-auth-5bce1-default-rtdb.firebaseio.com/mailData/${key}.json`,{
      method:'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    })
    if(!deleteResponse.ok){
      throw new Error('not able to delete')
    }
    break;
  }
    
  }
  history('/inbox');
  }catch(error){
    console.error(error.message);
  }

  
  
  
  }

  return (
    <div>
      <div className='p-4 mt-3' style={{marginLeft:'45%'}}>
      <Button variant='danger' onClick={()=>deleteHandler(message.id)}>DELETE</Button>
      <Button onClick={()=>history('/inbox')} style={{margin:'1rem'}}>back</Button>
      </div>
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
