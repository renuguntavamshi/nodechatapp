import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({socket,username,room}){
const [currentmessage,setcurrentmessage]=useState("");
const [messagelist,setmessagelist]=useState([]);
const sendMessage= async()=>{
console.log(username)
    if(currentmessage!==""){
        setcurrentmessage("") 
        const messagedata={
            room:room,
            autor:username,
            message:currentmessage,
            time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
        };
        await socket.emit("sendmessage",messagedata)
        setmessagelist((list)=>[...list,messagedata])
               
    }
}
useEffect(()=>{
socket.on("messagereceived",(data)=>{
    console.log(data)
    setmessagelist((list)=>[...list,data])
})    
},[socket])

    return (
        <div className="chat">
<div className="chatheader">
    <p>LiveChat of <b> {username}</b></p>
</div>
<div className="chatbody">
<ScrollToBottom className="message-container">
    {messagelist.map((item)=>{
        console.log(item);
        console.log(username);
        return (
            <div className="message" id={username===item.autor?"you":"other"}>
                  <div>
                        <div className="message-content"><h4  style={{color:"white"}}>{item.message}</h4></div>
                        <div className="message-meta"><pre>{item.time} {item.author}</pre></div>
                  </div>  
            </div>
        )
    })}
    </ScrollToBottom >
</div>
<div className="chatfooter">
        <input 
        type="text" 
        placeholder="Hey.............."
        value={currentmessage}
         onChange={e=>{setcurrentmessage(e.target.value)}}     
         />
        <button onClick={sendMessage}>send</button>
</div>


        </div>
    )
}
export default Chat;