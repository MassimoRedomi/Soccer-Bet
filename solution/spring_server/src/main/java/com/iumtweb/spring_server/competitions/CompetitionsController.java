package com.iumtweb.spring_server.competitions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
public class CompetitionsController {

    private final CompetitionsService competitionsService;

    @Autowired
    public CompetitionsController(CompetitionsService competitionsService) {
        this.competitionsService = competitionsService;
    }

    @GetMapping("/competitions")
    public List<Competitions> getFirst10Competitions() {
        return competitionsService.getFirst10Competitions();
    }

    @GetMapping("/champions-flags")
    public List<CompetitionsAndFlags> getCompetitionsAndFlags() {
        return competitionsService.getAllCompetitionsAndFlags();
    }

    @PostMapping("/champions-x-country")
    public ResponseEntity<List<Competitions>> getCompetitionsByCountry(@RequestBody CountryRequest request) {
        try {
            String countryName = request.getCountryName();
            List<Competitions> competitionsList = competitionsService.getCompetitionsByCountryName(countryName);
            return new ResponseEntity<>(competitionsList, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
