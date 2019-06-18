module.exports = {
  /**
   * Your application `client_id` and `client_secret`.
   * Manage in your Spotify developer dashboard.
   */
  client_id: 'CLIENT_ID_HERE',
  client_secret: 'CLIENT_SECRET_HERE',

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