package com.kan.kanchess.game.websocket;

import com.kan.kanchess.game.service.GameManager;
import org.jspecify.annotations.NullMarked;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
@NullMarked
public class ChessWebSocketHandler extends TextWebSocketHandler {
	private final GameManager gameManager;

	public ChessWebSocketHandler(GameManager gameManager) {
		this.gameManager = gameManager;
	}

	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message)
			throws Exception {
		gameManager.addUser(session, message);
		System.out.println("Received: " + message.getPayload());
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Disconnected: " + session.getId() + ", status = " + status);
		gameManager.removeUser(session);
	}
}
