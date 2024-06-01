package com.iumtweb.spring_server.competitions;

/**
 * Projection interface for Competitions and their corresponding flags.
 * Provides methods to retrieve competition details and the corresponding nation flag.
 */
public interface CompetitionsAndFlags {

    /**
     * Gets the ID of the competition.
     *
     * @return the competition ID
     */
    String getCompetitionId();

    /**
     * Gets the code of the competition.
     *
     * @return the competition code
     */
    String getCompetitionCode();

    /**
     * Gets the name of the competition.
     *
     * @return the name of the competition
     */
    String getName();

    /**
     * Gets the subtype of the competition.
     *
     * @return the subtype of the competition
     */
    String getSubType();

    /**
     * Gets the type of the competition.
     *
     * @return the type of the competition
     */
    String getType();

    /**
     * Gets the ID of the country associated with the competition.
     *
     * @return the country ID
     */
    String getCountryId();

    /**
     * Gets the name of the country associated with the competition.
     *
     * @return the country name
     */
    String getCountryName();

    /**
     * Gets the code of the domestic league associated with the competition.
     *
     * @return the domestic league code
     */
    String getDomesticLeagueCode();

    /**
     * Gets the confederation of the competition.
     *
     * @return the confederation
     */
    String getConfederation();

    /**
     * Gets the URL of the competition.
     *
     * @return the URL
     */
    String getUrl();

    /**
     * Gets the sig of the nation associated with the competition.
     *
     * @return the sig of the nation
     */
    String getSig();
}
