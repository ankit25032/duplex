import React,{useEffect,useRef} from 'react'
import Peer from 'simple-peer'
import { io } from "socket.io-client";


function Watch() {
  const socketRef=useRef(io(`https://webrtc.ankitzxi05.repl.co`, {
    transports: ["websocket", "polling", "flashsocket"],
  }));

  const videoRef=useRef();
  
  useEffect(() => {
   
    socketRef.current.on('adminsignal',(data)=>{
      console.log(data);
      var peer2 = new Peer();

      peer2.signal(data);
      
      peer2.on('signal', data => {
        socketRef.current.emit('othersignal',data);   
      })


      peer2.on('stream', stream => {
        console.log(stream);
        // got remote video stream, now let's show it in a video tag
       
        var video = document.querySelector('video')

     
        if ('srcObject' in video) {
          video.srcObject = stream
        } else {
          video.src = window.URL.createObjectURL(stream) // for older browsers
        }
      console.log(video.srcObject);
        video.play();
        
      })
      peer2.on('data', data => {
        // got a data channel message
        console.log('got a message from peer1: ' + data)
      })
    })
  
  }, [])
  

  return (
    <div className='container'>
    <video muted="muted"  ref={videoRef}></video>
    </div>
  )
}

export default Watch;