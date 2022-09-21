#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use todo::Todo;
use crate::todo::Todos;
use uuid::Uuid;
pub mod json;
pub mod todo;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn init() -> Vec<Todo> {
 Todos::init()
}

#[tauri::command]
fn write(mut todo_list: Vec<Todo>, mut current_todo: Todo) {
    let todos: Todos;
    if current_todo.id == None {
        current_todo.id = Some(Uuid::new_v4());
        todo_list.push(current_todo);
        todos = Todos::new(todo_list);
    } else {
        let new_list = todo_list.iter().clone().map(|t| if t.id == current_todo.id { current_todo.clone() } else { t.clone() }).collect::<Vec<Todo>>();
        todos = Todos::new(new_list);
    }
    
    todos.write();
}

fn main() {

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![init, write])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
