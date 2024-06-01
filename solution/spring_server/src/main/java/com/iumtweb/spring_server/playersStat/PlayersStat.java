package com.iumtweb.spring_server.playersStat;

import com.iumtweb.spring_server.clubs.Clubs;
import jakarta.persistence.*;

import java.util.Date;

/**
 * Represents a PlayerStat entity.
 * This class is mapped to the 'players_stat' table in the database.
 */
@Entity
@Table(name = "players_stat")
public class PlayersStat {

    /**
     * The unique ID of the player.
     */
    @Id
    @Column(name = "player_id")
    private Integer playerId;

    /**
     * The name of the player.
     */
    @Column(name = "name")
    private String name;

    /**
     * The number of yellow cards received by the player.
     */
    @Column(name = "yellow_cards")
    private Integer yellowCards;

    /**
     * The number of red cards received by the player.
     */
    @Column(name = "red_cards")
    private Integer redCards;

    /**
     * The number of goals scored by the player.
     */
    @Column(name = "goals")
    private Integer goals;

    /**
     * The number of assists made by the player.
     */
    @Column(name = "assists")
    private Integer assists;

    /**
     * The number of minutes played by the player.
     */
    @Column(name = "minutes_played")
    private Integer minutesPlayed;

    /**
     * The current club the player belongs to.
     */
    @ManyToOne
    @JoinColumn(name = "current_club_id", referencedColumnName = "club_id")
    private Clubs currentClub;

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
     * The highest market value of the player in euros.
     */
    @Column(name = "highest_market_value_in_eur")
    private Integer highestMarketValueInEur;

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
     * The number of matches played by the player.
     */
    @Column(name = "partite")
    private Integer partite;

    /**
     * The age of the player.
     */
    @Column(name = "age")
    private Integer age;

    /**
     * Default constructor.
     * Needed by JPA.
     */
    public PlayersStat() {
    }

    // Getters and Setters

    /**
     * Gets the unique ID of the player.
     *
     * @return the player ID
     */
    public Integer getPlayerId() {
        return playerId;
    }

    /**
     * Sets the unique ID of the player.
     *
     * @param playerId the player ID
     */
    public void setPlayerId(Integer playerId) {
        this.playerId = playerId;
    }

    /**
     * Gets the name of the player.
     *
     * @return the name of the player
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name of the player.
     *
     * @param name the name of the player
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets the number of yellow cards received by the player.
     *
     * @return the number of yellow cards
     */
    public Integer getYellowCards() {
        return yellowCards;
    }

    /**
     * Sets the number of yellow cards received by the player.
     *
     * @param yellowCards the number of yellow cards
     */
    public void setYellowCards(Integer yellowCards) {
        this.yellowCards = yellowCards;
    }

    /**
     * Gets the number of red cards received by the player.
     *
     * @return the number of red cards
     */
    public Integer getRedCards() {
        return redCards;
    }

    /**
     * Sets the number of red cards received by the player.
     *
     * @param redCards the number of red cards
     */
    public void setRedCards(Integer redCards) {
        this.redCards = redCards;
    }

    /**
     * Gets the number of goals scored by the player.
     *
     * @return the number of goals
     */
    public Integer getGoals() {
        return goals;
    }

    /**
     * Sets the number of goals scored by the player.
     *
     * @param goals the number of goals
     */
    public void setGoals(Integer goals) {
        this.goals = goals;
    }

    /**
     * Gets the number of assists made by the player.
     *
     * @return the number of assists
     */
    public Integer getAssists() {
        return assists;
    }

    /**
     * Sets the number of assists made by the player.
     *
     * @param assists the number of assists
     */
    public void setAssists(Integer assists) {
        this.assists = assists;
    }

    /**
     * Gets the number of minutes played by the player.
     *
     * @return the number of minutes played
     */
    public Integer getMinutesPlayed() {
        return minutesPlayed;
    }

    /**
     * Sets the number of minutes played by the player.
     *
     * @param minutesPlayed the number of minutes played
     */
    public void setMinutesPlayed(Integer minutesPlayed) {
        this.minutesPlayed = minutesPlayed;
    }

