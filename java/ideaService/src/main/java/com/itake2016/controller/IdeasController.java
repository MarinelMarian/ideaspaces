package com.itake2016.controller;

import com.itake2016.domain.Idea;
import com.itake2016.dto.IdeaDTO;
import com.itake2016.service.IdeaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;


@Controller
@RequestMapping("/ideas")
public class IdeasController {

    @Autowired
    private IdeaService ideaService;


    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody void createIdea(@RequestBody IdeaDTO ideaDTO) {
        ideaService.createIdea(ideaDTO);
    }

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody List<Idea> getIdeas() {
        ArrayList<Idea> ideas = new ArrayList<>();
        ideas.add(new Idea("content 1", "topic 1"));
        ideas.add(new Idea("content 2", "topic 2"));
        ideas.add(new Idea("content 3", "topic 3"));
        return ideas;
    }

}
