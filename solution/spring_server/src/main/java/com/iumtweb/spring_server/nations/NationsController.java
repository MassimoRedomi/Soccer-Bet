package com.iumtweb.spring_server.nations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class NationsController {

    @Autowired
    private NationsService nationsService;

    @GetMapping("/soccer-nations")
    public List<SoccerNations> getAllSoccerNations() {
        return nationsService.getSoccerNations();
    }
}
