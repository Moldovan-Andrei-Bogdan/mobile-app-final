import { fetchActivityList } from "../features/activity/store/slices/activity-list-slice";
import { setOffline, setOnline } from "../features/online-status/store/online-status-state";
import { listenerMiddleware } from "./listener-middleware";
import store from "./store";

import NetInfo from "@react-native-community/netinfo";

function webSocketObject() {
    let websocket: WebSocket | null;
    let isConnected = false;

    const init = () => {
        addOnlineStatusChangeListener();
        addOfflineStatusChangeListener();
    }

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
            websocket = null;
        }

        setIsConnected(false);
    }

    const setIsConnected = (connectionValue: boolean) => {
        isConnected = connectionValue;
    }

    const getIsConnected = (): boolean => {
        return isConnected;
    }

    const getWebSocket = (): WebSocket | null => {
        return websocket;
    }

    const handleOnlineStatusChange = () => {
        connect();
    }

    const handleOfflineStatusChange = () => {
        disconnect();
    }

    const addOnlineStatusChangeListener = () => {
        listenerMiddleware.startListening({
            actionCreator: setOnline,
            effect: () => {
                handleOnlineStatusChange();
            }
        });

        listenerMiddleware.startListening({
            actionCreator: setOffline,
            effect: () => {
                handleOfflineStatusChange();
            }
        });
    }

    const addOfflineStatusChangeListener = () => {}

    return {
        connect: connect,
        disconnect: disconnect,
        getIsConnected: getIsConnected,
        getWebSocket: getWebSocket,
        init: init
    }
}

const webSocketInstance = webSocketObject();

export default webSocketInstance;

