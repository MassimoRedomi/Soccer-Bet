package com.iumtweb.spring_server.nations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

/**
 * REST controller for managing nations.
 * Provides endpoints to interact with the nations data.
 */
@RestController
public class NationsController {

    @Autowired
    private NationsService nationsService;

    /**
     * Retrieves a list of soccer nations.
     *
     * @return a list of SoccerNations, each containing the name and svg flag of a nation
     */
    @GetMapping("/soccer-nations")
    public List<SoccerNations> getAllSoccerNations() {
        return nationsService.getSoccerNations();
    }
}
