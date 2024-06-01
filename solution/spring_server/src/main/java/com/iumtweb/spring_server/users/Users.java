package com.iumtweb.spring_server.users;

import jakarta.persistence.*;

/**
 * Represents a User entity.
 * This class is mapped to the 'users' table in the database.
 */
@Entity
@Table(name = "users")
public class Users {

    /**
     * The email of the user. Serves as the primary key.
     */
    @Id
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    /**
     * The password of the user.
     */
    @Column(name = "password", nullable = false, length = 60)
    private String password;

    /**
     * Default constructor.
     * Needed by JPA.
     */
    public Users() {
    }

    /**
     * Constructor with parameters.
     *
     * @param email the email of the user
     * @param password the password of the user
     */
    public Users(String email, String password) {
        this.email = email;
        this.password = password;
    }

    /**
     * Gets the email of the user.
     *
     * @return the email of the user
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the email of the user.
     *
     * @param email the email of the user
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Gets the password of the user.
     *
     * @return the password of the user
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the password of the user.
     *
     * @param password the password of the user
     */
    public void setPassword(String password) {
        this.password = password;
    }
}
