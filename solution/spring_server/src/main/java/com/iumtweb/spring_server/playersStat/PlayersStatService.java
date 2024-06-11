package com.iumtweb.spring_server.playersStat;


import com.iumtweb.spring_server.clubs.Clubs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayersStatService {
    private final PlayersStatRepository playersStatRepository;

    @Autowired
    public PlayersStatService(PlayersStatRepository playersStatRepository) {
        this.playersStatRepository = playersStatRepository;
    }

    public List<PlayersStat> getPlayersByCurrentClub(Clubs currentClub) {
        return playersStatRepository.findByCurrentClubOrderByNameAsc(currentClub);
    }
}
