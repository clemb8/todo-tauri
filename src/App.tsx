import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Todo } from "./models/Todo";
import List from "./List";
import Add from "./Add";

function App() {

  const states = {
    list: "list",
    add: "add",
    edit: "edit"
  }
  const emptyList: Todo[] = [];
  const [todos, setTodos] = useState(emptyList);
  const [state, setState] = useState(states.list);
  const [todoInEdit, setTodoInEdit] = useState({} as Todo);

  async function init(): Promise<Todo[]> {
    return await invoke("init");
  }

  function handleToAdd() { setState(states.add) }
  function handleBackToList() { setState(states.list) }
  function handleActionItem(todos: Todo[]) { setTodos(todos) }
  function handleEditItem(todo: Todo) { setTodoInEdit(todo); setState(states.edit) }

  useEffect(() => { init().then((initTodos) => setTodos(initTodos)) }, [init]);

  return (
    <div className="container">
      { state === states.list ? <List todos={todos} onAdd={handleToAdd} onClickItem={handleActionItem} onEditItem={handleEditItem}></List> : <></> }
      { state === states.add ? <Add todoInEdit={null} onBackToList={handleBackToList}></Add> : <></> }
      { state === states.edit ? <Add todoInEdit={todoInEdit} onBackToList={handleBackToList}></Add> : <></> }
    </div>
  );
}

export default App;
