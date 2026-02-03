package com.kan.kanchess.game.model;

import com.kan.kanchess.game.dto.MessageContent;
import com.kan.kanchess.game.dto.MessageType;
import com.github.bhlangonijr.chesslib.Board;
import com.github.bhlangonijr.chesslib.Square;
import com.github.bhlangonijr.chesslib.move.Move;
import com.github.bhlangonijr.chesslib.move.MoveList;
import org.springframework.web.socket.TextMessage;
import tools.jackson.databind.ObjectMapper;

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

		// Send to player 1 game is staring and their color (white)
		MessageContent message1 = new MessageContent(MessageType.INIT_GAME, null, "white", null);
		try {
			player1.socket.sendMessage(new TextMessage(mapper.writeValueAsString(message1)));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

		// Send to player 2 game is staring and their color (black)
		MessageContent message2 = new MessageContent(MessageType.INIT_GAME, null, "black", null);

		try {
			player2.socket.sendMessage(new TextMessage(mapper.writeValueAsString(message2)));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public void makeMove(Player player, MessageContent content) {
		// Validate if it is the player turn or not
		boolean whiteToMove = (this.moves.size() % 2 == 0);
		System.out.println(whiteToMove);
		if (whiteToMove && !player.socket.equals(this.player1.socket)) {
			return;
		}

		if (!whiteToMove && !player.socket.equals(this.player2.socket)) {
			return;
		}

		// Check if the move made is legal or not
		Move legalMove = board.legalMoves().stream()
				.filter(m -> m.getFrom().value().equals(content.move().from().toUpperCase()) &&
						m.getTo().value().equals(content.move().to().toUpperCase()))
				.findFirst()
				.orElse(null);

		// Illegal move
		if (legalMove == null) {
			MessageContent illegalMessage = new MessageContent(MessageType.ILLEGAL, null, null, null);
			try {
				player.socket.sendMessage(new TextMessage(mapper.writeValueAsString(illegalMessage)));
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
			return;
		}

		board.doMove(legalMove);
		this.moves.add(legalMove);

		// Check if game is over
		if (this.board.isMated()) {
			MessageContent gameOverMessage = new MessageContent(
					MessageType.GAME_OVER,
					null,
					null,
					whiteToMove ? "black" : "white"
			);

			try {
				String jsonMessage = mapper.writeValueAsString(gameOverMessage);
				this.player1.socket.sendMessage(new TextMessage(jsonMessage));
				this.player2.socket.sendMessage(new TextMessage(jsonMessage));
			} catch (IOException e) {
				throw new RuntimeException(e);
			}

			return;
		}

		// Send the move to other player
		try {
			String messageToOtherPlayerInJson = mapper.writeValueAsString(content);

			if (this.moves.size() % 2 == 0) {
				this.player1.socket.sendMessage(new TextMessage(messageToOtherPlayerInJson));
			} else {
				this.player2.socket.sendMessage(new TextMessage(messageToOtherPlayerInJson));
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}
