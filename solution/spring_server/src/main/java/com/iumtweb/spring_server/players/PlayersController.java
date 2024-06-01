package com.iumtweb.spring_server.players;

import com.iumtweb.spring_server.clubs.Clubs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * REST controller for managing players.
 * Provides endpoints to interact with player data.
 */
@RestController
public class PlayersController {

    private final PlayersService playersService;

    /**
     * Constructor for PlayersController.
     *
     * @param playersService the service to be used for interacting with player data
     */
    @Autowired
    public PlayersController(PlayersService playersService) {
        this.playersService = playersService;
    }

    /**
     * Retrieves the first 10 players ordered by player ID in ascending order.
     *
     * @return a list of the first 10 players
     */
    @GetMapping("/players")
    public List<Players> getFirst10Players() {
        return playersService.getFirst10Players();
    }

    /**
     * Retrieves players by the given club ID.
     *
     * @param currentClubId the ID of the club
     * @return a list of players belonging to the specified club
     */
    @PostMapping("/clubplayers")
    public List<Players> getPlayersByClubId(@RequestBody Clubs currentClubId) {
        return playersService.getPlayersByClubId(currentClubId);
    }

    /**
     * Retrieves players by their ID.
     *
     * @param request a map containing the player ID
     * @return a list of players with the specified ID
     */
    @PostMapping("/playerbyid")
    public List<Players> getPlayerById(@RequestBody Map<String, Integer> request) {
        Integer playerId = request.get("playerId");
        return playersService.getPlayerById(playerId);
    }
}
