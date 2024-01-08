import axios from "axios";
import { setOffline, setOnline } from "../features/online-status/store/online-status-state";
import store from "./store";

function onlineCheckerService() {
    const onlineCheckUrl = 'http://localhost:8080/ping';

    const init = () => {
        onlineCheckExecutor();
        createOnlineStatusListener();
    }

    const createOnlineStatusListener = () => {
        setInterval(() => {
            onlineCheckExecutor();
        }, 1000);
    }

    const onlineCheckExecutor = () => {
        axios.get(onlineCheckUrl).then((response) => {
            if (store.getState().onlineStatus.isOnline === false) {
                notifyOnline();
            }
        }).catch((err) => {
            if (store.getState().onlineStatus.isOnline === true) {
                notifyOffline();
            }
        });
    }

    const notifyOnline = () => {
        store.dispatch(setOnline());
    }

    const notifyOffline = () => {
        store.dispatch(setOffline());
    }

    return {
        init: init,
        setOnline: setOnline,
        setOffline: setOffline
    }
}

const onlineCheckerServiceInstance = onlineCheckerService();

export default onlineCheckerServiceInstance;