package com.iumtweb.spring_server.players;

import com.iumtweb.spring_server.clubs.Clubs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class PlayersController {

    private final PlayersService playersService;

    @Autowired
    public PlayersController(PlayersService playersService) {
        this.playersService = playersService;
    }

    @GetMapping("/players")
    public List<Players> getFirst10Players(){
        return playersService.getFirst10Players();
    }

    @PostMapping("/clubplayers")
    public List<Players> getPlayersByClubId(@RequestBody Clubs currentClubId) {
        return playersService.getPlayersByClubId(currentClubId);
    }

    @PostMapping("/playerbyid")
    public List<Players> getPlayerById(@RequestBody Map<String, Integer> request) {
        Integer playerId = request.get("playerId");
        return playersService.getPlayerById(playerId);
    }
}
