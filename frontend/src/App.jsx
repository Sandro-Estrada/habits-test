import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Medicaments from "./components/Medicaments/Medicaments";
import Login from "./components/Login/Login";
import useToken from './hooks/useToken';
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
const SOCKETURL = "http://localhost:4010";

function App() {
  const { token, setToken } = useToken();
  const [response, setResponse] = useState({});

  useEffect(() => {
    const socket = socketIOClient(SOCKETURL);
    //console.log("socket--------------")
    //const _setResponse = setResponse
    socket.on("notificación", data => {
      //console.log("--data---",data);
      setResponse(data);
    });
    return () => socket.disconnect();
  }, []);

  if(!token) {
    return <Login setToken={setToken} />
  }
console.log(response,"response**********")
  return (
    <BrowserRouter>
      <Switch>
        <div className='container p-5'>
          <Route 
            path="/">
              <Medicaments socket={response}/>
          </Route>
        </div>
      </Switch>
      
    </BrowserRouter>
    
  );
}

export default App;
