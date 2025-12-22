package com.kan.kanchess.game.service;

import com.kan.kanchess.game.model.Game;
import com.kan.kanchess.game.model.MessageContent;
import com.kan.kanchess.game.model.MessageType;
import com.kan.kanchess.game.model.Player;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import tools.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GameManager {
	private final List<Game> games;
	private Player pendingPlayer;
	private final Map<String, Player> players;
	private final ObjectMapper mapper;

	public GameManager(ObjectMapper mapper) {
		this.games = new ArrayList<>();
		this.pendingPlayer = null;
		this.players = new HashMap<>();
		this.mapper = mapper;
	}

	public void addUser(WebSocketSession socket, TextMessage message) {
		Player player = new Player(socket);
		this.players.put(socket.getId(), player);
		this.handleMessages(player, message);
	}

	public void removeUser(WebSocketSession socket) {
		players.remove(socket.getId());
	}

	private void handleMessages(Player player, TextMessage message) {
		String jsonContent = message.getPayload();
		System.out.println(jsonContent);
		MessageContent content = mapper.readValue(jsonContent, MessageContent.class);
		// Starting a game logic
		if (MessageType.INIT_GAME.equals(content.type())) {
			if (this.pendingPlayer != null) {
				Game game = new Game(this.pendingPlayer, player, this.mapper);
				games.add(game);
				this.pendingPlayer = null;
			} else {
				this.pendingPlayer = player;
			}
		}

		// Move making logic
		if (MessageType.MOVE.equals(content.type())) {
			games.stream()
					.filter(g -> g.player1.socket.equals(player.socket) || g.player2.socket.equals(player.socket))
					.findFirst().ifPresent(game -> game.makeMove(player, content));

		}
	}
}
