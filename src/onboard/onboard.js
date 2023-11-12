import React from "react";
import { Navigate } from 'react-router-dom'
import {v4 as uuid} from 'uuid'
const socket = require('../connection/socket').socket;

class CreateNewGame extends React.Component{
    state = {
        didGetUserName: false,
        playOnline: false,
        playComputer: false,
        createdRoom: false,
        joinedRoom: false,
        userName: "",
        roomCode: "",
        gameId: ""
    };

    constructor(props) {
        super(props);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleRoomCodeChange = this.handleRoomCodeChange.bind(this);
    }

    send = () => {
        const newGameRoomId = uuid();
        this.setState ({
            gameId: newGameRoomId
        });
        console.log(newGameRoomId);
        socket.emit('createNewGame', newGameRoomId);
    }

    handleUserNameChange(event) {
        this.setState({ userName: event.target.value });
    }

    handleRoomCodeChange(event) {
        this.setState({ roomCode: event.target.value });
    }

    render() {
        return (<React.Fragment>
            <div style={{display:"flex"}}>
                <img src='https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/CHESScom/phphK5JVu.png' 
                    style={{margin: "20px", height: "600px"}}></img>
                    {
                        this.state.didGetUserName ? 
                        <div style={{marginTop: "20px"}}>
                            <p style={{fontSize: "40px", margin: "20px", marginBottom: "150px"}}>Welcome {this.state.userName}!</p>
                            {
                                this.state.playOnline ?
                                <div>
                                    {
                                        this.state.createdRoom ?
                                        this.state.joinedRoom ?
                                        <Navigate to = {"/game/" + this.state.roomCode}></Navigate>
                                        :
                                        <Navigate to = {"/game/" + this.state.gameId}></Navigate>
                                        :
                                        this.state.joinedRoom ?
                                        <div>
                                            <h1 style={{margin: "20px", marginTop: String(window.innerHeight/3) + "px"}}>Enter friend's code below to join</h1>
                                            <input style={{margin: "20px", width: "400px", border:"1px solid black"}}
                                                    type="text"
                                                    value={this.state.roomCode}
                                                    onChange={this.handleRoomCodeChange}
                                                    placeholder = "Enter friend's room code here">
                                            </input>
                                            <button
                                                disabled={!this.state.roomCode.length > 0}
                                                onClick={() => {
                                                    this.props.setIsCreator(false);
                                                    this.setState ({
                                                        createdRoom: true
                                                    })
                                                }}>Enter Room</button>
                                        </div>
                                        :
                                        <div>
                                            <button style={{display: "block", padding: "10px 0px", fontSize: "40px", width: "600px", margin: "20px"}} 
                                                onClick={() => {
                                                    this.setState({
                                                        createdRoom: true
                                                    });
                                                    this.props.setIsCreator(true);
                                                    this.send();
                                                }}>Create Room</button>

                                            <button style={{display: "block", padding: "10px 0px", fontSize: "40px", width: "600px", margin: "20px"}} 
                                                onClick={() => {
                                                    this.setState({
                                                        joinedRoom: true
                                                    });
                                                }}>Join Room</button>
                                        </div>
                                    }
                                </div>
                                :
                                <div>
                                    {
                                        this.state.playComputer ? 
                                        <div></div>
                                        :
                                        <div>
                                            <p style={{fontSize: "40px", textAlign: "center", width: "600px", margin: "20px"}}>
                                            Choose game mode:</p>

                                        <button style={{display: "block", padding: "10px 0px", fontSize: "40px", width: "600px", margin: "20px"}} 
                                            onClick={() => {
                                                this.setState({
                                                    playComputer: true
                                                });
                                            }}>Play Computer</button>

                                        <button style={{display: "block", padding: "10px 0px", fontSize: "40px", width: "600px", margin: "20px"}} 
                                            onClick={() => {
                                                this.setState({
                                                    playOnline: true
                                                });
                                            }}>Play Online</button>
                                        </div>
                                        
                                    }
                                </div>
                            }
                        </div>
                    :
                    <div>
                        <h1 style={{margin: "20px", marginTop: String(window.innerHeight/3) + "px"}}>Enter your username:</h1>

                        <input style={{margin: "20px", width: "400px", border:"1px solid black"}}
                                type="text"
                                value={this.state.userName}
                                onChange={this.handleUserNameChange}
                                placeholder = "Enter your username here">
                        </input>

                        <button
                            disabled={!this.state.userName.length > 0}
                            onClick={() => {
                                this.props.setUserName(this.state.userName);
                                this.setState({
                                    didGetUserName: true
                                });
                                //this.send();
                            }}>Submit</button>
                    </div>
                }
            </div>
        </React.Fragment>)
    }
}

const Onboard = (props) => {
    return <CreateNewGame setUserName={props.setUserName} setIsCreator={props.setIsCreator}/>
}

export default Onboard;