package com.itake2016.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.itake2016.domain.User;
import com.itake2016.repository.UserRepository;
import com.lambdaworks.crypto.SCryptUtil;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.security.Key;

@Controller
@RequestMapping("/user")
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	UserRepository userRepository;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public String login(@RequestParam String email, @RequestParam String password) throws JsonProcessingException {
        User user = userRepository.findByEmail(email);
        boolean validPassword = SCryptUtil.check(password, user.getPasswordHash());
        if (validPassword) return token(user);
        throw new RuntimeException("Could not perform login");
    }

    private String token(User user) throws JsonProcessingException {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        byte[] apiKeySecretBytes = "my super secret server key".getBytes();
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());
        String subject = new ObjectMapper().writeValueAsString(user);
        String token = Jwts.builder().setSubject(subject).signWith(SignatureAlgorithm.HS512, signingKey).compact();
        return token;
    }

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	@ResponseBody
	public User register(@ModelAttribute User user, @RequestParam String password) {
        String passwordHash = SCryptUtil.scrypt(password, 16, 16, 16);
        user.setPasswordHash(passwordHash);
        userRepository.save(user);
        return user;
	}

    @RequestMapping(value = "/me", method = RequestMethod.POST)
    @ResponseBody
    public User me(@RequestParam String token) throws IOException {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        byte[] apiKeySecretBytes = "my super secret server key".getBytes();
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());
        String subject = Jwts.parser().setSigningKey(signingKey).parseClaimsJws(token).getBody().getSubject();
        User user = new ObjectMapper().readValue(subject, User.class);
        return user;
    }
}
