module.exports = {
  /**
   * Your application `client_id` and `client_secret`.
   * Manage in your Spotify developer dashboard.
   */
  client_id: 'ddb9b25d4d0e42eaa0e67240e7c61e2b',
  client_secret: '187031ad285245e19deff5e4dbe17bd5',

  /**
   * Set your application's Redirect URI to the following:
   */
  redirect_uri: 'http://localhost:8001/callback',

  /**
   * Don't change these.
   */
  scope: 'user-read-playback-state',
  state_key: 'SPOTIFY_AUTH_ID',
  access_token: 'SPOTIFY_ACCESS_TOKEN',
  refresh_token: 'SPOTIFY_REFRESH_TOKEN',
  refresh_code: 'SPOTIFY_REFRESH_CODE'
}