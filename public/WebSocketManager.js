class WebSocketManager {
    constructor(url) {
        if (WebSocketManager.instance) {
            return WebSocketManager.instance; 
        }

        this.url = url;
        this.socket = null;
        this.listeners = [];

        WebSocketManager.instance = this;
        this.connect();
    }

    connect() {
        if (this.socket) return; 

        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
            console.log('WebSocket connected');
            this.notifyListeners('open');
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received:', data);
            this.notifyListeners('message', data);
        };

        this.socket.onclose = () => {
            console.log('WebSocket disconnected');
            this.notifyListeners('close');
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
            this.notifyListeners('error', error);
        };
    }

    send(message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.error('WebSocket is not open');
        }
    }

    on(event, callback) {
        this.listeners.push({ event, callback });
    }

    notifyListeners(event, data) {
        this.listeners.forEach(listener => {
            if (listener.event === event) {
                listener.callback(data);
            }
        });
    }
}

const socketProvider = new WebSocketManager('ws://localhost:8080');
window.socketProvider = socketProvider;
