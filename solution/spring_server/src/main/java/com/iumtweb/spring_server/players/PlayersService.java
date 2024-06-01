package com.iumtweb.spring_server.players;

import com.iumtweb.spring_server.clubs.Clubs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for managing players.
 * Provides methods to interact with the Players repository.
 */
@Service
public class PlayersService {

    private final PlayersRepository playersRepository;

    /**
     * Constructor for PlayersService.
     *
     * @param playersRepository the repository to be used for interacting with the database
     */
    @Autowired
    public PlayersService(PlayersRepository playersRepository) {
        this.playersRepository = playersRepository;
    }

    /**
     * Retrieves the first 10 players ordered by player ID in ascending order.
     *
     * @return a list of the first 10 players
     */
    public List<Players> getFirst10Players() {
        return playersRepository.findTop10ByOrderByPlayerIdAsc();
    }

    /**
     * Retrieves players by the given club ID.
     *
     * @param currentClubId the ID of the club
     * @return a list of players belonging to the specified club
     */
    public List<Players> getPlayersByClubId(Clubs currentClubId) {
        return playersRepository.findByCurrentClubId(currentClubId);
    }

    /**
     * Retrieves players by their ID.
     *
     * @param playerId the ID of the player
     * @return a list of players with the specified ID
     */
    public List<Players> getPlayerById(Integer playerId) {
        return playersRepository.findByPlayerId(playerId);
    }
}
