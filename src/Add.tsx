import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
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
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    if(todoInEdit !== null) {
      setTitle(todoInEdit.title);
      setDescription(todoInEdit.description);
      setKeywords(todoInEdit.keywords);
    }
  }, [todoInEdit]);

  function onChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
   setTitle(e.target.value);
  }

  function onChangeDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
   setDescription(e.target.value);
  }

  function onChangeKeyword(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
  }

  function handleAddKeyword() {
    setKeywords([...keywords, keyword]);
    setKeyword("");
  }

  async function addTask() {
    let newTodo: Todo;
    if(todoInEdit === null) {
      newTodo = { title, description, keywords, synced: false, done: false };
    } else {
      newTodo = { id: todoInEdit.id, title, description, keywords, synced: todoInEdit.synced, done: todoInEdit.done };
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
        <div className="formUnit title">
          <input type="text" placeholder="Title" name="title" id="title_input" required value={title} onChange={onChangeTitle} />
        </div>
        <div className="formUnit keywords">
          <input type="text" placeholder="Add keywords" name="keyword" value={keyword} onChange={onChangeKeyword} id="title_input" />
          {keyword !== "" ? <FontAwesomeIcon className="ddKeyword" icon={faCirclePlus} size="2x" onClick={handleAddKeyword} /> : <></>}
          <div>
            {keywords.map((keyword) => {return(<li className="tag">{keyword}</li>)})}
          </div>
        </div>
        <div className="formUnit description">
          <textarea name="description" placeholder="Describe your task" id="description_input" value={description} onChange={onChangeDescription}></textarea>
        </div>
        <button className="submit" onClick={addTask}>Add</button>
        <button className="submit" onClick={onBackToList}>Cancel</button>
      </div>
    </>
  );
}

export default Add;