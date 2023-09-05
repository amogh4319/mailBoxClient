import React,{useState,useEffect} from 'react';

import { Button, Navbar,Offcanvas,Nav,Badge} from 'react-bootstrap';
import menu from '../assets/menu.png';
import { Link } from 'react-router-dom';
import {   useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth';
import { inboxActions } from '../store/inbox';



function Navigation() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let unreadCount = useSelector((state) => state.inbox.unreadCount);
  const dispatch=useDispatch()
  
  const deleteHandler=()=>{
    localStorage.removeItem('email')
    dispatch(authActions.logout());
    
  }
  const initialUnreadCount = localStorage.getItem('unreadCount');
  if (initialUnreadCount !== null) {
    // Update the Redux store with the value from local storage
    dispatch(inboxActions.updateUnreadCount(Number(initialUnreadCount)));
  }


  return (
    <>
    <Navbar bg='success'>
    <Button variant="dark" onClick={handleShow} style={{margin:'1rem'}}>
        <img src={menu} alt='menu' width={'25px'} height={'25px'}/>
      </Button>
      <Navbar.Brand><h1><i>Welcome to Mail Box Client App!!!</i></h1></Navbar.Brand>
      
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Mail Box Client</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav>
          <Nav.Item>
            <Nav.Link as={Link} to='/compose'>+ COMPOSE</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to='/inbox'>INBOX {<Badge bg="danger">{unreadCount} unread</Badge>}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to='/sentbox'>SENT BOX</Nav.Link>
          </Nav.Item>
          <Button variant='danger' onClick={deleteHandler}>
          <Nav.Item>
            <Nav.Link as={Link} to='/' >LOG OUT</Nav.Link>
          </Nav.Item>
          </Button>
          
          </Nav>
        </Offcanvas.Body>

      </Offcanvas>
    </Navbar>
      
      
    </>
  );
  
}

export default Navigation;
