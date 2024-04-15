package com.iumtweb.spring_server.clubs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ClubsController {
    private final ClubsService clubsService;

    @Autowired
    public ClubsController(ClubsService clubsService) {
        this.clubsService = clubsService;
    }

    @GetMapping("/clubs-names")
    public List<ClubsNames> getClubNames() {
        return clubsService.getClubNames();
    }
}