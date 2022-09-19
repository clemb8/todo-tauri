use std::{path::Path, fs::File };

use serde::Deserialize;

use crate::todo::Todos;

pub fn get_file(name: &dyn AsRef<Path>) -> Result<File, std::io::Error> {
    let f = std::fs::OpenOptions::new()
            .write(true)
            .read(true)
            .create(false)
            .truncate(false)
            .open(name);

    f
}

pub fn read_file_db<T>() -> Result<T, serde_json::Error> where
T: for<'de> Deserialize<'de>{
    let file = get_file(&"../db.json").unwrap();
    serde_json::from_reader::<std::fs::File, T>(file)
}

pub fn write_file_db(todos: &Todos)  -> Result<(), Box<dyn std::error::Error>> {
    let file = get_file(&"../db.json").unwrap();
    serde_json::to_writer_pretty(file, todos)?;
    Ok(())
}
