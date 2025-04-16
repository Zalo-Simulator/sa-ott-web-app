export class WebSocketClient {
    private socket: WebSocket;
    private messageHandler?: (data: any) => void;

    constructor(private url: string) {
        this.socket = new WebSocket(this.url);
        this.initialize();
    }

    private initialize() {
        this.socket.addEventListener('open', () => {
            console.log('Connected to WebSocket server');
        });

        this.socket.addEventListener('message', (event) => {
            if (this.messageHandler) {
                this.messageHandler(event.data);
            }
        });

        this.socket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
        });

        this.socket.addEventListener('close', (event) => {
            console.log(`WebSocket connection closed:`, event);
        });
    }

    // Set handler after instance is created
    setMessageHandler(handler: (data: any) => void) {
        this.messageHandler = handler;
    }

    sendMessage(message: any) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
            console.log(`Message is sent`, JSON.stringify(message));
        } else {
            console.warn('WebSocket is not open. Message not sent:', message);
        }
    }

    closeConnection() {
        this.socket.close();
    }
}

