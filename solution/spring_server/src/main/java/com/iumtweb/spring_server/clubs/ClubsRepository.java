package com.iumtweb.spring_server.clubs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;


@Repository
public interface ClubsRepository extends JpaRepository<Clubs, Integer> {
    @Query("SELECT c.clubId as clubId, c.name as name FROM Clubs c")
    List<ClubsNames> findAllClubNames();
}
