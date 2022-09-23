use uuid::Uuid;

use crate::json::{read_file_db, write_file_db};

#[derive(Clone)]
#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct Todos {
    todos: Vec<Todo>,
}

impl Todos {
    pub fn init() -> Vec<Todo> {
        read_file_db::<Todos>().unwrap().todos
    }

    pub fn new(todos: Vec<Todo>) -> Todos {
        Todos { todos: todos }
    }

    pub fn write(self) {
        write_file_db(&self).ok();
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
    pub done: bool,
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
}