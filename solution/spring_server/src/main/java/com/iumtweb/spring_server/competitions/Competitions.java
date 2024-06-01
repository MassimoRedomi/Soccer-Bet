package com.iumtweb.spring_server.competitions;

import jakarta.persistence.*;

/**
 * Represents a Competition entity.
 * This class is mapped to the 'competitions' table in the database.
 */
@Entity
@Table(name = "competitions")
public class Competitions {

    /**
     * The unique ID of the competition.
     */
    @Id
    @Column(name = "competition_id")
    private String competitionId;

    /**
     * The code of the competition.
     */
    @Column(name = "competition_code")
    private String competitionCode;

    /**
     * The name of the competition.
     */
    @Column(name = "name")
    private String name;

    /**
     * The subtype of the competition.
     */
    @Column(name = "sub_type")
    private String subType;

    /**
     * The type of the competition.
     */
    @Column(name = "type")
    private String type;

    /**
     * The ID of the country associated with the competition.
     */
    @Column(name = "country_id")
    private String countryId;

    /**
     * The name of the country associated with the competition.
     */
    @Column(name = "country_name")
    private String countryName;

    /**
     * The code of the domestic league associated with the competition.
     */
    @Column(name = "domestic_league_code")
    private String domesticLeagueCode;

    /**
     * The confederation of the competition.
     */
    @Column(name = "confederation")
    private String confederation;

    /**
     * The URL of the competition.
     */
    @Column(name = "url")
    private String url;

    /**
     * Default constructor.
     * Needed by JPA.
     */
    public Competitions() {
    }

    /**
     * Constructor with parameters.
     *
     * @param competitionId the unique ID of the competition
     * @param competitionCode the code of the competition
     * @param name the name of the competition
     * @param subType the subtype of the competition
     * @param type the type of the competition
     * @param countryId the ID of the country associated with the competition
     * @param countryName the name of the country associated with the competition
     * @param domesticLeagueCode the code of the domestic league associated with the competition
     * @param confederation the confederation of the competition
     * @param url the URL of the competition
     */
    public Competitions(String competitionId, String competitionCode, String name, String subType, String type, String countryId, String countryName, String domesticLeagueCode, String confederation, String url) {
        this.competitionId = competitionId;
        this.competitionCode = competitionCode;
        this.name = name;
        this.subType = subType;
        this.type = type;
        this.countryId = countryId;
        this.countryName = countryName;
        this.domesticLeagueCode = domesticLeagueCode;
        this.confederation = confederation;
        this.url = url;
    }

    // Getters and Setters

    /**
     * Gets the unique ID of the competition.
     *
     * @return the competition ID
     */
    public String getCompetitionId() { return competitionId; }

    /**
     * Sets the unique ID of the competition.
     *
     * @param competitionId the competition ID
     */
    public void setCompetitionId(String competitionId) { this.competitionId = competitionId; }

    /**
     * Gets the code of the competition.
     *
     * @return the competition code
     */
    public String getCompetitionCode() { return competitionCode; }

    /**
     * Sets the code of the competition.
     *
     * @param competitionCode the competition code
     */
    public void setCompetitionCode(String competitionCode) { this.competitionCode = competitionCode; }

    /**
     * Gets the name of the competition.
     *
     * @return the name of the competition
     */
    public String getName() { return name; }

    /**
     * Sets the name of the competition.
     *
     * @param name the name of the competition
     */
    public void setName(String name) { this.name = name; }

    /**
     * Gets the subtype of the competition.
     *
     * @return the subtype of the competition
     */
    public String getSubType() { return subType; }

    /**
     * Sets the subtype of the competition.
     *
     * @param subType the subtype of the competition
     */
    public void setSubType(String subType) { this.subType = subType; }

    /**
     * Gets the type of the competition.
     *
     * @return the type of the competition
     */
    public String getType() { return type; }

    /**
     * Sets the type of the competition.
     *
     * @param type the type of the competition
     */
    public void setType(String type) { this.type = type; }

    /**
     * Gets the ID of the country associated with the competition.
     *
     * @return the country ID
     */
    public String getCountryId() { return countryId; }

    /**
     * Sets the ID of the country associated with the competition.
     *
     * @param countryId the country ID
     */
    public void setCountryId(String countryId) { this.countryId = countryId; }

    /**
     * Gets the name of the country associated with the competition.
     *
     * @return the country name
     */
    public String getCountryName() { return countryName; }

    /**
     * Sets the name of the country associated with the competition.
     *
     * @param countryName the country name
     */
    public void setCountryName(String countryName) { this.countryName = countryName; }

    /**
     * Gets the code of the domestic league associated with the competition.
     *
     * @return the domestic league code
     */
    public String getDomesticLeagueCode() { return domesticLeagueCode; }

    /**
     * Sets the code of the domestic league associated with the competition.
     *
     * @param domesticLeagueCode the domestic league code
     */
    public void setDomesticLeagueCode(String domesticLeagueCode) { this.domesticLeagueCode = domesticLeagueCode; }

    /**
     * Gets the confederation of the competition.
     *
     * @return the confederation
     */
    public String getConfederation() { return confederation; }

    /**
     * Sets the confederation of the competition.
     *
     * @param confederation the confederation
     */
    public void setConfederation(String confederation) { this.confederation = confederation; }

    /**
     * Gets the URL of the competition.
     *
     * @return the URL
     */
    public String getUrl() { return url; }

    /**
     * Sets the URL of the competition.
     *
     * @param url the URL
     */
    public void setUrl(String url) { this.url = url; }
}
