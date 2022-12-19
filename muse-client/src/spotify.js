import axios from 'axios';

const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp',
}

const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

const hasTokenExpired = () => {
    const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
    if (!accessToken || !timestamp) {
        return false;
    }
    const millisecondsElapsed = Date.now() - Number(timestamp);
    return (millisecondsElapsed / 1000) > Number(expireTime);
};

const refreshToken = async () => {
    try {
        // If there is no refreshToken, log out.
        if (!LOCALSTORAGE_VALUES.refreshToken ||
            LOCALSTORAGE_VALUES.refreshToken === 'undefined' ||
            (Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000) < 1000
        ) {
            console.error('No refresh token available');
            logout();
        }

        const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);

        // Update values
        window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

        window.location.reload();

    } catch (error) {
        console.error(error);
    }
};

export const logout = () => {
    // Clear localStorage
    for (const property in LOCALSTORAGE_KEYS) {
        window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
    }
    // Go to main page
    window.location = window.location.origin;
};

const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    };
    const hasError = urlParams.get('error');

    // If there is an error, the token is undefined or expired
    if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
        refreshToken();
    }

    // If there is a token in local storage and is still valid, use it
    if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
        return LOCALSTORAGE_VALUES.accessToken;
    }

    // If it's the first time
    if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {

        for (const property in queryParams) {
            window.localStorage.setItem(property, queryParams[property]);
        }
        // Set timestamp
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

        window.location.search = "";
        // Return access token from query params
        return queryParams[LOCALSTORAGE_KEYS.accessToken];
    }

    return false;
};

export const accessToken = getAccessToken();

const apiClient = axios.create({
    baseURL: "https://api.spotify.com/v1/",
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    },
});

export default apiClient;
