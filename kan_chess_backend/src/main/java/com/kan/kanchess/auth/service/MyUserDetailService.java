package com.kan.kanchess.auth.service;

import com.kan.kanchess.auth.model.User;
import com.kan.kanchess.auth.model.UserPrincipal;
import com.kan.kanchess.auth.repository.UserRepository;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailService implements UserDetailsService {

	private final UserRepository userRepo;

	public MyUserDetailService(UserRepository userRepository) {
		this.userRepo = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(@NonNull String username) throws UsernameNotFoundException {
		User user = userRepo
				.findByUsername(username)
				.orElseThrow(() ->
						new UsernameNotFoundException("User not found"));

		return new UserPrincipal(user);
	}
}
