package com.kan.kanchess.game.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kan.kanchess.game.model.MoveDetail;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record MessageContent(
    MessageType type,
    MoveDetail move,
    String color,
    String winner
) {
}
