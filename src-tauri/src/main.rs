#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
pub mod json;
pub mod todo;

use todo::Todo;
use todo::Todos;


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn init() -> Vec<Todo> {
 Todos::init()
}

#[tauri::command]
fn write(current_todo: Todo) {
    current_todo.save();
}

fn main() {

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![init, write])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
