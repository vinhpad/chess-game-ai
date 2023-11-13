import React, { useState } from "react";
import { useParams } from "react-router";
import VideoChat from "../connection/videochat";
const socket = require('../connection/socket').socket;

const Game = (props) => {
    const {gameid} = useParams();
    const [opponentSocketId, setOpponentSocketId] = useState("");
    const [opponentDidJoinGame, didJoinGame] = useState(false);
    const [gameSessionDoesNotExist, doesNotExist] = useState(false);
    const [opponentUserName, setOpponentUserName] = useState("");

    React.useEffect(() => {
        socket.on('playerJoinedRoom', statusUpdate => {
            console.log("A Player joined the room! Username: " + statusUpdate.userName + 
                        ", Game Id: " + statusUpdate.gameId +
                        "Socket Id: " + statusUpdate.mySocketId);
            if (socket.id !== statusUpdate.mySocketId) {
                setOpponentSocketId(statusUpdate.mySocketId);
            }
        });

        socket.on('status', statusUpdate => {
            console.log(statusUpdate);
            alert(statusUpdate);
            if (statusUpdate == 'This game session does not exist.' || statusUpdate == 'There are already 2 people playing in this room.') {
                doesNotExist(true);
            }
        });

        socket.on('start game', (opponentUserName) => {
            console.log("A game has started");
            setOpponentUserName(opponentUserName);
            didJoinGame(true);
        });
    }, [])

    return (
        <>
            {   
                opponentDidJoinGame ?
                <div>
                    <VideoChat
                        mySocketId={socket.id}
                        opponentSocketId={opponentSocketId}
                        myUserName={props.myUserName}
                        opponentUserName={opponentUserName}
                    />
                </div>
                : gameSessionDoesNotExist ? (
                    <div>
                        <h1 style={{ textAlign: "center", marginTop: "200px" }}> Game session does not exist!!! </h1>
                    </div>
                ) : (
                    <div>
                        <img src='https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/CHESScom/phphK5JVu.png' 
                            style={{margin: "20px", height: "600px"}}></img>
                            <div style={{marginTop: "20px"}}>
                              <p style={{fontSize: "40px", margin: "20px", marginBottom: "150px"}}>Welcome {props.myUserName}!</p>
                              <h1 style={{margin: "20px", marginTop: String(window.innerHeight/3) + "px"}}>Tell your friend to enter this room code:</h1>
                              <p>{gameid}</p>

                            </div>
                    </div>
                )
            } 

        </>
    )
}

export default Game;