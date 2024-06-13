package com.iumtweb.spring_server.players;

import com.iumtweb.spring_server.clubs.Clubs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayersService {
    private final PlayersRepository playersRepository;

    @Autowired
    public PlayersService(PlayersRepository playersRepository) {
        this.playersRepository = playersRepository;
    }

    public List<Players> getFirst10Players(){
        return playersRepository.findTop10ByOrderByPlayerIdAsc();
    }

    public List<Players> getPlayersByClubId(Clubs currentClubId) {
        return playersRepository.findByCurrentClubId(currentClubId);
    }

    public List<Players> getPlayerById(Integer playerId) {
        return playersRepository.findByPlayerId(playerId);
    }
}