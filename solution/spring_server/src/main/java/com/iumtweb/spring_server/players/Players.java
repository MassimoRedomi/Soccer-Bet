package com.iumtweb.spring_server.players;

import com.iumtweb.spring_server.clubs.Clubs;
import com.iumtweb.spring_server.competitions.Competitions;
import jakarta.persistence.*;

import java.util.Date;

/**
 * Represents a Player entity.
 * This class is mapped to the 'players' table in the database.
 */
@Entity
@Table(name = "players")
public class Players {

    /**
     * The unique ID of the player.
     */
    @Id
    @Column(name = "player_id")
    private Integer playerId;

    /**
     * The first name of the player.
     */
    @Column(name = "first_name")
    private String firstName;

    /**
     * The last name of the player.
     */
    @Column(name = "last_name")
    private String lastName;

    /**
     * The full name of the player.
     */
    @Column(name = "name")
    private String name;

    /**
     * The last season the player played in.
     */
    @Column(name = "last_season")
    private Integer lastSeason;

    /**
     * The current club the player belongs to.
     */
    @ManyToOne
    @JoinColumn(name = "current_club_id", referencedColumnName = "club_id")
    private Clubs currentClubId;

    /**
     * The code of the player.
     */
    @Column(name = "player_code")
    private String playerCode;

    /**
     * The country of birth of the player.
     */
    @Column(name = "country_of_birth")
    private String countryOfBirth;

    /**
     * The city of birth of the player.
     */
    @Column(name = "city_of_birth")
    private String cityOfBirth;

    /**
     * The country of citizenship of the player.
     */
    @Column(name = "country_of_citizenship")
    private String countryOfCitizenship;

    /**
     * The date of birth of the player.
     */
    @Column(name = "date_of_birth")
    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;

    /**
     * The sub-position of the player.
     */
    @Column(name = "sub_position")
    private String subPosition;

    /**
     * The position of the player.
     */
    @Column(name = "position")
    private String position;

    /**
     * The preferred foot of the player.
     */
    @Column(name = "foot")
    private String foot;

    /**
     * The height of the player in centimeters.
     */
    @Column(name = "height_in_cm")
    private Integer heightInCm;

    /**
     * The market value of the player in euros.
     */
    @Column(name = "market_value_in_eur")
    private Integer marketValueInEur;

    /**
     * The highest market value of the player in euros.
     */
    @Column(name = "highest_market_value_in_eur")
    private Integer highestMarketValueInEur;

    /**
     * The contract expiration date of the player.
     */
    @Column(name = "contract_expiration_date")
    @Temporal(TemporalType.DATE)
    private Date contractExpirationDate;

    /**
     * The name of the player's agent.
     */
    @Column(name = "agent_name")
    private String agentName;

    /**
     * The URL of the player's image.
     */
    @Column(name = "image_url")
    private String imageUrl;

    /**
     * The URL for the player's details.
     */
    @Column(name = "url")
    private String url;

    /**
     * The domestic competition of the current club the player belongs to.
     */
    @ManyToOne
    @JoinColumn(name = "current_club_domestic_competition_id", referencedColumnName = "competition_id")
    private Competitions currentClubDomesticCompetitionId;

    /**
     * The name of the current club the player belongs to.
     */
    @Column(name = "current_club_name")
    private String currentClubName;

    /**
     * Default constructor.
     * Needed by JPA.
     */
    public Players() {
    }

