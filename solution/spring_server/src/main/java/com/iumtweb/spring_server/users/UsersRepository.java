package com.iumtweb.spring_server.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for the Users entity.
 * Extends JpaRepository to provide CRUD operations.
 */
@Repository
public interface UsersRepository extends JpaRepository<Users, String> {

    /**
     * Finds a user by their email.
     *
     * @param email the email of the user
     * @return the user entity with the specified email, or null if no user is found
     */
    Users findByEmail(String email);
}
