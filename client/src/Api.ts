import axios from 'axios';

const Api = {
  getCompanyData: async (tickers: string[], years_back?: number) => {
    const tickerParams = tickers.map((ticker) => `tickers=${ticker}`).join('&');
    let url = `http://localhost:8000/company/${encodeURIComponent(
      tickers[0],
    )}?${tickerParams}`;
    if (years_back !== undefined) {
      url += `&years_back=${years_back}`;
    }
    try {
      return await axios.get(url);
    } catch (error) {
      if ((error as any).response && (error as any).response.status === 404) {
        throw new Error('Ticker not found');
      } else {
        throw error;
      }
    }
  },
};

export default Api;
