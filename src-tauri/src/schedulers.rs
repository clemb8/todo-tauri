extern crate cronjob;
use cronjob::CronJob;

use crate::todo::Todos;

pub fn schedule_check_todo_to_archive() {
    let mut job = CronJob::new("Archiving", job_scheduled);
    job.seconds("0");
    job.minutes("0");
    job.offset(0);
    CronJob::start_job_threaded(job);
}

fn job_scheduled(_name: &str) {
    println!("Archiving");
    let list_todo = Todos::init();
    let mut todos = Todos::new(list_todo);
    todos.check_todo_to_archive();
}