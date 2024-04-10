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

    public List<Clubs> getFirst10Clubs(){
        return clubsRepository.findTop10ByOrderByClubIdAsc();
    }
}
