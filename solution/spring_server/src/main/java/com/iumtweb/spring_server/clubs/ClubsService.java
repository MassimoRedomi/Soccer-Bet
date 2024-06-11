package com.iumtweb.spring_server.clubs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubsService {
    private final ClubsRepository clubsRepository;

    @Autowired
    public ClubsService(ClubsRepository clubsRepository) {
        this.clubsRepository = clubsRepository;
    }

    public List<ClubsNames> getClubNames() {
        return clubsRepository.findAllClubNames();
    }

    public Clubs getClubById(Integer clubId) {
        return clubsRepository.findById(clubId).orElse(null);
    }
}
