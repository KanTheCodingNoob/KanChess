package com.kan.kanchess.game.model;

import org.springframework.web.socket.WebSocketSession;

public class Player {
	public final WebSocketSession socket;

	public Player(WebSocketSession socket) {
		this.socket = socket;
	}
}
