package com.itake2016.dto;

import com.itake2016.domain.Idea;

/**
 * Created by alin on 19.05.2016.
 */
public class IdeaDTO {

    private String content;

    private String topic;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }
    public static Idea convertToModel(IdeaDTO ideaDTO){
        Idea idea=new Idea(ideaDTO.getContent(),ideaDTO.getTopic());
        return idea;
    }
}
