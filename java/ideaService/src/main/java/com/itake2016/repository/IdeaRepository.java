package com.itake2016.repository;

import com.itake2016.domain.Idea;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IdeaRepository extends CrudRepository<Idea, Long> {
}
