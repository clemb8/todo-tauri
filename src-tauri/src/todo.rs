use uuid::Uuid;
use crate::status_todo::StatusTodo;
use crate::json::{read_file_db, write_file_db};
use crate::utils::compare_date_today;

#[derive(Clone)]
#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct Todos {
    todos: Vec<Todo>,
}

impl Todos {
    pub fn init() -> Vec<Todo> {
        println!("init");
        let mut retry = 0;
        let todos = match read_file_db::<Todos>() {
            Ok(todos) => todos.todos,
            Err(error) => {
                println!("Error in init : {:?}", error);
                retry += 1;
                if retry < 3 {
                    Todos::init()
                } else {
                    vec![]
                }
            }
        };
        todos
    }

    pub fn new(todos: Vec<Todo>) -> Todos {
        Todos { todos: todos }
    }

    pub fn write(&self) {
        write_file_db(&self).ok();
    }

    pub fn check_todo_to_archive(&mut self) {
        let mut to_updated = false;
        let mut updated_todos = Vec::new();
        for todo in self.todos.iter_mut() {
            if todo.is_to_archive() {
                to_updated = true;
                todo.status = StatusTodo::Archived;
                updated_todos.push(todo.clone());
            }
        }

        if to_updated { self.write(); }
    }
}

#[derive(Clone)]
#[derive(serde::Serialize, Debug, serde::Deserialize)]
#[serde(rename_all = "camelCase")]

pub struct Todo {
    pub id: Option<Uuid>,
    pub title: String,
    pub description: String,
    pub keywords: Vec<String>,
    pub synced: bool,
    pub status: StatusTodo,
    pub done_at: Option<String>,
}

impl Todo {
    pub fn save(mut self) {
        let mut todos: Vec<Todo> = Todos::init();
        if self.id == None {
            self.id = Some(Uuid::new_v4());
            todos.push(self);
        } else {
            let new_list = todos.iter().clone()
                .map(|t| if t.id == self.id { self.clone() } else { t.clone() })
                .collect::<Vec<Todo>>();
            todos = new_list;
        }
        Todos::new(todos).write();
    }

    pub fn delete(self) {
        let todos: Vec<Todo> = Todos::init();
        let new_list = todos.iter().clone()
            .filter(|t| t.id != self.id)
            .map(|t| t.clone())
            .collect::<Vec<Todo>>();
        Todos::new(new_list).write();
    }

    pub fn is_done(&self) -> bool {
        self.status == StatusTodo::Done
    }

    pub fn is_to_archive(&self) -> bool {
        if self.status == StatusTodo::Done {
            let days = compare_date_today(&self.done_at.as_ref().unwrap());
            println!("days: {}", days);
            days >= 1
        } else {
            false
        }
    }
}