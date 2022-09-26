use std::{path::Path, fs::File };
use serde::Deserialize;
use tauri::api::path::data_dir;

use crate::todo::Todos;

const TEMPLATE_EMPTY_DB: &str = r#"{"todos":[]}"#;

fn create_file(name: &dyn AsRef<Path>) {
    File::create(name).expect("Unable to create file");
    write_file_db(&TEMPLATE_EMPTY_DB.to_string()).expect("Error in template file");
}

pub fn get_file(name: &dyn AsRef<Path>, truncate: bool) -> Result<File, std::io::Error> {
    println!("Exists : {}", Path::new(name.as_ref()).exists());
    if !Path::new(name.as_ref()).exists() {
        create_file(name);
    }

    let f = std::fs::OpenOptions::new()
            .write(true)
            .read(true)
            .create(false)
            .truncate(truncate)
            .open(name);
    print!("File : {:?}", f);
    f
}

pub fn read_file_db<T>() -> Result<T, serde_json::Error> where
T: for<'de> Deserialize<'de>{
    let file = get_file(&data_dir().unwrap().join("db.json").to_str().unwrap(), false).unwrap();
    let todos = match serde_json::from_reader::<std::fs::File, T>(file) {
        Ok(todos) => todos,
        Err(error) => {
            println!("Error in read_file_db : {:?}", error);
            write_file_db(&Todos::new(Vec::new())).expect("Error in template file");
            let retry_file = get_file(&data_dir().unwrap().join("db.json").to_str().unwrap(), false).unwrap();
            serde_json::from_reader::<std::fs::File, T>(retry_file).unwrap()
        }
    };

    Ok(todos)
}

pub fn write_file_db<T>(content: &T)  -> Result<(), Box<dyn std::error::Error>> where
T: serde::Serialize {
    let file = get_file(&data_dir().unwrap().join("db.json").to_str().unwrap(), true).unwrap();
    serde_json::to_writer_pretty(file, content)?;
    Ok(())
}
