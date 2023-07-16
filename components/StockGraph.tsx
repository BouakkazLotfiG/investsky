import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';
import { GraphData } from '../types';

type StockData = {
  x: string;
  y: number;
};

const StockGraph: React.FC = (props: GraphData) => {
  const [data, setData] = useState<StockData[]>([]);
  const graphData = props.graphData;

  const timeSeries = graphData;
  const formattedData: StockData[] = Object.keys(timeSeries).map((date) => {
    return { x: date, y: parseFloat(timeSeries[date]['4. close']) };
  });
  const n = 6;
  const simpleData = formattedData.filter((_, index) => index % n === 0);

  return (
    <View style={styles.graph}>
      <VictoryChart width={150} height={50} domainPadding={10}>
        <VictoryAxis
          style={{
            axis: { stroke: 'transparent' },
            ticks: { stroke: 'transparent' },
            tickLabels: { fill: 'transparent' },
          }}
        />
        <VictoryLine
          data={simpleData}
          x='x'
          y='y'
          style={{
            data: { stroke: 'blue' },
          }}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  graph: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default StockGraph;
