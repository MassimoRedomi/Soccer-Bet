package com.iumtweb.spring_server.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

/**
 * REST controller for managing users.
 * Provides endpoints to interact with user data.
 */
@RestController
public class UsersController {

    private static final Logger logger = LoggerFactory.getLogger(UsersController.class);
    private final UsersService userService;

    /**
     * Constructor for UsersController.
     *
     * @param userService the service to be used for interacting with user data
     */
    @Autowired
    public UsersController(UsersService userService) {
        this.userService = userService;
    }

    /**
     * Saves a user to the database.
     *
     * @param user the user entity to be saved
     * @return a ResponseEntity containing the saved user entity
     */
    @PostMapping("/save-user")
    public ResponseEntity<Users> createUser(@RequestBody Users user) {
        Users savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    /**
     * Retrieves the password of a user by their email.
     *
     * @param request the UserRequest containing the email of the user
     * @return a ResponseEntity containing the password if found, or a not found status if the user is not found
     */
    @PostMapping("/get-user")
    public ResponseEntity<Map<String, String>> getUserPassword(@RequestBody UserRequest request) {
        String email = request.getUserMail();
        String password = userService.findPasswordByEmail(email);
        logger.info("Password retrieval for {}: {}", email, password != null ? "found" : "not found");
        if (password != null) {
            Map<String, String> result = new HashMap<>();
            result.put("password", password);
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
