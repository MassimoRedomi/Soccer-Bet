package com.iumtweb.spring_server.clubs;

/**
 * Projection interface for Clubs.
 * Provides methods to retrieve club ID and name.
 */
public interface ClubsNames {

    /**
     * Gets the ID of the club.
     *
     * @return the club ID
     */
    Integer getClubId();

    /**
     * Gets the name of the club.
     *
     * @return the club name
     */
    String getName();
}
