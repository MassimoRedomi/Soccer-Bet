package com.iumtweb.spring_server.competitions;

/**
 * Represents a request to get competitions by country name.
 * Contains the country name as a request parameter.
 */
public class CountryRequest {

    private String countryName;

    /**
     * Gets the name of the country.
     *
     * @return the name of the country
     */
    public String getCountryName() {
        return countryName;
    }

    /**
     * Sets the name of the country.
     *
     * @param countryName the name of the country to set
     */
    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }
}
