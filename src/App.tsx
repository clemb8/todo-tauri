import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container">
      <div className="todoList">
        <h1>My To-Do List</h1>
        <div className="items">
          <input id="item1" type="checkbox" checked />
          <label className="done" htmlFor="item1">Create a to-do list</label>

          <input id="item2" type="checkbox" />
          <label className="pending" htmlFor="item2">Take down Christmas tree</label>

          <input id="item3" type="checkbox" />
          <label htmlFor="item3">Learn Ember.js</label>

          <input id="item4" type="checkbox" />
          <label htmlFor="item4">Binge watch every episode of MacGyver</label>

          <input id="item5" type="checkbox" />
          <label htmlFor="item5">Alphabetize everything in the fridge</label>

          <h2 className="done">Done</h2>
          <h2 className="pending">Pending</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
