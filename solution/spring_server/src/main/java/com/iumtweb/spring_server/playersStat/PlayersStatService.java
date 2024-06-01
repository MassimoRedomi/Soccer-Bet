package com.iumtweb.spring_server.playersStat;

import com.iumtweb.spring_server.clubs.Clubs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for managing player statistics.
 * Provides methods to interact with the PlayersStat repository.
 */
@Service
public class PlayersStatService {

    private final PlayersStatRepository playersStatRepository;

    /**
     * Constructor for PlayersStatService.
     *
     * @param playersStatRepository the repository to be used for interacting with the database
     */
    @Autowired
    public PlayersStatService(PlayersStatRepository playersStatRepository) {
        this.playersStatRepository = playersStatRepository;
    }

    /**
     * Retrieves players by the given current club, ordered by name in ascending order.
     *
     * @param currentClub the current club of the players
     * @return a list of PlayersStat entities belonging to the specified club
     */
    public List<PlayersStat> getPlayersByCurrentClub(Clubs currentClub) {
        return playersStatRepository.findByCurrentClubOrderByNameAsc(currentClub);
    }
}
