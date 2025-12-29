package com.kan.kanchess.auth.controller;

import com.kan.kanchess.auth.dto.LoginRequest;
import com.kan.kanchess.auth.dto.RegisterRequest;
import com.kan.kanchess.auth.model.User;
import com.kan.kanchess.auth.repository.UserRepository;
import com.kan.kanchess.auth.service.JwtService;
import com.kan.kanchess.auth.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private final UserService userService;
	private final JwtService jwtService;
	private final UserDetailsService userDetailsService;

	public AuthController(
			UserService userService,
			JwtService jwtService,
			UserDetailsService userDetailsService) {
		this.userService = userService;
		this.jwtService = jwtService;
		this.userDetailsService = userDetailsService;
	}

	@PostMapping("/register")
	public User register(@RequestBody RegisterRequest registerRequest) {
		User user = new User(registerRequest.getUsername(), registerRequest.getPassword(), registerRequest.getEmail());
		return userService.register(user);
	}

	@PostMapping("/login")
	public String login(@RequestBody LoginRequest request) {
		String username = request.getUsername();
		String password = request.getPassword();


		return userService.verify(username, password);
	}
}
