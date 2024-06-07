package com.iumtweb.spring_server.playersStat;

import com.iumtweb.spring_server.clubs.Clubs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PlayersStatController {

    private final PlayersStatService playersStatService;

    @Autowired
    public PlayersStatController(PlayersStatService playersStatService) {
        this.playersStatService = playersStatService;
    }

    @PostMapping("/playersoncurrentclub")
    public List<PlayersStat> getPlayersByClubId(@RequestBody Clubs currentClub) {
        return playersStatService.getPlayersByCurrentClub(currentClub);
    }
}
