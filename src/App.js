import JoinGame from './onboard/joingame';
import Onboard from './onboard/onboard';
import React, {useState} from 'react';
import Game from './onboard/game';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';

function App() {
  const [userName, setUserName] = useState('')
  const [isCreator, setIsCreator] = useState('')
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Onboard setUserName = {setUserName} setIsCreator = {setIsCreator}/>}/>
        <Route path='game/:gameid' exact element={
          <>
            <JoinGame userName={userName} isCreator={isCreator}/>
            <Game myUserName={userName}/>
          </>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
