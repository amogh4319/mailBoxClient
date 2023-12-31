// src/components/EmailTemplate.js
import React, { useRef, useState } from 'react';
import {InputGroup,Form, Button} from 'react-bootstrap'

import JoditEditor from 'jodit-react';


const ComposePage = () => {
  const editor=useRef(null);
  const [content,setContent]=useState('');
  const [send,setSend]=useState('');
  const [subject,setSubject]=useState('');
  const Email=JSON.parse(localStorage.getItem('email'));
console.log(Email);

  // const isValidEmail = (email) => {
  //   const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //   return emailPattern.test(email);
  // };
  
  // // Validate email address format
  // if (!isValidEmail(send)) {
  //   alert('Please enter a valid email address');
  //   return;
  // }


 const submission=async(event)=>{
    event.preventDefault();
   
    console.log(send,subject,content);
    try{
    const response=await fetch(`https://mailbox-auth-5bce1-default-rtdb.firebaseio.com/mailData.json`,{
      method:'POST',
      body:JSON.stringify({
        id:Math.random().toString(),
        senderMail:Email,
        recieverMail:send,
        subject:subject,
        content:content,
        timestamp: new Date().toISOString(),
        isRead:false,
        unreadCount:0,
      }),
      headers:{
        'Content-Type':'application/json'
      }
    })
    
    if(!response.ok){
      throw new Error('mail is not sent!!!');
    }
    const data=await response.json();
    console.log(data);
    setSend('')
    setSubject('')
    setContent('')
  }catch(error){
    console.error(error.message);
  }
  }
  return (
    
      <div className="p-4">
        <Form onSubmit={submission}>
      <InputGroup className='mb-3'>
        <InputGroup.Text id="basic-addon1">To</InputGroup.Text>
        <Form.Control
        type='text'
        value={send}
        onChange={(e)=>setSend(e.target.value)}
          placeholder="example@gmail.com"
          aria-label="example@gmail.com"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className='mb-3'>
        <InputGroup.Text id="basic-addon1">Subject</InputGroup.Text>
        <Form.Control
        type='text'
        value={subject}
        onChange={(e)=>setSubject(e.target.value)}

          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <div>
        <JoditEditor 
        ref={editor}
        value={content}
        onChange={newContent=>setContent(newContent)}
        />
      </div>
     <Button variant='success' className='mt-3' type='submit'>Send</Button>
     </Form>
    </div>
  );
};

export default ComposePage;
