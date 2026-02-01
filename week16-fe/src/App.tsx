// import { useState, useEffect} from 'react'
// import './App.css'

// export const socket = new WebSocket("ws://localhost:8080");

// socket.onopen = () => {
//   console.log("Connected");
// };
//   socket.onmessage = (e) => {
//   console.log("From server:", e.data);
// };

// function App() {
//     const [message, setMessage] = useState("");
//     const [reply, setReply] = useState("");

//      useEffect(() => { // i update the state only when i receive a message from ws server
//     socket.onmessage = (e) => {
//       setReply(e.data.toString());
//     };
//   }, []);

//   const Sendmessage = ()=>{
//     if(message===""){
//       socket.send("");
//       console.log("empty");
//       setReply("Empty Input Enter Ping to get Pong");
//     }
//      if(message!="ping" && message!=""){
//       setReply("Input is not ping, Enter ping to get Pong");
//      }
    
//     socket.send(message);
//   }

//   return (
//     <div className=''>
//       <input type="text" placeholder='Message...' value={message} onChange={(e)=>setMessage(e.target.value)} ></input>
//       <button onClick={Sendmessage}>Send</button>
//       <div>{reply}</div>
//     </div>    
// )}

// export default App

//top approch mine


import { useState, useEffect} from 'react'
import './App.css'


function App() {
    const [message, setMessage] = useState("");
    const [reply, setReply] = useState("");
    const [socket, setSocket] = useState();

     useEffect(() => 
      { // i update the state only when i receive a message from ws server
         const ws = new WebSocket("ws://localhost:8080"); //i want the code run only when the component renders which is once
          ws.onopen = () => {
          console.log("Connected");
                          };
         //@ts-ignore // u can fix it by generics
         setSocket(ws);
         ws.onmessage = (e) => {
          const msg =e.data.toString();
         setReply(msg);
         console.log("from server",msg)
                              };
       }, []);

  const Sendmessage = ()=>{
    if(!socket){
      return;
    }
    if(message===""){
      //@ts-ignore // u can fix it by generics
      socket.send("");
      console.log("empty");
      setReply("Empty Input Enter Ping to get Pong");
    }
     if(message!="ping" && message!=""){
      setReply("Input is not ping, Enter ping to get Pong");
     }
    //@ts-ignore // u can fix it by generics
    socket.send(message);
  }

  return (
    <div className=''>
      <input type="text" placeholder='Message...' value={message} onChange={(e)=>setMessage(e.target.value)} ></input>
      <button onClick={Sendmessage}>Send</button>
      <div>{reply}</div>
    </div>    
)}

export default App
