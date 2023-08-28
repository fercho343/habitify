import http from "http";
import * as mdns from "mdns-js";
import WebSocket from "ws";

const server = http.createServer();
const wss = new WebSocket.Server({ server });

// Crear el anunciador mDNS
const ad = mdns.createAdvertisement(mdns.tcp("myapp"), 3000);

wss.on("connection", (socket) => {
	console.log("Client connected");

	socket.on("message", (message) => {
		console.log("Received:", message);

		// Aquí puedes procesar el mensaje y enviar respuestas si es necesario
		socket.send(`Message received: ${message}`);
	});

	socket.on("close", () => {
		console.log("Client disconnected");
	});
});

const PORT = 3000;

// Anunciar el servicio mDNS
ad.start();

server.listen(PORT, "0.0.0.0", () => {
	console.log(`WebSocket server listening on port ${PORT}`);
});
