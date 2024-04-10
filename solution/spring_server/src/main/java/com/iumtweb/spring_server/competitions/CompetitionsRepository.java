package com.iumtweb.spring_server.competitions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompetitionsRepository extends JpaRepository<Competitions, String> {
    List<Competitions> findTop10ByOrderByCompetitionIdAsc();
}
