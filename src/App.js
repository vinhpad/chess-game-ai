import socketIO from 'socket.io-client';
import VideoChat from './connection/videochat';
import JoinGame from './onboard/joingame';
import Onboard from './onboard/onboard';
import React, {useState} from 'react';

function App() {
  const [userName, setUserName] = React.useState('')
  return (
    <>
      <Onboard setUserName = {setUserName}/>
    </>
  );
}

export default App;
