package com.iumtweb.spring_server.clubs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * REST controller for managing clubs.
 * Provides endpoints to interact with club data.
 */
@RestController
public class ClubsController {

    private final ClubsService clubsService;

    /**
     * Constructor for ClubsController.
     *
     * @param clubsService the service to be used for interacting with club data
     */
    @Autowired
    public ClubsController(ClubsService clubsService) {
        this.clubsService = clubsService;
    }

    /**
     * Retrieves all club names.
     *
     * @return a list of ClubsNames, each containing the ID and name of a club
     */
    @GetMapping("/clubs-names")
    public List<ClubsNames> getClubNames() {
        return clubsService.getClubNames();
    }

    /**
     * Retrieves a club by its ID.
     *
     * @param request a map containing the club ID
     * @return a ResponseEntity containing the club with the specified ID, or a not found status if the club is not found
     */
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
