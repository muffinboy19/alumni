import axios from "axios";
import { GET_CHANNELS, CHANNELS_ERROR } from "./types";
import { setAlert } from "./alert";

// Get all channels
export const getAllChannels = () => async (dispatch) => {
    try {
		console.log("here te getAllChannles function starts");
        const res = await axios.get("/api/channels/all");
		console.log("this is teh response of channels/all");
		console.log(res);
        dispatch({
            type: GET_CHANNELS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: CHANNELS_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Create a new channel
export const createChannel = (new_channel_name) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        await axios.post(
            "/api/channels/create-channel",
            {
                new_channel_name,
            },
            config
        );
        dispatch(setAlert("Channel Created", "safe"));
    } catch (err) {
        console.log(err);
    }
};
