package com.iumtweb.spring_server.nations;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface NationsRepository extends JpaRepository<Nations, String> {

    @Query("SELECT n.name as name, n.sig as sig FROM Nations n WHERE EXISTS (SELECT 1 FROM Competitions c WHERE c.countryName = n.name)")
    List<SoccerNations> findAllSoccerNations();
}

