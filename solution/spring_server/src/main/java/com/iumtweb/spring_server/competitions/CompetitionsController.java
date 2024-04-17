package com.iumtweb.spring_server.competitions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
public class CompetitionsController {

    private final CompetitionsService competitionsService;

    @Autowired
    public CompetitionsController(CompetitionsService competitionsService) {
        this.competitionsService = competitionsService;
    }

    @GetMapping("/champions-flags")
    public List<CompetitionsAndFlags> getCompetitionsAndFlags() {
        return competitionsService.getAllCompetitionsAndFlags();
    }

    @PostMapping("/champions-x-country")
    public ResponseEntity<List<CompetitionsAndFlags>> getCompetitionsByCountry(@RequestBody CountryRequest request) {
        List<CompetitionsAndFlags> competitions = competitionsService.getCompetitionsByCountryName(request.getCountryName());
        if (competitions.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(competitions);
    }

}
