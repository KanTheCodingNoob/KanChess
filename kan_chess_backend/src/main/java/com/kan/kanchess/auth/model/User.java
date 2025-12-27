package com.kan.kanchess.auth.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.Instant;

@Table("users")
public class User {
	@Id
	private Long id;

	private String username;
	private String email;
	private String password;
	private Instant joined_at;

	public User() {
	}

	public User
			(String username,
			 String email,
			 String password) {
		this.username = username;
		this.password = password;
		this.email = email;
		this.joined_at = Instant.now();
	}

	public Long getId() {
		return id;
	}

//	public void setId(Long id) {
//		this.id = id;
//	}

	public String getUsername() {
		return username;
	}

//	public void setUsername(String username) {
//		this.username = username;
//	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Instant getJoined_at() {
		return joined_at;
	}

//	public void setCreatedAt(Instant createdAt) {
//		this.createdAt = createdAt;
//	}
}
