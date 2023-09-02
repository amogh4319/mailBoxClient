
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';
import WelcomePage from './components/WelcomePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/welcome' element={<WelcomePage/>}/>


        
      </Routes>
     
     
    </div>
  );
}

export default App;