    /**
     * Constructor with parameters.
     *
     * @param playerId the unique ID of the player
     * @param firstName the first name of the player
     * @param lastName the last name of the player
     * @param name the full name of the player
     * @param lastSeason the last season the player played in
     * @param currentClubId the current club the player belongs to
     * @param playerCode the code of the player
     * @param countryOfBirth the country of birth of the player
     * @param cityOfBirth the city of birth of the player
     * @param countryOfCitizenship the country of citizenship of the player
     * @param dateOfBirth the date of birth of the player
     * @param subPosition the sub-position of the player
     * @param position the position of the player
     * @param foot the preferred foot of the player
     * @param heightInCm the height of the player in centimeters
     * @param marketValueInEur the market value of the player in euros
     * @param highestMarketValueInEur the highest market value of the player in euros
     * @param contractExpirationDate the contract expiration date of the player
     * @param agentName the name of the player's agent
     * @param imageUrl the URL of the player's image
     * @param url the URL for the player's details
     * @param currentClubDomesticCompetitionId the domestic competition of the current club the player belongs to
     * @param currentClubName the name of the current club the player belongs to
     */
    public Players(Integer playerId, String firstName, String lastName, String name, Integer lastSeason, Clubs currentClubId, String playerCode, String countryOfBirth, String cityOfBirth, String countryOfCitizenship, Date dateOfBirth, String subPosition, String position, String foot, Integer heightInCm, Integer marketValueInEur, Integer highestMarketValueInEur, Date contractExpirationDate, String agentName, String imageUrl, String url, Competitions currentClubDomesticCompetitionId, String currentClubName) {
        this.playerId = playerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.name = name;
        this.lastSeason = lastSeason;
        this.currentClubId = currentClubId;
        this.playerCode = playerCode;
        this.countryOfBirth = countryOfBirth;
        this.cityOfBirth = cityOfBirth;
        this.countryOfCitizenship = countryOfCitizenship;
        this.dateOfBirth = dateOfBirth;
        this.subPosition = subPosition;
        this.position = position;
        this.foot = foot;
        this.heightInCm = heightInCm;
        this.marketValueInEur = marketValueInEur;
        this.highestMarketValueInEur = highestMarketValueInEur;
        this.contractExpirationDate = contractExpirationDate;
        this.agentName = agentName;
        this.imageUrl = imageUrl;
        this.url = url;
        this.currentClubDomesticCompetitionId = currentClubDomesticCompetitionId;
        this.currentClubName = currentClubName;
    }

    // Getters and Setters

    /**
     * Gets the unique ID of the player.
     *
     * @return the player ID
     */
    public Integer getPlayerId() { return playerId; }

    /**
     * Sets the unique ID of the player.
     *
     * @param playerId the player ID
     */
    public void setPlayerId(Integer playerId) { this.playerId = playerId; }

    /**
     * Gets the first name of the player.
     *
     * @return the first name of the player
     */
    public String getFirstName() { return firstName; }

    /**
     * Sets the first name of the player.
     *
     * @param firstName the first name of the player
     */
    public void setFirstName(String firstName) { this.firstName = firstName; }

    /**
     * Gets the last name of the player.
     *
     * @return the last name of the player
     */
    public String getLastName() { return lastName; }

    /**
     * Sets the last name of the player.
     *
     * @param lastName the last name of the player
     */
    public void setLastName(String lastName) { this.lastName = lastName; }

    /**
     * Gets the full name of the player.
     *
     * @return the full name of the player
     */
    public String getName() { return name; }

    /**
     * Sets the full name of the player.
     *
     * @param name the full name of the player
     */
    public void setName(String name) { this.name = name; }

    /**
     * Gets the last season the player played in.
     *
     * @return the last season
     */
    public Integer getLastSeason() { return lastSeason; }

    /**
     * Sets the last season the player played in.
     *
     * @param lastSeason the last season
     */
    public void setLastSeason(Integer lastSeason) { this.lastSeason = lastSeason; }

    /**
     * Gets the current club the player belongs to.
     *
     * @return the current club
     */
    public Clubs getCurrentClubId() { return currentClubId; }

    /**
     * Sets the current club the player belongs to.
     *
     * @param currentClubId the current club
     */
    public void setCurrentClubId(Clubs currentClubId) { this.currentClubId = currentClubId; }

    /**
     * Gets the code of the player.
     *
     * @return the player code
     */
    public String getPlayerCode() { return playerCode; }

    /**
     * Sets the code of the player.
     *
     * @param playerCode the player code
     */
    public void setPlayerCode(String playerCode) { this.playerCode = playerCode; }

    /**
     * Gets the country of birth of the player.
     *
     * @return the country of birth
     */
    public String getCountryOfBirth() { return countryOfBirth; }

    /**
     * Sets the country of birth of the player.
     *
     * @param countryOfBirth the country of birth
     */
    public void setCountryOfBirth(String countryOfBirth) { this.countryOfBirth = countryOfBirth; }

    /**
     * Gets the city of birth of the player.
     *
     * @return the city of birth
     */
    public String getCityOfBirth() { return cityOfBirth; }

    /**
     * Sets the city of birth of the player.
     *
     * @param cityOfBirth the city of birth
     */
    public void setCityOfBirth(String cityOfBirth) { this.cityOfBirth = cityOfBirth; }

    /**
     * Gets the country of citizenship of the player.
     *
     * @return the country of citizenship
     */
    public String getCountryOfCitizenship() { return countryOfCitizenship; }

    /**
     * Sets the country of citizenship of the player.
     *
     * @param countryOfCitizenship the country of citizenship
     */
    public void setCountryOfCitizenship(String countryOfCitizenship) { this.countryOfCitizenship = countryOfCitizenship; }

