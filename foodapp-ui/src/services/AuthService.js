import axios from "axios";

const API_URL = "http://localhost:9090";

export const login = async (
    username,
    password
) => {

    const token =
        btoa(username + ":" + password);

    return axios.get(
        `${API_URL}/me`,
        {
           headers: {
               Authorization:
                  `Basic ${token}`
           }
        }
    );
};