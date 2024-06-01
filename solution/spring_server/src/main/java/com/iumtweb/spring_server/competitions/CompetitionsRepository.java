package com.iumtweb.spring_server.competitions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for the Competitions entity.
 * Extends JpaRepository to provide CRUD operations.
 */
@Repository
public interface CompetitionsRepository extends JpaRepository<Competitions, String> {

    /**
     * Finds all competitions and their corresponding flags.
     *
     * @return a list of CompetitionsAndFlags, each containing competition details and the corresponding nation flag
     */
    @Query("SELECT c.competitionId as competitionId, c.competitionCode as competitionCode, c.name as name, " +
            "c.subType as subType, c.type as type, c.countryId as countryId, c.countryName as countryName, " +
            "c.domesticLeagueCode as domesticLeagueCode, c.confederation as confederation, c.url as url, " +
            "n.sig as sig FROM Competitions c JOIN Nations n ON c.countryName = n.name")
    List<CompetitionsAndFlags> findAllCompetitionsAndFlags();

    /**
     * Finds competitions by country name and their corresponding flags.
     *
     * @param countryName the name of the country
     * @return a list of CompetitionsAndFlags, each containing competition details and the corresponding nation flag for the specified country
     */
    @Query("SELECT c.competitionId as competitionId, c.competitionCode as competitionCode, c.name as name, " +
            "c.subType as subType, c.type as type, c.countryId as countryId, c.countryName as countryName, " +
            "c.domesticLeagueCode as domesticLeagueCode, c.confederation as confederation, c.url as url, " +
            "n.sig as sig " +
            "FROM Competitions c, Nations n " +
            "WHERE c.countryName = n.name AND n.name = :countryName")
    List<CompetitionsAndFlags> findByCountryName(@Param("countryName") String countryName);

    /**
     * Finds a competition by its ID.
     *
     * @param competitionId the ID of the competition
     * @return the competition with the specified ID
     */
    Competitions findByCompetitionId(String competitionId);
}
