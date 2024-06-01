package com.iumtweb.spring_server.clubs;

import com.iumtweb.spring_server.competitions.Competitions;
import jakarta.persistence.*;
import java.math.BigDecimal;

/**
 * Represents a Club entity.
 * This class is mapped to the 'clubs' table in the database.
 */
@Entity
@Table(name = "clubs")
public class Clubs {

    /**
     * The unique ID of the club.
     */
    @Id
    @Column(name = "club_id")
    private Integer clubId;

    /**
     * The code of the club.
     */
    @Column(name = "club_code")
    private String clubCode;

    /**
     * The name of the club.
     */
    @Column(name = "name")
    private String name;

    /**
     * The domestic competition the club is part of.
     */
    @ManyToOne
    @JoinColumn(name = "domestic_competition_id", referencedColumnName = "competition_id")
    private Competitions domesticCompetition;

    /**
     * The total market value of the club.
     */
    @Column(name = "total_market_value")
    private String totalMarketValue;

    /**
     * The size of the club's squad.
     */
    @Column(name = "squad_size")
    private Integer squadSize;

    /**
     * The average age of the club's squad.
     */
    @Column(name = "average_age")
    private BigDecimal averageAge;

    /**
     * The number of foreign players in the club.
     */
    @Column(name = "foreigners_number")
    private Integer foreignersNumber;

    /**
     * The percentage of foreign players in the club.
     */
    @Column(name = "foreigners_percentage")
    private BigDecimal foreignersPercentage;

    /**
     * The number of national team players in the club.
     */
    @Column(name = "national_team_players")
    private Integer nationalTeamPlayers;

    /**
     * The name of the club's stadium.
     */
    @Column(name = "stadium_name")
    private String stadiumName;

    /**
     * The number of seats in the club's stadium.
     */
    @Column(name = "stadium_seats")
    private Integer stadiumSeats;

    /**
     * The net transfer record of the club.
     */
    @Column(name = "net_transfer_record")
    private String netTransferRecord;

    /**
     * The name of the club's coach.
     */
    @Column(name = "coach_name")
    private String coachName;

    /**
     * The last season the club played in.
     */
    @Column(name = "last_season")
    private Integer lastSeason;

    /**
     * The URL for the club's details.
     */
    @Column(name = "url")
    private String url;

    /**
     * Default constructor.
     * Needed by JPA.
     */
    public Clubs() {
    }

    /**
     * Constructor with parameters.
     *
     * @param clubId the unique ID of the club
     * @param clubCode the code of the club
     * @param name the name of the club
     * @param domesticCompetition the domestic competition the club is part of
     * @param totalMarketValue the total market value of the club
     * @param squadSize the size of the club's squad
     * @param averageAge the average age of the club's squad
     * @param foreignersNumber the number of foreign players in the club
     * @param foreignersPercentage the percentage of foreign players in the club
     * @param nationalTeamPlayers the number of national team players in the club
     * @param stadiumName the name of the club's stadium
     * @param stadiumSeats the number of seats in the club's stadium
     * @param netTransferRecord the net transfer record of the club
     * @param coachName the name of the club's coach
     * @param lastSeason the last season the club played in
     * @param url the URL for the club's details
     */
    public Clubs(Integer clubId, String clubCode, String name, Competitions domesticCompetition, String totalMarketValue, Integer squadSize, BigDecimal averageAge, Integer foreignersNumber, BigDecimal foreignersPercentage, Integer nationalTeamPlayers, String stadiumName, Integer stadiumSeats, String netTransferRecord, String coachName, Integer lastSeason, String url) {
        this.clubId = clubId;
        this.clubCode = clubCode;
        this.name = name;
        this.domesticCompetition = domesticCompetition;
        this.totalMarketValue = totalMarketValue;
        this.squadSize = squadSize;
        this.averageAge = averageAge;
        this.foreignersNumber = foreignersNumber;
        this.foreignersPercentage = foreignersPercentage;
        this.nationalTeamPlayers = nationalTeamPlayers;
        this.stadiumName = stadiumName;
        this.stadiumSeats = stadiumSeats;
        this.netTransferRecord = netTransferRecord;
        this.coachName = coachName;
        this.lastSeason = lastSeason;
        this.url = url;
    }

    // Getters and Setters

    /**
     * Gets the unique ID of the club.
     *
     * @return the club ID
     */
    public Integer getClubId() { return clubId; }

    /**
     * Sets the unique ID of the club.
     *
     * @param clubId the club ID
     */
    public void setClubId(Integer clubId) { this.clubId = clubId; }

    /**
     * Gets the code of the club.
     *
     * @return the club code
     */
    public String getClubCode() { return clubCode; }

    /**
     * Sets the code of the club.
     *
     * @param clubCode the club code
     */
    public void setClubCode(String clubCode) { this.clubCode = clubCode; }

