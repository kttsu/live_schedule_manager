package com.tsuchiya.live;

public class LiveRequest {
    private String schedule;

    private String name;

    private String location;


    public LiveRequest(String schedule, String name, String location) {
        this.schedule = schedule;
        this.name = name;
        this.location = location;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSchedule() {
        return schedule;
    }

    public String getName() {
        return name;
    }

    public String getLocation() {
        return location;
    }

}

