import { Todo } from "./models/Todo";
import "./List.css";

interface PropsList {
  todos: Todo[],
  onAdd: () => void,
  onClickItem: (todos : Todo[]) => void
}

function List({ todos, onAdd, onClickItem }: PropsList) {

  function handleClickItem(e: React.MouseEvent<HTMLLabelElement>) {
    console.log(e.currentTarget.id);
    todos.forEach((todo) => todo.id === e.currentTarget.id ? todo.done = !todo.done : todo.done = todo.done);
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
                <><input className="checkbox" id={todo.id} type="checkbox" checked /><label id={todo.id} className="done" htmlFor={todo.id} onClick={handleClickItem}>{ todo.title }</label></>
              )
            }
          }) 
        }

        <h2 className="pending">Pending</h2>
        {
          todos.map((todo) => {
            if(!todo.done) {
              return(
                <><input className="checkbox" id={todo.id} type="checkbox" /><label id={todo.id} className="pending" htmlFor={todo.id} onClick={handleClickItem}>{ todo.title }</label></>
              )
            }
          }) 
        }
      </div>
    </div>
  );
}

export default List;