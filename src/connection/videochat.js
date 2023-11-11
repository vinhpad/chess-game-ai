import React, { useEffect, useRef, useState } from "react";
import Peer from 'simple-peer';
const socket = require('../connection/socket').socket;

function VideoChat(props) {
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [isCalling, setIsCalling] = useState(false);

    const userVideo = useRef();
    const partnerVideo = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: true, audio:true}).then(stream => {
            setStream(stream);
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        })
        socket.on('hey', (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
        });
    }, []);

    function callPeer(id) {
        setIsCalling(true);
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        });

        peer.on('signal', data => {
            socket.emit('callUser', {signal: data, to: caller});
        });

        peer.on('stream', stream => {
            partnerVideo.current.srcObject = stream;
        });

        socket.on('callAccepted', signal => {
            setCallAccepted(true);
            peer.signal(signal);
        });
    }

    function acceptCall() {
        setCallAccepted(true);
        setIsCalling(false);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        });

        peer.on('signal', data => {
            socket.emit('acceptCall', { signal: data, to: caller })
        });
      
        peer.on("stream", stream => {
            partnerVideo.current.srcObject = stream;
        });
      
        peer.signal(callerSignal);
    }

    let UserVideo;
    if (stream) {
        UserVideo = (
            <video playsInline muted ref={userVideo} style={{width: "400px", height: "400px"}} autoPlay/>
        ) 
        console.log("streaming...");
    }

    let mainView;

    if (callAccepted) {
        mainView = (
            <>
                <video playsInline muted ref={userVideo} style={{width: "400px", height: "400px"}} autoPlay/>
                <p/>
                <video playsInline muted ref={partnerVideo} style={{width: "400px", height: "400px"}} autoPlay/>
            </>
        )
        console.log("call accepted...");
    } else if (receivingCall) {
        mainView = (
            <>
                <p>{props.opponentUsername} is calling...</p>
                <button onClick={acceptCall}>
                    <p>Accept</p>
                </button>
            </>
        )
        console.log("receiving call...");
    } else if (isCalling) {
        mainView = (
            <>
                <p>Calling {props.opponentUsername}...</p>
            </>
        )
        console.log("is calling...");
    } else {
        mainView = (
            <>
                <button onClick={() => {
                    callPeer(props.opponentSocketId);
                }}>
                    <p>Call your opponent</p>
                </button>
            </>
        )
    }

    return (
        <>
            {mainView}
            <p/>
            {UserVideo}
        </>
    )
}

export default VideoChat;
