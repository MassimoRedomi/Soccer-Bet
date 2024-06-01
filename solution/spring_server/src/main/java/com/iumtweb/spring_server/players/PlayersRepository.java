package com.iumtweb.spring_server.players;

import com.iumtweb.spring_server.clubs.Clubs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for the Players entity.
 * Extends JpaRepository to provide CRUD operations.
 */
@Repository
public interface PlayersRepository extends JpaRepository<Players, Integer> {

    /**
     * Finds the top 10 players ordered by player ID in ascending order.
     *
     * @return a list of the first 10 players
     */
    List<Players> findTop10ByOrderByPlayerIdAsc();

    /**
     * Finds players by the given club ID.
     *
     * @param currentClubId the ID of the club
     * @return a list of players belonging to the specified club
     */
    List<Players> findByCurrentClubId(Clubs currentClubId);

    /**
     * Finds players by their ID.
     *
     * @param playerId the ID of the player
     * @return a list of players with the specified ID
     */
    List<Players> findByPlayerId(Integer playerId);
}
