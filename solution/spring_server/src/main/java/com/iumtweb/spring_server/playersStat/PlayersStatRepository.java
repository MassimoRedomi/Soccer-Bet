package com.iumtweb.spring_server.playersStat;

import com.iumtweb.spring_server.clubs.Clubs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for the PlayersStat entity.
 * Extends JpaRepository to provide CRUD operations.
 */
@Repository
public interface PlayersStatRepository extends JpaRepository<PlayersStat, Integer> {

    /**
     * Finds players by the given current club, ordered by name in ascending order.
     *
     * @param currentClub the current club of the players
     * @return a list of PlayersStat entities belonging to the specified club
     */
    List<PlayersStat> findByCurrentClubOrderByNameAsc(Clubs currentClub);
}
