Known issue:
- Every time the server receive a JWT token, it queries the DB everytime,
slowing down performance
- No way to forfeit aside from exit the browser
- Should notify the user when a websocket connection failed