module.exports = {
  /**
   * Your application `client_id` and `client_secret`.
   * Manage in your Spotify developer dashboard.
   */
  client_id: '578e3a72fa72439db00ab184f7fb5e64',
  client_secret: 'bc7bd717863943c9bca8abb950dcf4de',

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