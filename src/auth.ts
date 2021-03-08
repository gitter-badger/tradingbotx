import {AlpacaClient} from './client/AlpacaClient';
import {AccessToken} from './trader';

/**
 * Check if user is authenticated - in session as well as in the Alpaca
 */
export async function isAuthenticated(
  accessToken: AccessToken,
  isLiveMoney: boolean
) {
  if (!accessToken) {
    return false;
  }
  const alpacaClient = new AlpacaClient(accessToken, isLiveMoney);
  let isAuth = await alpacaClient.raw().isAuthenticated();
  if (!isAuth) {
    return false;
  }
  return true;
}
