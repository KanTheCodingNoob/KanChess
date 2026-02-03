package com.kan.kanchess.game.websocket;

import com.kan.kanchess.auth.service.JwtService;
import com.kan.kanchess.auth.service.MyUserDetailService;
import org.jspecify.annotations.Nullable;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

@Component
public class JwtHandshakeInterceptor implements HandshakeInterceptor {
	private final JwtService jwtService;
	private final MyUserDetailService userDetailsService;

	public JwtHandshakeInterceptor(JwtService jwtService,
	                               MyUserDetailService userDetailsService) {
		this.jwtService = jwtService;
		this.userDetailsService = userDetailsService;
	}

	@Override
	public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
		String query = request.getURI().getQuery(); // token=xxx
		if (query == null || !query.startsWith("token=")) return false;

		String token = query.substring(6);
		try {
			String username = jwtService.extractUsername(token);

			if (username == null) return false;

			UserDetails userDetails =
					userDetailsService.loadUserByUsername(username);

			if (jwtService.isTokenValid(token, userDetails)) {
				attributes.put("user", userDetails);
				return true;
			}
		} catch (Exception e) {
			// Log error if needed: System.err.println("JWT Validation failed: " + e.getMessage());
			return false;
		}

		return false;
	}

	@Override
	public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, @Nullable Exception exception) {

	}
}
