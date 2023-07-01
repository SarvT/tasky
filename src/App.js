import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch("http://loacalhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if(result){
      alert("data saved!");
      setEmail("");
      setName("");
    }
  };
  return (
    <div className="App">
      
      <form action="">
                <input type="text" placeholder="name"
                value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="email"
                value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit"
                onClick={onSubmit}>submit</button>
            </form>
    </div>
  );
}

export default App;
