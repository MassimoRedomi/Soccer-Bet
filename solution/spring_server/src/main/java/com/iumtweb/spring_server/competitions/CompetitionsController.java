package com.iumtweb.spring_server.competitions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST controller for managing competitions.
 * Provides endpoints to interact with competition data and retrieve competitions with their flags.
 */
@RestController
public class CompetitionsController {

    private final CompetitionsService competitionsService;

    /**
     * Constructor for CompetitionsController.
     *
     * @param competitionsService the service to be used for interacting with competition data
     */
    @Autowired
    public CompetitionsController(CompetitionsService competitionsService) {
        this.competitionsService = competitionsService;
    }

    /**
     * Retrieves all competitions and their corresponding flags.
     *
     * @return a list of CompetitionsAndFlags, each containing competition details and the corresponding nation flag
     */
    @GetMapping("/champions-flags")
    public List<CompetitionsAndFlags> getCompetitionsAndFlags() {
        return competitionsService.getAllCompetitionsAndFlags();
    }

    /**
     * Retrieves competitions by country name and their corresponding flags.
     *
     * @param request the CountryRequest containing the name of the country
     * @return a ResponseEntity containing a list of CompetitionsAndFlags, or no content if none found
     */
    @PostMapping("/champions-x-country")
    public ResponseEntity<List<CompetitionsAndFlags>> getCompetitionsByCountry(@RequestBody CountryRequest request) {
        List<CompetitionsAndFlags> competitions = competitionsService.getCompetitionsByCountryName(request.getCountryName());
        if (competitions.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(competitions);
    }

    /**
     * Retrieves a competition by its ID.
     *
     * @param request a map containing the competition ID
     * @return the competition with the specified ID
     */
    @PostMapping("/getcompetition-by-id")
    public Competitions getCompetitionById(@RequestBody Map<String, String> request) {
        String competitionId = request.get("competitionId");
        return competitionsService.getCompetitionById(competitionId);
    }

}
