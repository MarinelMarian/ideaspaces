package com.itake2016.controller;

import com.itake2016.domain.User;
import com.itake2016.repository.UserRepository;
import com.lambdaworks.crypto.SCryptUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/user")
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	UserRepository userRepository;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public User login(@RequestParam String email, @RequestParam String password) {
        User user = userRepository.findByEmail(email);
        boolean validPassword = SCryptUtil.check(password, user.getPasswordHash());
        if (validPassword) return user;
        throw new RuntimeException("Could not perform login");
    }

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	@ResponseBody
	public User register(@ModelAttribute User user, @RequestParam String password) {
        String passwordHash = SCryptUtil.scrypt(password, 16, 16, 16);
        user.setPasswordHash(passwordHash);
        userRepository.save(user);
        return user;
	}
}
