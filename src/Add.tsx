import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus, faCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Todo } from "./models/Todo";
import "./Add.css";
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import KeywordsInput from './components/KeywordsInput';
import { StatusTodo } from './models/StatusTodo';

interface PropsList {
  todoInEdit: Todo | null,
  onBackToList: () => void
}

function Add({ todoInEdit, onBackToList }: PropsList) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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

  function handleChangeKeywords(keywords: string[]) {
    setKeywords(keywords);
  }

  async function addTask() {
    let newTodo: Todo;
    if(todoInEdit === null) {
      newTodo = { title, description, keywords, synced: false, status: StatusTodo.Todo };
    } else {
      newTodo = { id: todoInEdit.id, title, description, keywords, synced: todoInEdit.synced, status: todoInEdit.status, doneAt: todoInEdit.doneAt };
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
          <KeywordsInput keywords={keywords} onChangeKeywords={handleChangeKeywords}></KeywordsInput>
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