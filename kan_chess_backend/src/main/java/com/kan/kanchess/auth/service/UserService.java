package com.kan.kanchess.auth.service;

import com.kan.kanchess.auth.dto.LoginResponse;
import com.kan.kanchess.auth.dto.RegisterResponse;
import com.kan.kanchess.auth.dto.UserDTO;
import com.kan.kanchess.auth.model.User;
import com.kan.kanchess.auth.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JwtService jwtService;

	public UserService(
			UserRepository userRepository,
			PasswordEncoder passwordEncoder,
			AuthenticationManager authenticationManager,
			JwtService jwtService) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager = authenticationManager;
		this.jwtService = jwtService;
	}

	public ResponseEntity<RegisterResponse> register(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		User saved = userRepository.save(user);
		String token = jwtService.generateToken(saved.getUsername());
		UserDTO dto = new UserDTO(saved.getId(), saved.getUsername());
		return ResponseEntity.ok(new RegisterResponse(token, dto));
	}

	public ResponseEntity<LoginResponse> verify(String username, String password) {
		Authentication authentication =
				authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							username,
							password));

		if(!authentication.isAuthenticated()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		String token = jwtService.generateToken(username);
		User user = userRepository.findByUsername(username).orElse(null);
		UserDTO dto = user != null ? new UserDTO(user.getId(), user.getUsername()) : null;

		return ResponseEntity.ok(new LoginResponse(token, dto));
	}
}
