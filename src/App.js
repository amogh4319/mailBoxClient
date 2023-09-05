
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';

import ComposePage from './components/ComposePage';

import Inbox from './components/Inbox';
import SentBox from './components/SentBox';
import MessagePage from './components/MessagePage';
import { useSelector } from 'react-redux';

function App() {
  const messages=useSelector(state=>state.inbox.messages);

  return (
    <div>
      
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        
        <Route path='/compose' element={<ComposePage/>}/>
        <Route path='/inbox' element={<Inbox/>} />
        <Route path={`/inbox/:messageId`} element={<MessagePage messages={messages}/>}/>
        <Route path='/sentbox' element={<SentBox/>}/>




        
      </Routes>
     
     
    </div>
  );
}

export default App;
