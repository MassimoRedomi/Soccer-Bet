package com.iumtweb.spring_server.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for managing users.
 * Provides methods to interact with the Users repository.
 */
@Service
public class UsersService {

    private final UsersRepository userRepository;

    /**
     * Constructor for UsersService.
     *
     * @param userRepository the repository to be used for interacting with the database
     */
    @Autowired
    public UsersService(UsersRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Saves a user to the database.
     *
     * @param user the user entity to be saved
     * @return the saved user entity
     */
    public Users saveUser(Users user) {
        return userRepository.save(user);
    }

    /**
     * Finds the password of a user by their email.
     *
     * @param email the email of the user
     * @return the password of the user, or null if no user is found
     */
    public String findPasswordByEmail(String email) {
        Users user = userRepository.findByEmail(email);
        return user != null ? user.getPassword() : null;
    }
}