    /**
     * Gets the date of birth of the player.
     *
     * @return the date of birth
     */
    public Date getDateOfBirth() { return dateOfBirth; }

    /**
     * Sets the date of birth of the player.
     *
     * @param dateOfBirth the date of birth
     */
    public void setDateOfBirth(Date dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    /**
     * Gets the sub-position of the player.
     *
     * @return the sub-position
     */
    public String getSubPosition() { return subPosition; }

    /**
     * Sets the sub-position of the player.
     *
     * @param subPosition the sub-position
     */
    public void setSubPosition(String subPosition) { this.subPosition = subPosition; }

    /**
     * Gets the position of the player.
     *
     * @return the position
     */
    public String getPosition() { return position; }

    /**
     * Sets the position of the player.
     *
     * @param position the position
     */
    public void setPosition(String position) { this.position = position; }

    /**
     * Gets the preferred foot of the player.
     *
     * @return the preferred foot
     */
    public String getFoot() { return foot; }

    /**
     * Sets the preferred foot of the player.
     *
     * @param foot the preferred foot
     */
    public void setFoot(String foot) { this.foot = foot; }

    /**
     * Gets the height of the player in centimeters.
     *
     * @return the height in centimeters
     */
    public Integer getHeightInCm() { return heightInCm; }

    /**
     * Sets the height of the player in centimeters.
     *
     * @param heightInCm the height in centimeters
     */
    public void setHeightInCm(Integer heightInCm) { this.heightInCm = heightInCm; }

    /**
     * Gets the market value of the player in euros.
     *
     * @return the market value in euros
     */
    public Integer getMarketValueInEur() { return marketValueInEur; }

    /**
     * Sets the market value of the player in euros.
     *
     * @param marketValueInEur the market value in euros
     */
    public void setMarketValueInEur(Integer marketValueInEur) { this.marketValueInEur = marketValueInEur; }

    /**
     * Gets the highest market value of the player in euros.
     *
     * @return the highest market value in euros
     */
    public Integer getHighestMarketValueInEur() { return highestMarketValueInEur; }

    /**
     * Sets the highest market value of the player in euros.
     *
     * @param highestMarketValueInEur the highest market value in euros
     */
    public void setHighestMarketValueInEur(Integer highestMarketValueInEur) { this.highestMarketValueInEur = highestMarketValueInEur; }

    /**
     * Gets the contract expiration date of the player.
     *
     * @return the contract expiration date
     */
    public Date getContractExpirationDate() { return contractExpirationDate; }

    /**
     * Sets the contract expiration date of the player.
     *
     * @param contractExpirationDate the contract expiration date
     */
    public void setContractExpirationDate(Date contractExpirationDate) { this.contractExpirationDate = contractExpirationDate; }

    /**
     * Gets the name of the player's agent.
     *
     * @return the agent name
     */
    public String getAgentName() { return agentName; }

    /**
     * Sets the name of the player's agent.
     *
     * @param agentName the agent name
     */
    public void setAgentName(String agentName) { this.agentName = agentName; }

    /**
     * Gets the URL of the player's image.
     *
     * @return the image URL
     */
    public String getImageUrl() { return imageUrl; }

    /**
     * Sets the URL of the player's image.
     *
     * @param imageUrl the image URL
     */
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    /**
     * Gets the URL for the player's details.
     *
     * @return the URL
     */
    public String getUrl() { return url; }

    /**
     * Sets the URL for the player's details.
     *
     * @param url the URL
     */
    public void setUrl(String url) { this.url = url; }

    /**
     * Gets the domestic competition of the current club the player belongs to.
     *
     * @return the domestic competition
     */
    public Competitions getCurrentClubDomesticCompetitionId() { return currentClubDomesticCompetitionId; }

    /**
     * Sets the domestic competition of the current club the player belongs to.
     *
     * @param currentClubDomesticCompetitionId the domestic competition
     */
    public void setCurrentClubDomesticCompetitionId(Competitions currentClubDomesticCompetitionId) { this.currentClubDomesticCompetitionId = currentClubDomesticCompetitionId; }

    /**
     * Gets the name of the current club the player belongs to.
     *
     * @return the current club name
     */
    public String getCurrentClubName() { return currentClubName; }

    /**
     * Sets the name of the current club the player belongs to.
     *
     * @param currentClubName the current club name
     */
    public void setCurrentClubName(String currentClubName) { this.currentClubName = currentClubName; }
}
