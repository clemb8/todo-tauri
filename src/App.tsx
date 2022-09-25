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
    try {
      const todos: Todo[] = await invoke("init");
      return todos;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  function handleToAdd() { setState(states.add) }
  function handleBackToList() { setState(states.list) }
  function handleActionItem(todos: Todo[]) { setTodos(todos) }
  function handleEditItem(todo: Todo) { setTodoInEdit(todo); setState(states.edit) }
  function handleUpdateList(todo: Todo) { 
    if(todo.id === undefined) {
      setTodos([...todos, todo]);
    } else {
      setTodos(todos.map((t) => {
        if(t.id === todo.id) {
          return todo;
        }
        return t;
      }));
    }
    setState(states.list);
  }

  useEffect(() => { init().then((initTodos) => setTodos(initTodos)).catch((error) => console.error(error)) }, []);

  return (
    <div className="container">
      { state === states.list ? <List todos={todos} onAdd={handleToAdd} onClickItem={handleActionItem} onEditItem={handleEditItem}></List> : <></> }
      { state === states.add ? <Add todoInEdit={null} onBackToList={handleBackToList} onUpdateList={handleUpdateList}></Add> : <></> }
      { state === states.edit ? <Add todoInEdit={todoInEdit} onBackToList={handleBackToList} onUpdateList={handleUpdateList}></Add> : <></> }
    </div>
  );
}

export default App;
