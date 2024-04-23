package com.iumtweb.spring_server.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    private final UsersRepository userRepository;

    @Autowired
    public UsersService(UsersRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Users saveUser(Users user) {
        return userRepository.save(user);
    }

    public String findPasswordByEmail(String email) {
        Users user = userRepository.findByEmail(email);
        return user != null ? user.getPassword() : null;
    }
}
