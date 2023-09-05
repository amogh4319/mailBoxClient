import React, { useState } from 'react';
import {Card, Form, FormControl,Button,Spinner} from 'react-bootstrap';
import './SignUp.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import {inboxActions} from '../store/inbox'


function SignUp() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirm,setConfirm]=useState('');
    const [isLogin,setIsLogin]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
    const dispatch=useDispatch();
    

    const history=useNavigate();

    const emailHandler=(event)=>{
       setEmail(event.target.value)
     }
     const passwordHandler=(event)=>{
        setPassword(event.target.value)
      }
      const confirmHandler=(event)=>{
        setConfirm(event.target.value)
      }
      const submission=async(event)=>{
        event.preventDefault();
        setIsLoading(true);
        console.log(email,password,confirm)
        let url;
        if(isLogin){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBiEal-NbQ_dRUpc_MaipsRMiXy9JgTJyM'
        }else{
            url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBiEal-NbQ_dRUpc_MaipsRMiXy9JgTJyM'
        }
        try{
        const response=await fetch(url,{
            method:'POST',
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        console.log(response)
        setIsLoading(false);
        if(!response.ok){
            throw new Error('authentication Failed');
        }
        const data=await response.json();
        
        console.log(data);
        localStorage.setItem('email',JSON.stringify(email))
        dispatch(authActions.login(data.idToken));
        
        
        
        history('/inbox');
        console.log('successfully loginned!!!')
        setEmail('');
        setPassword('');
        setConfirm('');
    }catch(error){
        console.error(error.message);
    }

      }
      const toggle=()=>{
        setIsLogin(prevState=>!prevState);
      }

  return (
    <div>
        <div className='blue-dot'></div>
      <Card className='mt-5 me-auto card shadow'>
        <Card.Title className='mb-3 mt-3'>{isLogin?'LOG IN':'SIGN UP'}</Card.Title>
        <Form className='form' onSubmit={submission}>
            <Form.Label>Email Address</Form.Label>
            <FormControl type='email' placeholder='EMAIL' className='shadow' onChange={emailHandler} required value={email}/>
            <Form.Label>Password</Form.Label>
            <FormControl type='password' placeholder='PASSWORD' className='shadow'required onChange={passwordHandler} value={password}/>
            {!isLogin&&<Form.Label>Confirm password</Form.Label>}
            {!isLogin&&<FormControl type='password' placeholder='CONFIRM PASSWORD' className='shadow' required onChange={confirmHandler} value={confirm}/>}
            {!isLoading&&<Button className='mt-5 mb-5' type='submit'>{isLogin?'LOG IN':'SIGN UP'}</Button>}
            {isLoading&&<Spinner animation="border" variant="success" className='mt-3 mb-3'/>}
        </Form>
      </Card>
      <Button onClick={toggle} style={{marginLeft:'44%',width:'fit-content'}} variant={!isLogin?'primary':'warning'} className='mt-5'>{!isLogin?'Have an account? Login':'Dont have an account?Sign up'}</Button>
    </div>
  );

  }
export default SignUp;
