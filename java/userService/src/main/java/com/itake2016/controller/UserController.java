package com.itake2016.controller;

import com.itake2016.domain.User;
import com.itake2016.repository.UserRepository;
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



	@RequestMapping(value = "/register", method = RequestMethod.POST)
	@ResponseBody
	public void register(@ModelAttribute User user, @RequestParam String password) {
		userRepository.save(user);
	}
}
