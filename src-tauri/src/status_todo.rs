use serde::{Serialize, Deserialize};

#[derive(Clone, Debug, PartialEq)]
pub enum StatusTodo {
    Todo,
    Done,
    Archived
}

impl<'de> Deserialize<'de> for StatusTodo {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        match String::deserialize(deserializer)?.as_str() {
            "todo" => Ok(StatusTodo::Todo),
            "done" => Ok(StatusTodo::Done),
            "archived" => Ok(StatusTodo::Archived),
            _ => Ok(StatusTodo::Todo)
        }
    }
}
impl Serialize for StatusTodo {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            StatusTodo::Todo => serializer.serialize_str("todo"),
            StatusTodo::Done => serializer.serialize_str("done"),
            StatusTodo::Archived => serializer.serialize_str("archived"),
        }
    }
}