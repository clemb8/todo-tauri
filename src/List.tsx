import { Todo } from "./models/Todo";
import "./List.css";

interface PropsList {
  todos: Todo[],
  onAdd: () => void
}

function List({ todos, onAdd }: PropsList) {

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
                <><input className="checkbox" id={todo.id} type="checkbox" checked /><label className="done" htmlFor={todo.id}>{ todo.title }</label></>
              )
            }
          }) 
        }

        <h2 className="pending">Pending</h2>
        {
          todos.map((todo) => {
            if(!todo.done) {
              return(
                <><input className="checkbox" id={todo.id} type="checkbox" /><label className="pending" htmlFor={todo.id}>{ todo.title }</label></>
              )
            }
          }) 
        }
      </div>
    </div>
  );
}

export default List;