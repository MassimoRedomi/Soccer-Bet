package com.iumtweb.spring_server.nations;

/**
 * Projection interface for Soccer Nations.
 * Provides methods to retrieve the name and sig of a nation.
 */
public interface SoccerNations {

    /**
     * Gets the name of the nation.
     * This value comes from the Competitions entity.
     *
     * @return the name of the nation
     */
    String getName();

    /**
     * Gets the sig of the nation.
     * This value comes from the Nations entity.
     *
     * @return the sig of the nation
     */
    String getSig();
}
