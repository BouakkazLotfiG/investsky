import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';

// Components
import RangeButton from './buttons/RangeButton';

// Style
import { SIZES } from '../constants/Theme';

type StockData = {
  x: string;
  y: number;
  [key: string]: any;
};

interface StockGraphLargeProps {
  graphData: StockData[] | any;
}

const StockGraphLarge: React.FC<StockGraphLargeProps> = (props) => {
  const { graphData } = props;

  const formattedData: StockData[] = Object.keys(graphData).map(
    (date: string) => {
      return { x: date, y: parseFloat(graphData[date as any]['4. close']) };
    }
  );
  const [chartData, setChartData] = useState(formattedData);
  const [selectedRange, setSelectedRange] = useState('1Y');

  const [chartRange, setChartRange] = useState<{
    x: [number, number];
    y: [number, number];
  }>({
    x: [0, formattedData.length - 1],
    y: [0, 250],
  });

  useEffect(() => {
    console.log('chartRange', chartRange);
    setChartRange(chartRange);
  }, [chartRange]);

  const handleRangeButtonPress = (range: string) => {
    setSelectedRange(range);
    let newData: StockData[];

    switch (range) {
      case '1D':
        newData = formattedData.slice(0, 10);
        break;
      case '1W':
        newData = formattedData.slice(0, 20);
        break;
      case '1M':
        newData = formattedData.slice(0, 30);
        break;
      case '3M':
        newData = formattedData.slice(0, 40);
        break;
      case '1Y':
        newData = formattedData; // for 1Y, show all data
        break;
      default:
        newData = formattedData; // default to all data
        break;
    }

    setChartData(newData);
  };

  return (
    <View style={styles.graph}>
      <VictoryChart
        animate={{
          duration: 2000,
          onLoad: { duration: 500 },
        }}
        padding={{ top: 20, bottom: 60 }}
        height={200}
      >
        <VictoryAxis
          style={{
            axis: { stroke: 'transparent' },
            ticks: { stroke: 'transparent' },
            tickLabels: { fill: 'transparent' },
          }}
        />
        <VictoryLine
          data={chartData}
          x='x'
          y='y'
          style={{
            data: { stroke: 'black' },
          }}
        />
      </VictoryChart>

      <View style={styles.range}>
        <RangeButton
          onPress={() => handleRangeButtonPress('1D')}
          text='1D'
          selected={selectedRange === '1D'}
        />
        <RangeButton
          onPress={() => handleRangeButtonPress('1W')}
          text='1W'
          selected={selectedRange === '1W'}
        />
        <RangeButton
          onPress={() => handleRangeButtonPress('1M')}
          text='1M'
          selected={selectedRange === '1M'}
        />
        <RangeButton
          onPress={() => handleRangeButtonPress('3M')}
          text='3M'
          selected={selectedRange === '3M'}
        />
        <RangeButton
          onPress={() => handleRangeButtonPress('1Y')}
          text='1Y'
          selected={selectedRange === '1Y'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  graph: {
    flexDirection: 'column',
  },
  range: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.paddingHorizontal * 1.5,
  },
});

export default StockGraphLarge;
