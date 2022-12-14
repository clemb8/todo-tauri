import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleCheck, faPenNib, faTrash, faBoxArchive, faBox } from '@fortawesome/free-solid-svg-icons';
import { StatusTodo } from "../../models/StatusTodo";
import { isDone, Todo, todoDone, todoUnDone } from "../../models/Todo";
import { invoke } from "@tauri-apps/api";

interface PropsItems {
    todos: Todo[],
    status: StatusTodo,
    onClickItem: (todos : Todo[]) => void,
    onEditItem: (todo : Todo) => void,
    onDeleteItem: (todos : Todo[]) => void,
    updateCount: () => void
}

function Items({ todos, status, onClickItem, onEditItem, onDeleteItem, updateCount }: PropsItems) {

    let count = 0;
    function handleClickItem(e: React.MouseEvent<HTMLLabelElement>) {
        todos.forEach((todo) => {
            if(todo.id === e.currentTarget.id) {
                isDone(todo) ? todoUnDone(todo) : todoDone(todo);
                invoke("write", { currentTodo: todo });
                onClickItem(todos);
                updateCount();
            }
        });
    }

    function handleClickEditItem(e: React.MouseEvent<SVGSVGElement>) {
        todos.forEach((todo) => {
        if(todo.id === e.currentTarget.id) { 
            onEditItem(todo);
        }
        });
    }

    function handleClickArchiveItem(e: React.MouseEvent<SVGSVGElement>) {
        todos.forEach((todo) => {
            if(todo.id === e.currentTarget.id) {
                todo.status = StatusTodo.Archived;
                invoke("write", { currentTodo: todo });
                onClickItem(todos);
                updateCount();
            }
        });
    }

    function handleClickDeleteItem(e: React.MouseEvent<SVGSVGElement>) {
        let newTodos = todos.filter((todo) => todo.id !== e.currentTarget.id);
        invoke("delete", { currentTodo: newTodos });
        onDeleteItem(newTodos);
    }

    return(
        <>
        {
            todos.map((todo) => {
              if(todo.status === status) {
                count += 1;
                return(
                  <div className='item' key={todo.id}>
                    {status === StatusTodo.Done ? <FontAwesomeIcon icon={faCircleCheck} size="lg" /> : <></>}
                    {status === StatusTodo.Todo ? <FontAwesomeIcon icon={faCircle} size="lg" /> : <></>}
                    {status === StatusTodo.Archived ? <FontAwesomeIcon icon={faBox} size="lg" /> : <></>}
                    <label id={todo.id} className="pending" htmlFor={todo.id} onClick={handleClickItem}>{ todo.title }</label>
                    <div className='icons'>
                      <FontAwesomeIcon className="icon iconEdit" id={todo.id} icon={faPenNib} onClick={handleClickEditItem} size="xs" />
                      {status !== StatusTodo.Archived ? <FontAwesomeIcon className="icon iconArchive" id={todo.id} icon={faBoxArchive} onClick={handleClickArchiveItem} size="xs" /> : <></>} 
                      <FontAwesomeIcon className="icon iconDelete" id={todo.id} icon={faTrash} onClick={handleClickDeleteItem} size="xs" />
                    </div>
                  </div>
                )
              }
            })
        }
        </>
    );
}

export default Items;