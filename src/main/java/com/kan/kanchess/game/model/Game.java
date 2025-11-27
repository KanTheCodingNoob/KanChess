package com.kan.kanchess.game.model;

import com.github.bhlangonijr.chesslib.Board;
import com.github.bhlangonijr.chesslib.Square;
import com.github.bhlangonijr.chesslib.move.Move;
import com.github.bhlangonijr.chesslib.move.MoveList;
import org.springframework.web.socket.TextMessage;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.node.ObjectNode;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class Game {
	public final Player player1;
	public final Player player2;
	private final Board board;
	private final MoveList moves;
	private LocalDateTime startTime;

	private final ObjectMapper mapper;

	public Game(Player player1, Player player2, ObjectMapper mapper) {
		this.player1 = player1;
		this.player2 = player2;
		this.board = new Board();
		this.moves = new MoveList();
		this.startTime = LocalDateTime.now();
		this.mapper = mapper;

		Map<String, Object> payload1 = new HashMap<>();
		payload1.put("type", MessageType.INIT_GAME);
		payload1.put("color", "white");
		try {
			player1.socket.sendMessage(new TextMessage(mapper.writeValueAsString(payload1)));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

		Map<String, Object> payload2 = new HashMap<>();
		payload2.put("type", MessageType.INIT_GAME);
		payload2.put("color", "black");

		try {
			player2.socket.sendMessage(new TextMessage(mapper.writeValueAsString(payload2)));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public void makeMove(Player player, MoveDetail moveDetail) {
		System.out.println(0);
		// Validate if it is the player turn or not
		boolean whiteToMove = (this.moves.size() % 2 == 0);
		System.out.println(whiteToMove);
		if (whiteToMove && !player.socket.equals(this.player1.socket)) {
			System.out.println(1);
			return;
		}

		if (!whiteToMove && !player.socket.equals(this.player2.socket)) {
			System.out.println(2);
			return;
		}

		System.out.println(moveDetail.toString());

		Move legalMove = board.legalMoves().stream()
				.filter(m -> m.getFrom().value().equals(moveDetail.from().toUpperCase()) &&
						m.getTo().value().equals(moveDetail.to().toUpperCase()))
				.findFirst()
				.orElse(null);

		if (legalMove == null) {
			System.out.println(3);
			return;
		}

		board.doMove(legalMove);
		this.moves.add(legalMove);

		// Check if game is over
		if (this.board.isMated()) {
			ObjectNode node = mapper.createObjectNode();
			node.put("type", MessageType.GAME_OVER);
			node.put("winner", whiteToMove ? "black" : "white");

			String jsonMessage = mapper.writeValueAsString(node);

			try {
				this.player1.socket.sendMessage(new TextMessage(jsonMessage));
			} catch (IOException e) {
				throw new RuntimeException(e);
			}

			try {
				this.player1.socket.sendMessage(new TextMessage(jsonMessage));
			} catch (IOException e) {
				throw new RuntimeException(e);
			}

			return;
		}

		String moveInJson = mapper.writeValueAsString(moveDetail); // Convert move to json
		// Add a new field type to the json content
		ObjectNode node = (ObjectNode) mapper.readTree(moveInJson);
		node.put("type", MessageType.MOVE);
		String updatedJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(node);

		if (this.moves.size() % 2 == 0) {
			try {
				this.player1.socket.sendMessage(new TextMessage(updatedJson));
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		} else {
			try {
				this.player2.socket.sendMessage(new TextMessage(updatedJson));
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
	}
}
