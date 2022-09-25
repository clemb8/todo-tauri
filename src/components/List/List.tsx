import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isDone, Todo, todoDone, todoUnDone } from "../../models/Todo";
import "./List.css";
import { invoke } from "@tauri-apps/api";
import { faCircle, faCircleCheck, faPenNib, faTrash, faBoxArchive } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { StatusTodo } from '../../models/StatusTodo';
import Items from './items';

interface PropsList {
  todos: Todo[],
  onAdd: () => void,
  onClickItem: (todos : Todo[]) => void,
  onEditItem: (todo : Todo) => void,
  onDeleteItem: (todos : Todo[]) => void,
}

function List({ todos, onAdd, onClickItem, onEditItem, onDeleteItem }: PropsList) {

  const [counter, setCounter] = useState({done: 0, todo: 0, archived: 0});

  useEffect(() => {
    setCounter({
      done: todos.filter((todo) => todo.status === StatusTodo.Done).length,
      todo: todos.filter((todo) => todo.status === StatusTodo.Todo).length,
      archived: todos.filter((todo) => todo.status === StatusTodo.Archived).length
    });
  }, [todos]);

  function handleCount() {
    setCounter({
      done: todos.filter((todo) => todo.status === StatusTodo.Done).length,
      todo: todos.filter((todo) => todo.status === StatusTodo.Todo).length,
      archived: todos.filter((todo) => todo.status === StatusTodo.Archived).length
    });
  }

  return(
    <div className="todoList">
      <h1>My To-Do List</h1>
      <button className="button-add" onClick={onAdd}>Add a To-Do</button>
      <div className="items">

        <div className="header"><span className="border"></span><h2 className="pending">Pending</h2><span className="count">{counter.todo}</span></div>
        <Items todos={todos} 
                status={StatusTodo.Todo} 
                onClickItem={onClickItem} 
                onEditItem={onEditItem} 
                onDeleteItem={onDeleteItem} 
                updateCount={handleCount}></Items>

        <div className="header"><span className="border"></span><h2 className="done">Done</h2><span className="count">{counter.done}</span></div>
        <Items todos={todos} 
                status={StatusTodo.Done} 
                onClickItem={onClickItem} 
                onEditItem={onEditItem} 
                onDeleteItem={onDeleteItem}
                updateCount={handleCount}></Items>
      </div>
    </div>
  );
}

export default List;