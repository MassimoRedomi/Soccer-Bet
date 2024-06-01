package com.iumtweb.spring_server.playersStat;

import com.iumtweb.spring_server.clubs.Clubs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing player statistics.
 * Provides endpoints to interact with player statistics data.
 */
@RestController
public class PlayersStatController {

    private final PlayersStatService playersStatService;

    /**
     * Constructor for PlayersStatController.
     *
     * @param playersStatService the service to be used for interacting with player statistics data
     */
    @Autowired
    public PlayersStatController(PlayersStatService playersStatService) {
        this.playersStatService = playersStatService;
    }

    /**
     * Retrieves players by the given current club, ordered by name in ascending order.
     *
     * @param currentClub the current club of the players
     * @return a list of PlayersStat entities belonging to the specified club
     */
    @PostMapping("/playersoncurrentclub")
    public List<PlayersStat> getPlayersByClubId(@RequestBody Clubs currentClub) {
        return playersStatService.getPlayersByCurrentClub(currentClub);
    }
}
