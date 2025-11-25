package com.kan.kanchess.game;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class ChessWebSocketHandler extends TextWebSocketHandler {
	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message)
			throws Exception {
		System.out.println("Received: " + message.getPayload());

		// Echo back or broadcast
		session.sendMessage(new TextMessage("Server: " + message.getPayload()));
	}
}
