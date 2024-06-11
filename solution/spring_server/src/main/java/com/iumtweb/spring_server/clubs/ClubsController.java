package com.iumtweb.spring_server.clubs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

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

    @PostMapping("/clubbyid")
    public ResponseEntity<Clubs> getClubById(@RequestBody Map<String, Integer> request) {
        Integer clubId = request.get("clubId");
        Clubs club = clubsService.getClubById(clubId);
        if (club != null) {
            return ResponseEntity.ok(club);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}