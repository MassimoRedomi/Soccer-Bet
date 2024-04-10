package com.iumtweb.spring_server.clubs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubsRepository extends JpaRepository<Clubs, Integer> {
    List<Clubs> findTop10ByOrderByClubIdAsc();
}