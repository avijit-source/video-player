import React, { useEffect, useRef, useState } from 'react';
import ReactHlsPlayer from 'react-hls-player';

function VideoAd(props) {
    
  const playerRef = useRef();
  const imgref = useRef();
  const divref = useRef();
  let endTime = 20;
  let [isTenth,setIsTenth] = useState(false);
  
  let timeRef = useRef(0);
 
  useEffect(() => {
    console.log("loaded");
    function fireOnVideoStart() {
    
    }
    function findSeconds(){
      timeRef.current = Math.floor(playerRef.current.currentTime);
      if(timeRef.current>9 && timeRef.current<endTime){
        setIsTenth(prev=>!prev);
        console.log(timeRef.current);
      }else{
        setIsTenth(false);
      }
    }
    
    playerRef.current.addEventListener('play', fireOnVideoStart);
    playerRef.current.addEventListener('timeupdate', findSeconds);

  
    return playerRef.current.removeEventListener('play', fireOnVideoStart);

  },[])

 let handleClick = () => {
    playerRef.current.pause();
    window.open(props.adUrl, "_blank");
 }

 return (
    <div className="wrapper" divref={divref}>
         
       <ReactHlsPlayer
          playerRef={playerRef}
          src={props.url}
          autoPlay={false}
          controls={true}
          width="50%"
          height="auto"
       />
      {timeRef.current===10 && <img src="https://i.ibb.co/JjNsyft/one-removebg-preview.png" imgref={imgref} className="overlay" onClick={handleClick} />}
           
    </div>
  );
        
}

export default VideoAd
