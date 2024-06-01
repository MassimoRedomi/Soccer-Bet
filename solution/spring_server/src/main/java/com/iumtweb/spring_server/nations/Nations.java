package com.iumtweb.spring_server.nations;

import jakarta.persistence.*;

/**
 * Represents a Nation entity.
 * This class is mapped to the 'nations' table in the database. And use name of the nation as primary key and sig (svg flag).
 */
@Entity
@Table(name = "nations")
public class Nations {

    /**
     * The name of the nation.
     * This is the primary key of the table.
     */
    @Id
    @Column(name = "name", nullable = false)
    private String name;

    /**
     * The sig of the nation.
     * This column is defined as TEXT in the database.
     */
    @Column(name = "sig", columnDefinition = "TEXT")
    private String sig;

    /**
     * Default constructor.
     * Needed by JPA.
     */
    public Nations() {
    }

    /**
     * Constructor with parameters.
     *
     * @param name the name of the nation
     * @param sig the svg flag of the nation
     */
    public Nations(String name, String sig) {
        this.name = name;
        this.sig = sig;
    }

    /**
     * Gets the name of the nation.
     *
     * @return the name of the nation
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name of the nation.
     *
     * @param name the name of the nation
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets the svg file of the nation.
     *
     * @return the svg flag of the nation
     */
    public String getSig() {
        return sig;
    }

    /**
     * Sets the svg file of the nation.
     *
     * @param sig the svg file of the nation
     */
    public void setSig(String sig) {
        this.sig = sig;
    }
}
