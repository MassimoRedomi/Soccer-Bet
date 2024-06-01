package com.iumtweb.spring_server.users;

/**
 * Represents a request to get user details by email.
 * Contains the user's email as a request parameter.
 */
public class UserRequest {

    private String userMail;

    /**
     * Gets the email of the user.
     *
     * @return the user's email
     */
    public String getUserMail() {
        return userMail;
    }

    /**
     * Sets the email of the user.
     *
     * @param userMail the user's email to set
     */
    public void setUserMail(String userMail) {
        this.userMail = userMail;
    }
}
