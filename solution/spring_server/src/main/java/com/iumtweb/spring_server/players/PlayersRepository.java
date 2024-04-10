package com.iumtweb.spring_server.players;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayersRepository extends JpaRepository<Players, Integer> {
    List<Players> findTop10ByOrderByPlayerIdAsc();
}
