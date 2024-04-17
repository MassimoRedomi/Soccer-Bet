package com.iumtweb.spring_server.competitions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompetitionsRepository extends JpaRepository<Competitions, String> {

    List<Competitions> findTop10ByOrderByCompetitionIdAsc();

    @Query("SELECT c.name as name, n.sig as sig FROM Competitions c JOIN Nations n ON c.countryName = n.name")
    List<CompetitionsAndFlags> findAllCompetitionsAndFlags();

    List<Competitions> findByCountryName(String countryName);

}
