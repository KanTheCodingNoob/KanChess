package com.kan.kanchess.auth.dto;

public class LoginResponse {
	private String accessToken;

	public LoginResponse(String accesstoken) {
		this.accessToken = accesstoken;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}
}
