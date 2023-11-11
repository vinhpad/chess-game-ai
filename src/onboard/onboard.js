import React from "react";
import {v4 as uuid} from 'uuid'
const socket = require('../connection/socket').socket;

class CreateNewGame extends React.Component{
    state = {
        didGetUserName: false,
        playOnline: false,
        playComputer: false,
        createdRoom: false,
        joinedRoom: false,
        inputText: "",
        gameId: ""
    };

    constructor(props) {
        super(props);
        this.textArea = React.createRef();
    }

    send = () => {
        const newGameRoomId = uuid();
        this.setState ({
            gameId: newGameRoomId
        });

        socket.emit("createNewGame", newGameRoomId);
    }

    typingUserName = () => {
        const typedText = this.textArea.current.value;
        this.setState ({
            inputText: typedText
        });
    }

    render() {
        return (
            <>
                <div style={{display:"flex"}}>
                    <img src='https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/CHESScom/phphK5JVu.png' 
                        style={{margin: "20px", height: "600px"}}></img>
                        {
                            this.state.didGetUserName ? 
                            <div style={{marginTop: "20px"}}>
                                <p style={{fontSize: "40px", margin: "20px", marginBottom: "150px"}}>Welcome {this.state.inputText}!</p>
                                {
                                    this.state.playOnline ? 
                                    <div>
                                        <button style={{display: "block", padding: "10px 0px", fontSize: "40px", width: "600px", margin: "20px"}} 
                                            onClick={() => {
                                                this.setState({
                                                    createdRoom: true
                                                })
                                            }}>Create Room</button>

                                        <button style={{display: "block", padding: "10px 0px", fontSize: "40px", width: "600px", margin: "20px"}} 
                                            onClick={() => {
                                                this.setState({
                                                    joinedRoom: true
                                                })
                                            }}>Join Room</button>
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

                            <input style={{margin: "20px", width: "400px"}}
                                    ref = {this.textArea}
                                    onInput={this.typingUserName}>
                            </input>

                            <button
                                disabled={!this.state.inputText.length > 0}
                                onClick={() => {
                                    this.props.setUserName(this.state.inputText);
                                    this.setState({
                                        didGetUserName: true
                                    });
                                    //this.send();
                                }}>Submit</button>
                        </div>
                    }
                </div>
            </>
        )
    }
}

const Onboard = (props) => {
    return <CreateNewGame setUserName={props.setUserName}/>
}

export default Onboard;