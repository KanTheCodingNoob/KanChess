package com.kan.kanchess.auth.dto;

public class RegisterResponse {
	private String accessToken;
	private UserDTO user;

	public RegisterResponse(String accessToken, UserDTO user) {
		this.accessToken = accessToken;
		this.user = user;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}
}
