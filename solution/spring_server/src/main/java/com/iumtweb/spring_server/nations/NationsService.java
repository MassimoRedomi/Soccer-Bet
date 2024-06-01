package com.iumtweb.spring_server.nations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Service class for managing nations.
 * Provides methods to interact with the Nations repository.
 */
@Service
public class NationsService {

    @Autowired
    private NationsRepository nationsRepository;

    /**
     * Retrieves a list of soccer nations.
     *
     * @return a list of SoccerNations, each containing the name and sig of a nation
     */
    public List<SoccerNations> getSoccerNations() {
        return nationsRepository.findAllSoccerNations();
    }
}
