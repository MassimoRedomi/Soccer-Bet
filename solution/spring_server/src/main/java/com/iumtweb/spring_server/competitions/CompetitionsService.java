package com.iumtweb.spring_server.competitions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class CompetitionsService {
    private final CompetitionsRepository competitionsRepository;

    @Autowired
    public CompetitionsService(CompetitionsRepository competitionsRepository) {
        this.competitionsRepository = competitionsRepository;
    }

    public List<CompetitionsAndFlags> getAllCompetitionsAndFlags() {
        return competitionsRepository.findAllCompetitionsAndFlags();
    }

    public List<CompetitionsAndFlags> getCompetitionsByCountryName(String countryName) {
        return competitionsRepository.findByCountryName(countryName);
    }

    public Competitions getCompetitionById(String competitionId) {
        return competitionsRepository.findByCompetitionId(competitionId);
    }

}
