package com.iumtweb.spring_server.clubs;

import com.iumtweb.spring_server.competitions.Competitions;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "clubs")
public class Clubs {

    @Id
    @Column(name = "club_id")
    private Integer clubId;

    @Column(name = "club_code")
    private String clubCode;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "domestic_competition_id", referencedColumnName = "competition_id")
    private Competitions domesticCompetition;

    @Column(name = "total_market_value")
    private String totalMarketValue;

    @Column(name = "squad_size")
    private Integer squadSize;

    @Column(name = "average_age")
    private BigDecimal averageAge;

    @Column(name = "foreigners_number")
    private Integer foreignersNumber;

    @Column(name = "foreigners_percentage")
    private BigDecimal foreignersPercentage;

    @Column(name = "national_team_players")
    private Integer nationalTeamPlayers;

    @Column(name = "stadium_name")
    private String stadiumName;

    @Column(name = "stadium_seats")
    private Integer stadiumSeats;

    @Column(name = "net_transfer_record")
    private String netTransferRecord;

    @Column(name = "coach_name")
    private String coachName;

    @Column(name = "last_season")
    private Integer lastSeason;

    @Column(name = "url")
    private String url;

    public Clubs() {
    }

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
    public Integer getClubId() { return clubId; }
    public void setClubId(Integer clubId) { this.clubId = clubId; }

    public String getClubCode() { return clubCode; }
    public void setClubCode(String clubCode) { this.clubCode = clubCode; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Competitions getDomesticCompetition() { return domesticCompetition; }
    public void setDomesticCompetition(Competitions domesticCompetition) { this.domesticCompetition = domesticCompetition; }

    public String getTotalMarketValue() { return totalMarketValue; }
    public void setTotalMarketValue(String totalMarketValue) { this.totalMarketValue = totalMarketValue; }

    public Integer getSquadSize() { return squadSize; }
    public void setSquadSize(Integer squadSize) { this.squadSize = squadSize; }

    public BigDecimal getAverageAge() { return averageAge; }
    public void setAverageAge(BigDecimal averageAge) { this.averageAge = averageAge; }

    public Integer getForeignersNumber() { return foreignersNumber; }
    public void setForeignersNumber(Integer foreignersNumber) { this.foreignersNumber = foreignersNumber; }

    public BigDecimal getForeignersPercentage() { return foreignersPercentage; }
    public void setForeignersPercentage(BigDecimal foreignersPercentage) { this.foreignersPercentage = foreignersPercentage; }

    public Integer getNationalTeamPlayers() { return nationalTeamPlayers; }
    public void setNationalTeamPlayers(Integer nationalTeamPlayers) { this.nationalTeamPlayers = nationalTeamPlayers; }

    public String getStadiumName() { return stadiumName; }
    public void setStadiumName(String stadiumName) { this.stadiumName = stadiumName; }

    public Integer getStadiumSeats() { return stadiumSeats; }
    public void setStadiumSeats(Integer stadiumSeats) { this.stadiumSeats = stadiumSeats; }

    public String getNetTransferRecord() { return netTransferRecord; }
    public void setNetTransferRecord(String netTransferRecord) { this.netTransferRecord = netTransferRecord; }

    public String getCoachName() { return coachName; }
    public void setCoachName(String coachName) { this.coachName = coachName; }

    public Integer getLastSeason() { return lastSeason; }
    public void setLastSeason(Integer lastSeason) { this.lastSeason = lastSeason; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
}