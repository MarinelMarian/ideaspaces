package com.itake2016.controller;

import com.itake2016.domain.User;
import com.itake2016.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserRepository userRepository;



	@RequestMapping(value = "/register", method = RequestMethod.POST)
	void register(@ModelAttribute("SpringWeb")User user) {
		userRepository.save(user);
	}
}
