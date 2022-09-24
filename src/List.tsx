import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isDone, Todo, todoDone, todoUnDone } from "./models/Todo";
import "./List.css";
import { invoke } from "@tauri-apps/api";
import { faCircle, faCircleCheck, faPenNib } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";

interface PropsList {
  todos: Todo[],
  onAdd: () => void,
  onClickItem: (todos : Todo[]) => void
  onEditItem: (todo : Todo) => void
}

function List({ todos, onAdd, onClickItem, onEditItem }: PropsList) {

  const [countDone, setCountDone] = useState(0);
  const [countPending, setCountPending] = useState(0);

  useEffect(() => {
    setCountDone(todos.filter((todo) => todo.done).length);
    setCountPending(todos.filter((todo) => !todo.done).length);
  }, [todos]);

  function count(newDone: boolean) {
    if (newDone) {
      setCountDone(countDone + 1);
      setCountPending(countPending - 1);
    } else {
      setCountDone(countDone - 1);
      setCountPending(countPending + 1);
    }
  }

  function handleClickItem(e: React.MouseEvent<HTMLLabelElement>) {
    let todoUpdated;
    todos.forEach((todo) => {
      if(todo.id === e.currentTarget.id) {
        isDone(todo) ? todoUnDone(todo, count(false)) : todoDone(todo, count(true));
        todoUpdated = todo;
      }
    });
    invoke("write", { currentTodo: todoUpdated });
    onClickItem(todos);
  }

  function handleClickEditItem(e: React.MouseEvent<SVGSVGElement>) {
    todos.forEach((todo) => {
      if(todo.id === e.currentTarget.id) { 
        onEditItem(todo);
      }
    });
  }

  return(
    <div className="todoList">
      <h1>My To-Do List</h1>
      <button className="button-add" onClick={onAdd}>Add a To-Do</button>
      <div className="items">

        <div className="header"><span className="border"></span><h2 className="done">Done</h2><span className="count">{countDone}</span></div>
        {
          todos.map((todo) => {
            if(todo.done) {
              return(
                <div className="item" key={todo.id}>
                  <FontAwesomeIcon icon={faCircleCheck} size="xl" />
                  <label id={todo.id} className="done" htmlFor={todo.id} onClick={handleClickItem}>{ todo.title }</label>
                  <FontAwesomeIcon className="iconEdit" id={todo.id} icon={faPenNib} onClick={handleClickEditItem} />
                </div>
              )
            }
          }) 
        }

        <div className="header"><span className="border"></span><h2 className="pending">Pending</h2><span className="count">{countPending}</span></div>
        {
          todos.map((todo) => {
            if(!todo.done) {
              return(
                <div className='item' key={todo.id}>
                  <FontAwesomeIcon icon={faCircle} size="xl" />
                  <label id={todo.id} className="pending" htmlFor={todo.id} onClick={handleClickItem}>{ todo.title }</label>
                  <FontAwesomeIcon className="iconEdit" id={todo.id} icon={faPenNib} onClick={handleClickEditItem} />
                </div>
              )
            }
          }) 
        }
      </div>
    </div>
  );
}

export default List;