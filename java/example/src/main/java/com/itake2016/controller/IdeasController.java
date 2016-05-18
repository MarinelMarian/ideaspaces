package com.itake2016.controller;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import com.itake2016.domain.*;


@Controller
@RequestMapping("/ideas")
public class IdeasController {

    @Autowired
    private IdeaRepository ideaRepository;
    private final AtomicLong counter = new AtomicLong();

    @RequestMapping(method = RequestMethod.GET)
    public
    @ResponseBody
    Idea process(@RequestParam(value = "content", required = false, defaultValue = "content") String content) {
        return new Idea(counter.incrementAndGet(), content );
    }

}
