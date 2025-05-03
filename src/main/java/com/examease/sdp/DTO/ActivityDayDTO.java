package com.examease.sdp.DTO;

public class ActivityDayDTO {
    private String date;  // format: yyyy-MM-dd
    private int count;

    public ActivityDayDTO(String date, int count) {
        this.date = date;
        this.count = count;
    }

    public String getDate() {
        return date;
    }

    public int getCount() {
        return count;
    }
}
