import { Todo } from "../../models/Todo";
import "./List.css";
import { useEffect, useState } from "react";
import { StatusTodo } from '../../models/StatusTodo';
import Items from "./Items";
import { MultiSelect } from "react-multi-select-component";

interface PropsList {
  todos: Todo[],
  onAdd: () => void,
  onClickItem: (todos : Todo[]) => void,
  onEditItem: (todo : Todo) => void,
  onDeleteItem: (todos : Todo[]) => void,
}

const options = [
  { label: "To-Do", value: "todo" },
  { label: "Done", value: "done" },
  { label: "Archived", value: "archived"},
];

function List({ todos, onAdd, onClickItem, onEditItem, onDeleteItem }: PropsList) {

  const [counter, setCounter] = useState({done: 0, todo: 0, archived: 0});
  const [selected, setSelected] = useState([options[0], options[1]]);

  function updateCounter() {
    let count = {done: 0, todo: 0, archived: 0};
    todos.forEach((todo) => {
      if(todo.status === StatusTodo.Done) {
        count.done += 1;
      } else if(todo.status === StatusTodo.Todo) {
        count.todo += 1;
      } else {
        count.archived += 1;
      }
    });
    setCounter(count);
  }

  useEffect(() => { updateCounter() }, [todos]);

  function handleCount() {
    updateCounter();
  }

  return(
    <div className="todoList">
      <h1>My To-Do List</h1>
      <button className="button-add" onClick={onAdd}>Add a To-Do</button>
      <div className="filters">
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
          disableSearch={true}
        />
      </div>

      <div className="items">
        { selected.includes(options[0]) ?
              <>
                <div className="header"><span className="border"></span><h2 className="pending">Pending</h2><span className="count">{counter.todo}</span></div>
                <Items todos={todos} 
                  status={StatusTodo.Todo} 
                  onClickItem={onClickItem} 
                  onEditItem={onEditItem} 
                  onDeleteItem={onDeleteItem} 
                  updateCount={handleCount}></Items>
               </> : <></>
        }
        { selected.includes(options[1]) ?
                <>
                  <div className="header"><span className="border"></span><h2 className="done">Done</h2><span className="count">{counter.done}</span></div>
                  <Items todos={todos} 
                    status={StatusTodo.Done} 
                    onClickItem={onClickItem} 
                    onEditItem={onEditItem} 
                    onDeleteItem={onDeleteItem}
                    updateCount={handleCount}></Items>
                </> : <></>
        }
        { selected.includes(options[2]) ?
                <>
                  <div className="header"><span className="border"></span><h2 className="done">Archived</h2><span className="count">{counter.archived}</span></div>
                  <Items todos={todos} 
                    status={StatusTodo.Archived} 
                    onClickItem={onClickItem} 
                    onEditItem={onEditItem} 
                    onDeleteItem={onDeleteItem}
                    updateCount={handleCount}></Items>
                </> : <></>
        }

      </div>
    </div>
  );
}

export default List;