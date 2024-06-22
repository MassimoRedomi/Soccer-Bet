package com.iumtweb.spring_server.playersStat;

import com.iumtweb.spring_server.clubs.Clubs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayersStatRepository extends JpaRepository<PlayersStat, Integer> {
    List<PlayersStat> findByCurrentClubOrderByNameAsc(Clubs currentClub);
}

