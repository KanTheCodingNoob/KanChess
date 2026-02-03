package com.kan.kanchess.auth.controller;

import com.kan.kanchess.auth.dto.*;
import com.kan.kanchess.auth.model.User;
import com.kan.kanchess.auth.model.UserPrincipal;
import com.kan.kanchess.auth.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {

	private final UserService userService;

	public AuthController(
			UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/register")
	public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registerRequest) {
		User user = new User(registerRequest.getUsername(), registerRequest.getEmail(), registerRequest.getPassword());
		return userService.register(user);
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
		String username = request.getUsername();
		String password = request.getPassword();

		return userService.verify(username, password);
	}

	@GetMapping("/me")
	public UserPrincipal me(@AuthenticationPrincipal UserPrincipal principal) {
		return principal;
	}
}
