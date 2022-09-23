import { Todo } from "./models/Todo";
import "./List.css";
import { invoke } from "@tauri-apps/api";

interface PropsList {
  todos: Todo[],
  onAdd: () => void,
  onClickItem: (todos : Todo[]) => void
}

function List({ todos, onAdd, onClickItem }: PropsList) {

  function handleClickItem(e: React.MouseEvent<HTMLLabelElement>) {
    let todoUpdated;
    todos.forEach((todo) => {
      if(todo.id === e.currentTarget.id) {
        todo.done ? todo.done = false : todo.done = true;
      }
      todoUpdated = todo;
    });
    invoke("write", { todoList: todos, currentTodo: todoUpdated });
    console.log(todos);
    onClickItem(todos);
  }

  return(
    <div className="todoList">
      <h1>My To-Do List</h1>
      <button className="button-add" onClick={onAdd}>Add a To-Do</button>
      <div className="items">

        <h2 className="done">Done</h2>
        {
          todos.map((todo) => {
            if(todo.done) {
              return(
                <div key={todo.id}><input className="checkbox" id={todo.id} type="checkbox" checked /><label id={todo.id} className="done" htmlFor={todo.id} onClick={handleClickItem}>{ todo.title }</label></div>
              )
            }
          }) 
        }

        <h2 className="pending">Pending</h2>
        {
          todos.map((todo) => {
            if(!todo.done) {
              return(
                <div key={todo.id}><input className="checkbox" id={todo.id} type="checkbox" /><label id={todo.id} className="pending" htmlFor={todo.id} onClick={handleClickItem}>{ todo.title }</label></div>
              )
            }
          }) 
        }
      </div>
    </div>
  );
}

export default List;