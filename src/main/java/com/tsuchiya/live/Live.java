package com.tsuchiya.live;

import java.util.Objects;

public class Live {
    private Integer id;

    private String schedule;

    public void setId(Integer id) {
        this.id = id;
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

    private String name;

    private String location;


    public Live(Integer id, String schedule, String name, String location) {
        this.id = id;
        this.schedule = schedule;
        this.name = name;
        this.location = location;
    }


    public Live(String schedule, String name, String location) {
        this.id = null;
        this.schedule = schedule;
        this.name = name;
        this.location = location;
    }


    public static Live createLive(String schedule, String name, String location) {
        return new Live(null, schedule, name, location);

    }

    public Integer getId() {
        return id;
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

    // DBテスト用 equalsおよびhashCodeのメソッド
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Live live = (Live) o;
        return Objects.equals(id, live.id) &&
                Objects.equals(schedule, live.schedule) &&
                Objects.equals(name, live.name) &&
                Objects.equals(location, live.location);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, schedule, name, location);
    }
}

