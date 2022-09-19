#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::string;

use todo::Todo;

use crate::todo::Todos;

pub mod json;
mod todo;

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
fn write(todo_list: Vec<Todo>) {
    let todos = Todos::new(todo_list);
    todos.write();
}

fn main() {

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![init, write])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
