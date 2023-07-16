import { StockData } from '../types';
interface Props {
  symbol?: string | string[];
}

export const fetchData = async (props: Props = {}): Promise<StockData[]> => {
  const stockSymbols = props.symbol;

  fetch('https://64b442f30efb99d86268ea08.mockapi.io/stocks', {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((stocks) => {
      // if its a search query, filter the stocks, else return all stocks
      if (stockSymbols) {
        const filteredStocks = stocks.filter((stock: StockData) => {
          return stockSymbols.includes(stock.symbol);
        });
        return filteredStocks;
      } else return stocks;
    })
    .catch((error) => {
      console.log('data not fetched correctly');
    });
};
