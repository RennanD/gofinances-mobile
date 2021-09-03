const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

export default {
  CLIENT_ID,
  REDIRECT_URI,
  RESPONSE_TYPE: 'token',
  SCOPE: encodeURI('profile email'),
  AUTH_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
  USER_INFO_URL: 'https://www.googleapis.com/oauth2/v1/userinfo',
};
