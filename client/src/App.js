import { useState } from 'react';
import Chat from './Chat';
import io from 'socket.io-client';
import './App.css';
const socket=io.connect("http://localhost:3001")
function App() {
  const [username,setusername]=useState("")
  const [room,setroom]=useState("")
 const [showchat,setshowchat]=useState(false)
const joinAroom=()=>{
  if(username!=="" && room !==""){
    socket.emit("joinroom",room)
setshowchat(true);
  }
} 
  return (
    <div className="App">
      {!showchat?( <div className='joinchatcontainer'>
      <h2>Join a chat</h2>
     <input type='text' placeholder='john...' onChange={(e)=>{setusername(e.target.value)}}/><br /><br />
     <input type='text' placeholder='Room id...' onChange={(e)=>{setroom(e.target.value)}}/><br /><br />
    <button onClick={joinAroom} style={{backgroundColor:"rgb(105, 64, 11",color:"wheat"}}>Join a room</button>
      </div>):(<Chat socket={socket} username={username} room={room} />
)}
     
   
<br /><br />
{/* The below is Chat Component */}
    </div>
  );
}

export default App;
