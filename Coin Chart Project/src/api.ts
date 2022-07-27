const BASE_URL = "https://api.coinpaprika.com/v1"

export const fetchCoins = () => {
  return fetch(`${BASE_URL}/coins`).then((res) => res.json());
}

export const fetchCoinInfo = (coinId:string) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
}

export const fetchCoinTickers = (coinId:string) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
}

export const fetchCoinHistory = (coinId: string) => {
  // const endDate = Math.floor(Date.now() / 1000);
  // const startDate = endDate - 60 * 60 * 24 * 7; // 일주일 전
  return fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`).then((res) => res.json());
}