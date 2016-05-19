package com.itake2016.service;

import com.itake2016.domain.Idea;
import com.itake2016.dto.IdeaDTO;
import com.itake2016.repository.IdeaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by alin on 19.05.2016.
 */
@Service
public class IdeaServiceImpl implements IdeaService {

    @Autowired
    private IdeaRepository ideaRepository;


    @Override
    public void createIdea(IdeaDTO ideaDTO) {
        Idea idea = IdeaDTO.convertToModel(ideaDTO);


    }
}
