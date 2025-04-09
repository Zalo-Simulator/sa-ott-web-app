export class WebSocketClient {
    private socket: WebSocket;

    constructor(private url: string) {
        this.socket = new WebSocket(this.url);
        this.initialize();
    }

    private initialize() {
        this.socket.addEventListener('open', () => {
            console.log('Connected to WebSocket server');
            this.sendMessage({ type: 'greeting', message: 'Hello Server!' });
        });

        this.socket.addEventListener('message', (event) => {
            console.log('Message from server:', event.data);
        });

        this.socket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
        });

        this.socket.addEventListener('close', (event) => {
            console.log(`WebSocket connection closed:`, event);
            // Optionally handle reconnect here
        });
    }

    sendMessage(message: any) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        } else {
            console.warn('WebSocket is not open. Message not sent:', message);
        }
    }

    closeConnection() {
        this.socket.close();
    }
}