    /**
     * Gets the current club the player belongs to.
     *
     * @return the current club
     */
    public Clubs getCurrentClub() {
        return currentClub;
    }

    /**
     * Sets the current club the player belongs to.
     *
     * @param currentClub the current club
     */
    public void setCurrentClub(Clubs currentClub) {
        this.currentClub = currentClub;
    }

    /**
     * Gets the country of birth of the player.
     *
     * @return the country of birth
     */
    public String getCountryOfBirth() {
        return countryOfBirth;
    }

    /**
     * Sets the country of birth of the player.
     *
     * @param countryOfBirth the country of birth
     */
    public void setCountryOfBirth(String countryOfBirth) {
        this.countryOfBirth = countryOfBirth;
    }

    /**
     * Gets the city of birth of the player.
     *
     * @return the city of birth
     */
    public String getCityOfBirth() {
        return cityOfBirth;
    }

    /**
     * Sets the city of birth of the player.
     *
     * @param cityOfBirth the city of birth
     */
    public void setCityOfBirth(String cityOfBirth) {
        this.cityOfBirth = cityOfBirth;
    }

    /**
     * Gets the country of citizenship of the player.
     *
     * @return the country of citizenship
     */
    public String getCountryOfCitizenship() {
        return countryOfCitizenship;
    }

    /**
     * Sets the country of citizenship of the player.
     *
     * @param countryOfCitizenship the country of citizenship
     */
    public void setCountryOfCitizenship(String countryOfCitizenship) {
        this.countryOfCitizenship = countryOfCitizenship;
    }

    /**
     * Gets the date of birth of the player.
     *
     * @return the date of birth
     */
    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    /**
     * Sets the date of birth of the player.
     *
     * @param dateOfBirth the date of birth
     */
    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    /**
     * Gets the preferred foot of the player.
     *
     * @return the preferred foot
     */
    public String getFoot() {
        return foot;
    }

    /**
     * Sets the preferred foot of the player.
     *
     * @param foot the preferred foot
     */
    public void setFoot(String foot) {
        this.foot = foot;
    }

    /**
     * Gets the height of the player in centimeters.
     *
     * @return the height in centimeters
     */
    public Integer getHeightInCm() {
        return heightInCm;
    }

    /**
     * Sets the height of the player in centimeters.
     *
     * @param heightInCm the height in centimeters
     */
    public void setHeightInCm(Integer heightInCm) {
        this.heightInCm = heightInCm;
    }

    /**
     * Gets the highest market value of the player in euros.
     *
     * @return the highest market value in euros
     */
    public Integer getHighestMarketValueInEur() {
        return highestMarketValueInEur;
    }

    /**
     * Sets the highest market value of the player in euros.
     *
     * @param highestMarketValueInEur the highest market value in euros
     */
    public void setHighestMarketValueInEur(Integer highestMarketValueInEur) {
        this.highestMarketValueInEur = highestMarketValueInEur;
    }

    /**
     * Gets the URL of the player's image.
     *
     * @return the image URL
     */
    public String getImageUrl() {
        return imageUrl;
    }

    /**
     * Sets the URL of the player's image.
     *
     * @param imageUrl the image URL
     */
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    /**
     * Gets the URL for the player's details.
     *
     * @return the URL
     */
    public String getUrl() {
        return url;
    }

    /**
     * Sets the URL for the player's details.
     *
     * @param url the URL
     */
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * Gets the number of matches played by the player.
     *
     * @return the number of matches played
     */
    public Integer getPartite() {
        return partite;
    }

    /**
     * Sets the number of matches played by the player.
     *
     * @param partite the number of matches played
     */
    public void setPartite(Integer partite) {
        this.partite = partite;
    }

    /**
     * Gets the age of the player.
     *
     * @return the age of the player
     */
    public Integer getAge() {
        return age;
    }

    /**
     * Sets the age of the player.
     *
     * @param age the age of the player
     */
    public void setAge(Integer age) {
        this.age = age;
    }
}
