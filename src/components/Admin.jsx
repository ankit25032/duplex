import { Button } from '@mui/material';
import React, { useRef } from 'react'
import {useEffect} from 'react';
import {useNavigate} from 'react-router'
import Peer from 'simple-peer'
import { io } from "socket.io-client";

function Admin() {
  
    const navigation =useNavigate();
    const videoRef=useRef();
    const button=useRef();
    const socketRef=useRef();
    
    useEffect(() => {
      socketRef.current=io(`https://webrtc.ankitzxi05.repl.co`, {
        transports: ["websocket", "polling", "flashsocket"],
      })
      
        function pass() {
    let password=Number(prompt('Enter Admin password'))
    if(password!==111){
        alert("wrong Password");
      navigation("/");
      }

       // pass();

        }

     
      
    }, [])


    const handleShare=()=>{
socketRef.current.emit('admin',{});
      navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      }).then(gotMedia).catch(() => {})
    }


    function gotMedia (stream) {
      var peer1 = new Peer({ initiator: true,stream:stream })
      
      var video = document.querySelector('video')

      videoRef.current.style.display='block';
      if ('srcObject' in video) {
        video.srcObject = stream
      } else {
        video.src = window.URL.createObjectURL(stream) // for older browsers
      }
    
      video.play()

    
      peer1.on('signal', data => {
        socketRef.current.emit('mainsignal',data);
      })
      peer1.on('connect', () => {
  // wait for 'connect' event before using the data channel
  peer1.send('hey peer2, how is it going?')
})
     socketRef.current.on('clientsignal',(data)=>{
       console.log(data);
       peer1.signal(data);
     })

    
      // peer2.on('signal', data => {
      //   peer1.signal(data)
      // })
    
      // peer1.on('stream', stream => {
      //   // got remote video stream, now let's show it in a video tag
      //   var video = document.querySelector('video')
    
      //   if ('srcObject' in video) {
      //     video.srcObject = stream
      //   } else {
      //     video.src = window.URL.createObjectURL(stream) // for older browsers
      //   }
    
      //   video.play()
      // })
    }
    
  return (
    <div className='container'>
        <Button ref={button} onClick={handleShare} variant="outlined">SHARE SCREEN</Button>
     <video ref={videoRef}></video>
    </div>
  )
}

export default Admin