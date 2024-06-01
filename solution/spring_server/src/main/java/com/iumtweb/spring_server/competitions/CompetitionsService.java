package com.iumtweb.spring_server.competitions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for managing competitions.
 * Provides methods to interact with the Competitions repository.
 */
@Service
public class CompetitionsService {

    private final CompetitionsRepository competitionsRepository;

    /**
     * Constructor for CompetitionsService.
     *
     * @param competitionsRepository the repository to be used for interacting with the database
     */
    @Autowired
    public CompetitionsService(CompetitionsRepository competitionsRepository) {
        this.competitionsRepository = competitionsRepository;
    }

    /**
     * Retrieves all competitions and their corresponding flags.
     *
     * @return a list of CompetitionsAndFlags, each containing competition details and the corresponding nation flag
     */
    public List<CompetitionsAndFlags> getAllCompetitionsAndFlags() {
        return competitionsRepository.findAllCompetitionsAndFlags();
    }

    /**
     * Retrieves competitions by country name and their corresponding flags.
     *
     * @param countryName the name of the country
     * @return a list of CompetitionsAndFlags, each containing competition details and the corresponding nation flag for the specified country
     */
    public List<CompetitionsAndFlags> getCompetitionsByCountryName(String countryName) {
        return competitionsRepository.findByCountryName(countryName);
    }

    /**
     * Retrieves a competition by its ID.
     *
     * @param competitionId the ID of the competition
     * @return the competition with the specified ID
     */
    public Competitions getCompetitionById(String competitionId) {
        return competitionsRepository.findByCompetitionId(competitionId);
    }

}
