import { fetchActivityList } from "../features/activity/store/slices/activity-list-slice";
import store from "./store";

import NetInfo from "@react-native-community/netinfo";

function webSocketObject() {
    let websocket: WebSocket;
    let isConnected = false;

    const handleIncomingMessage = (message: string) => {
        if (message === "new-data-arrived") {
            store.dispatch(fetchActivityList());
        }
    }

    const connect = () => {
        websocket = new WebSocket("ws://localhost:8080/websocket/notifications");

        websocket.addEventListener("message", (event) => {
            handleIncomingMessage(event.data);
        });

        setIsConnected(true);
    }

    const disconnect = () => {
        if (websocket !== null) {
            websocket.close();
        }

        setIsConnected(false);
    }

    const setIsConnected = (connectionValue: boolean) => {
        isConnected = connectionValue;
    }

    const getIsConnected = (): boolean => {
        return isConnected;
    }

    const getWebSocket = (): WebSocket => {
        return websocket;
    }

    const addNetworkChangeListener = () => {
        NetInfo.addEventListener(state => {
            if (websocket && websocket.CLOSED && state.isConnected) {
                websocket = new WebSocket("ws://localhost:8080/websocket/notifications");
            }
        });
    }

    return {
        connect: connect,
        disconnect: disconnect,
        getIsConnected: getIsConnected,
        getWebSocket: getWebSocket,
        addNetworkChangeListener: addNetworkChangeListener
    }
}

const webSocketInstance = webSocketObject();

export default webSocketInstance;

