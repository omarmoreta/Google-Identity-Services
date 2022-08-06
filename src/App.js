// import logo from "./logo.svg";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    /* global google */
    google.accounts.id.initialize({
      //PLEASE MAKE AN ENV VARIABLE FOR CLIENT ID
      client_id: `${REACT_APP_CLIENT_ID}`, // "*********PLACE YOUR ********* GOOGLE CLIENT ID********* HERE*********",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);
  // if we have no user: sign in button
  // if we have a user: show the log out button
  return (
    <div className="App">
      <div id="signInDiv"></div>
      {Object.keys(user).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      {user && (
        <div>
          <img src={user.picture} alt=""></img>
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
