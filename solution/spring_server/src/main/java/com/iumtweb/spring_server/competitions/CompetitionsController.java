package com.iumtweb.spring_server.competitions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
}