    /**
     * Gets the name of the club.
     *
     * @return the name of the club
     */
    public String getName() { return name; }

    /**
     * Sets the name of the club.
     *
     * @param name the name of the club
     */
    public void setName(String name) { this.name = name; }

    /**
     * Gets the domestic competition the club is part of.
     *
     * @return the domestic competition
     */
    public Competitions getDomesticCompetition() { return domesticCompetition; }

    /**
     * Sets the domestic competition the club is part of.
     *
     * @param domesticCompetition the domestic competition
     */
    public void setDomesticCompetition(Competitions domesticCompetition) { this.domesticCompetition = domesticCompetition; }

    /**
     * Gets the total market value of the club.
     *
     * @return the total market value
     */
    public String getTotalMarketValue() { return totalMarketValue; }

    /**
     * Sets the total market value of the club.
     *
     * @param totalMarketValue the total market value
     */
    public void setTotalMarketValue(String totalMarketValue) { this.totalMarketValue = totalMarketValue; }

    /**
     * Gets the size of the club's squad.
     *
     * @return the squad size
     */
    public Integer getSquadSize() { return squadSize; }

    /**
     * Sets the size of the club's squad.
     *
     * @param squadSize the squad size
     */
    public void setSquadSize(Integer squadSize) { this.squadSize = squadSize; }

    /**
     * Gets the average age of the club's squad.
     *
     * @return the average age
     */
    public BigDecimal getAverageAge() { return averageAge; }

    /**
     * Sets the average age of the club's squad.
     *
     * @param averageAge the average age
     */
    public void setAverageAge(BigDecimal averageAge) { this.averageAge = averageAge; }

    /**
     * Gets the number of foreign players in the club.
     *
     * @return the number of foreign players
     */
    public Integer getForeignersNumber() { return foreignersNumber; }

    /**
     * Sets the number of foreign players in the club.
     *
     * @param foreignersNumber the number of foreign players
     */
    public void setForeignersNumber(Integer foreignersNumber) { this.foreignersNumber = foreignersNumber; }

    /**
     * Gets the percentage of foreign players in the club.
     *
     * @return the percentage of foreign players
     */
    public BigDecimal getForeignersPercentage() { return foreignersPercentage; }

    /**
     * Sets the percentage of foreign players in the club.
     *
     * @param foreignersPercentage the percentage of foreign players
     */
    public void setForeignersPercentage(BigDecimal foreignersPercentage) { this.foreignersPercentage = foreignersPercentage; }

    /**
     * Gets the number of national team players in the club.
     *
     * @return the number of national team players
     */
    public Integer getNationalTeamPlayers() { return nationalTeamPlayers; }

    /**
     * Sets the number of national team players in the club.
     *
     * @param nationalTeamPlayers the number of national team players
     */
    public void setNationalTeamPlayers(Integer nationalTeamPlayers) { this.nationalTeamPlayers = nationalTeamPlayers; }

    /**
     * Gets the name of the club's stadium.
     *
     * @return the stadium name
     */
    public String getStadiumName() { return stadiumName; }

    /**
     * Sets the name of the club's stadium.
     *
     * @param stadiumName the stadium name
     */
    public void setStadiumName(String stadiumName) { this.stadiumName = stadiumName; }

    /**
     * Gets the number of seats in the club's stadium.
     *
     * @return the number of stadium seats
     */
    public Integer getStadiumSeats() { return stadiumSeats; }

    /**
     * Sets the number of seats in the club's stadium.
     *
     * @param stadiumSeats the number of stadium seats
     */
    public void setStadiumSeats(Integer stadiumSeats) { this.stadiumSeats = stadiumSeats; }

    /**
     * Gets the net transfer record of the club.
     *
     * @return the net transfer record
     */
    public String getNetTransferRecord() { return netTransferRecord; }

    /**
     * Sets the net transfer record of the club.
     *
     * @param netTransferRecord the net transfer record
     */
    public void setNetTransferRecord(String netTransferRecord) { this.netTransferRecord = netTransferRecord; }

    /**
     * Gets the name of the club's coach.
     *
     * @return the coach name
     */
    public String getCoachName() { return coachName; }

    /**
     * Sets the name of the club's coach.
     *
     * @param coachName the coach name
     */
    public void setCoachName(String coachName) { this.coachName = coachName; }

    /**
     * Gets the last season the club played in.
     *
     * @return the last season
     */
    public Integer getLastSeason() { return lastSeason; }

    /**
     * Sets the last season the club played in.
     *
     * @param lastSeason the last season
     */
    public void setLastSeason(Integer lastSeason) { this.lastSeason = lastSeason; }

    /**
     * Gets the URL for the club's details.
     *
     * @return the URL
     */
    public String getUrl() { return url; }

    /**
     * Sets the URL for the club's details.
     *
     * @param url the URL
     */
    public void setUrl(String url) { this.url = url; }
}
