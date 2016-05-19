package com.itake2016.domain;

import javax.persistence.*;

@Entity
public class Idea {

    @Id
    @GeneratedValue
    private long id;
    @Column
    private String content;

    private String title;

    private boolean publicIdea = true;

    public Idea(String content, String title) {
        this.content = content;
        this.title = title;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public boolean isPublicIdea() {
        return publicIdea;
    }

    public void setPublicIdea(boolean publicIdea) {
        this.publicIdea = publicIdea;
    }
}
