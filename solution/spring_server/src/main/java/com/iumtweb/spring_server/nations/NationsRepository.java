package com.iumtweb.spring_server.nations;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

/**
 * Repository interface for the Nations entity.
 * Extends JpaRepository to provide CRUD operations.
 */
public interface NationsRepository extends JpaRepository<Nations, String> {

    /**
     * Finds all nations that have corresponding entries in the Competitions table.
     *
     * @return a list of SoccerNations, each containing the name and sig of a nation.
     */
    @Query("SELECT n.name as name, n.sig as sig FROM Nations n WHERE EXISTS (SELECT 1 FROM Competitions c WHERE c.countryName = n.name)")
    List<SoccerNations> findAllSoccerNations();
}
