const port = 5000;
import app from "./index";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./db";
const server = http.createServer(app);

const io = new Server(server, {
    pingTimeout: 120000,
    maxHttpBufferSize: 1e8,
    cors: {
        origin: "*",
        methods: ["GET"],
    },
});

const connections = new Set();

io.on("connection", (socket) => {
    socket.on("AUTHORIZE_ORDER", () => {
        socket.emit("ORDER_AUTHORIZED", { data: "Atualizando pedido..." });
    })

    socket.on("UPDATE_PRODUCT", () => {
        socket.broadcast.emit("PRODUCT_UPDATED", { data: "Deletando produto..." });
    })

    connections.add(socket);
    socket.once("disconnect", () => {
        connections.delete(socket);
    });
});

connectDB().then(() => {
    server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}).catch((error) => console.error("Erro ao se conectar ao DB", error))

