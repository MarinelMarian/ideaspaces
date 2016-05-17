package com.itake2016.domain;

public class Idea {

    private final long id;
    private final String content;

    public Idea(long id, String content) {
        this.id = id;
        this.content = content;
    }

    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

}