import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Todo } from "./models/Todo";
import List from "./List";
import Add from "./Add";

function App() {

  const states = {
    list: "list",
    add: "add"
  }
  const emptyList: Todo[] = [];
  const [todos, setTodos] = useState(emptyList);
  const [state, setState] = useState(states.list);

  async function init(): Promise<Todo[]> {
    return await invoke("init");
  }

  function handleToAdd() { setState(states.add); }
  function handleBackToList() { setState(states.list) }

  useEffect(() => { init().then((initTodos) => setTodos(initTodos)) }, [init]);

  return (
    <div className="container">
      { state === states.list ? <List todos={todos} onAdd={handleToAdd}></List> : <Add todos={todos} onBackToList={handleBackToList}></Add> }
    </div>
  );
}

export default App;
