import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Todo } from "./models/Todo";
import "./Add.css";
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";

interface PropsList {
  todoInEdit: Todo | null,
  onBackToList: () => void
}

function Add({ todoInEdit, onBackToList }: PropsList) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todo, setTodo] = useState<Todo | null>(todoInEdit);

  useEffect(() => {
    if(todoInEdit !== null) {
      setTitle(todoInEdit.title);
      setDescription(todoInEdit.description);
    }
  }, [todoInEdit]);

  function onChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
   setTitle(e.target.value);
  }

  function onChangeDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
   setDescription(e.target.value);
  }

  async function addTask() {
    let newTodo: Todo;
    if(todoInEdit === null) {
      newTodo = { title, description, keywords: "", synced: false, done: false };
    } else {
      newTodo = { id: todoInEdit.id, title, description, keywords: "", synced: todoInEdit.synced, done: todoInEdit.done };
    }
    await invoke("write", { currentTodo: newTodo });
    onBackToList();
  }

  return (
    <>
      <h1>&bull; Add a Todo &bull;</h1>
      <div className="icon_wrapper">
        <FontAwesomeIcon icon={faFileCirclePlus} size="3x" />
      </div>
      <div className="form">
        <div className="title">
          <label htmlFor="title"></label>
          <input type="text" placeholder="Title" name="title" id="title_input" required value={title} onChange={onChangeTitle} />
        </div>
        <div className="keywords">
          <label htmlFor="keywords"></label>
          <input type="text" placeholder="" name="keywords" id="title_input" />
        </div>
        {//TODO Add keywords handling
        }
        <div className="description">
          <label htmlFor="description"></label>
          <textarea name="description" placeholder="Describe your task" id="description_input" value={description} onChange={onChangeDescription}></textarea>
        </div>
        <button className="submit" onClick={addTask}>Add</button>
        <button className="submit" onClick={onBackToList}>Cancel</button>
      </div>
    </>
  );
}

export default Add;