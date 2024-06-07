package com.iumtweb.spring_server.playersStat;

import com.iumtweb.spring_server.clubs.Clubs;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "players_stat")
public class PlayersStat {

    @Id
    @Column(name = "player_id")
    private Integer playerId;

    @Column(name = "name")
    private String name;

    @Column(name = "yellow_cards")
    private Integer yellowCards;

    @Column(name = "red_cards")
    private Integer redCards;

    @Column(name = "goals")
    private Integer goals;

    @Column(name = "assists")
    private Integer assists;

    @Column(name = "minutes_played")
    private Integer minutesPlayed;

    @ManyToOne
    @JoinColumn(name = "current_club_id", referencedColumnName = "club_id")
    private Clubs currentClub;


    @Column(name = "country_of_birth")
    private String countryOfBirth;

    @Column(name = "city_of_birth")
    private String cityOfBirth;

    @Column(name = "country_of_citizenship")
    private String countryOfCitizenship;

    @Column(name = "date_of_birth")
    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;

    @Column(name = "foot")
    private String foot;

    @Column(name = "height_in_cm")
    private Integer heightInCm;

    @Column(name = "highest_market_value_in_eur")
    private Integer highestMarketValueInEur;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "url")
    private String url;

    @Column(name = "partite")
    private Integer partite;

    @Column(name = "age")
    private Integer age;

    public PlayersStat() {
    }

    // Getters and Setters
    public Integer getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Integer playerId) {
        this.playerId = playerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getYellowCards() {
        return yellowCards;
    }

    public void setYellowCards(Integer yellowCards) {
        this.yellowCards = yellowCards;
    }

    public Integer getRedCards() {
        return redCards;
    }

    public void setRedCards(Integer redCards) {
        this.redCards = redCards;
    }

    public Integer getGoals() {
        return goals;
    }

    public void setGoals(Integer goals) {
        this.goals = goals;
    }

    public Integer getAssists() {
        return assists;
    }

    public void setAssists(Integer assists) {
        this.assists = assists;
    }

    public Integer getMinutesPlayed() {
        return minutesPlayed;
    }

    public void setMinutesPlayed(Integer minutesPlayed) {
        this.minutesPlayed = minutesPlayed;
    }

    public Clubs getCurrentClub() {
        return currentClub;
    }

    public void setCurrentClub(Clubs currentClubId) {
        this.currentClub = currentClubId;
    }

    public String getCountryOfBirth() {
        return countryOfBirth;
    }

    public void setCountryOfBirth(String countryOfBirth) {
        this.countryOfBirth = countryOfBirth;
    }

    public String getCityOfBirth() {
        return cityOfBirth;
    }

    public void setCityOfBirth(String cityOfBirth) {
        this.cityOfBirth = cityOfBirth;
    }

    public String getCountryOfCitizenship() {
        return countryOfCitizenship;
    }

    public void setCountryOfCitizenship(String countryOfCitizenship) {
        this.countryOfCitizenship = countryOfCitizenship;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getFoot() {
        return foot;
    }

    public void setFoot(String foot) {
        this.foot = foot;
    }

    public Integer getHeightInCm() {
        return heightInCm;
    }

    public void setHeightInCm(Integer heightInCm) {
        this.heightInCm = heightInCm;
    }

    public Integer getHighestMarketValueInEur() {
        return highestMarketValueInEur;
    }

    public void setHighestMarketValueInEur(Integer highestMarketValueInEur) {
        this.highestMarketValueInEur = highestMarketValueInEur;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getPartite() {
        return partite;
    }

    public void setPartite(Integer partite) {
        this.partite = partite;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
