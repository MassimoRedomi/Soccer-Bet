package com.iumtweb.spring_server.clubs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

/**
 * Repository interface for the Clubs entity.
 * Extends JpaRepository to provide CRUD operations.
 */
@Repository
public interface ClubsRepository extends JpaRepository<Clubs, Integer> {

    /**
     * Finds all club names.
     *
     * @return a list of ClubsNames, each containing the ID and name of a club
     */
    @Query("SELECT c.clubId as clubId, c.name as name FROM Clubs c")
    List<ClubsNames> findAllClubNames();
}
