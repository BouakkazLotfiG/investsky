import { StockData } from '../types';
interface Props {
  symbol?: string | string[];
}

export const fetchData = async (props: Props = {}): Promise<StockData[]> => {
  const stockSymbols = props.symbol;

  return fetch('https://64b442f30efb99d86268ea08.mockapi.io/stocks', {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Response not OK');
      }
    })
    .then((stocks) => {
      if (stockSymbols) {
        const filteredStocks = stocks.filter((stock: StockData) => {
          return stockSymbols.includes(stock.symbol);
        });
        return filteredStocks;
      }
      return stocks;
    })
    .catch((error) => {
      console.log('data not fetched correctly');
      throw error;
    });
};
