package com.kan.kanchess.game.dto;

import com.fasterxml.jackson.annotation.JsonValue;

public enum MessageType {
    INIT_GAME("init_game"),
    MOVE("move"),
    ILLEGAL("illegal"),
    GAME_OVER("game_over");

    private final String value;

    MessageType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
