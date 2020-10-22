// spotify api
api.spotify = {
    id: 'c63dcc19c74a4281b7edffe44b528680',
    scope: 'user-follow-read user-read-private user-library-read user-library-modify playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-read-playback-state user-modify-playback-state',
    secret: 'f947f0e0ad3f4c10af6ae639ef05161c',
    redirect: location.protocol + '//' + location.host + location.pathname,
    url: 'https://api.spotify.com/v1'
};

// my program
program.spotify = {
    const: {
        stateKey: 'user_spotify_statekey',
        accessToken: 'user_spotify_useraccess',
        accessTokenExpires: 'user_spotify_useraccess_expires'
    }
};