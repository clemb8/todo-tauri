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
        write_file_db(&self);
    }
}

#[derive(Clone)]
#[derive(serde::Serialize, Debug, serde::Deserialize)]
#[serde(rename_all = "camelCase")]

pub struct Todo {
    pub title: String,
    pub description: String,
    pub keywords: String,
    pub synced: bool,
    pub done: bool,
}

impl Todo {

    fn get(todos: Vec<Self>, title: &str) -> Self {

        let chosen = todos
            .into_iter() // changed from iter() to into_iter() here
            .find(|todo| todo.title == title)
            .expect("didnt match any todo");

        chosen
    }

}