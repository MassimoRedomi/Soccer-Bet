package com.iumtweb.spring_server.nations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NationsService {

    @Autowired
    private NationsRepository nationsRepository;

    public List<SoccerNations> getSoccerNations() {
        return nationsRepository.findAllSoccerNations();
    }
}
