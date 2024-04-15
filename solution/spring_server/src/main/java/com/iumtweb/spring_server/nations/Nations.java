package com.iumtweb.spring_server.nations;
import jakarta.persistence.*;

@Entity
@Table(name = "nations")
public class Nations {

    @Id
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "sig", columnDefinition = "TEXT")
    private String sig;

    // Default constructor
    public Nations() {
    }

    // Constructor with parameters
    public Nations(String name, String sig) {
        this.name = name;
        this.sig = sig;
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSig() {
        return sig;
    }

    public void setSig(String sig) {
        this.sig = sig;
    }
}
