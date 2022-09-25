use chrono::prelude::*;

pub fn compare_date_today(date: &str) -> i64 {
    let d1 = Utc::now();
    let d2 = DateTime::parse_from_rfc3339(&date).unwrap();
    let duration = d1.signed_duration_since(d2);
    duration.num_days()
}