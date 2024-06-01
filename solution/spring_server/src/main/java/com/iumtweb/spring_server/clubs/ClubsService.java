package com.iumtweb.spring_server.clubs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for managing clubs.
 * Provides methods to interact with the Clubs repository.
 */
@Service
public class ClubsService {

    private final ClubsRepository clubsRepository;

    /**
     * Constructor for ClubsService.
     *
     * @param clubsRepository the repository to be used for interacting with the database
     */
    @Autowired
    public ClubsService(ClubsRepository clubsRepository) {
        this.clubsRepository = clubsRepository;
    }

    /**
     * Retrieves all club names.
     *
     * @return a list of ClubsNames, each containing the name of a club
     */
    public List<ClubsNames> getClubNames() {
        return clubsRepository.findAllClubNames();
    }

    /**
     * Retrieves a club by its ID.
     *
     * @param clubId the ID of the club
     * @return the club with the specified ID, or null if not found
     */
    public Clubs getClubById(Integer clubId) {
        return clubsRepository.findById(clubId).orElse(null);
    }
}
