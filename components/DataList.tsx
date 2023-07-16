import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { StockData } from '../types';
import { useDispatch } from 'react-redux';
import { COLORS, SIZES } from '../constants/Theme';

export default function DataList({ data }: StockData) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <ScrollView>
        {data?.length === 0 && isLoading ? (
          <View style={styles.container}>
            <View style={styles.emptyStock}>
              <Text style={styles.emptyStockText}>No Stock to display</Text>
            </View>
          </View>
        ) : (
          data[0]?.graph &&
          data?.map((item: StockData, index: number) => {
            // console.log('symbol ', item.quote);
            if (!item) {
              console.log('Undefined item at index', index);
              return null; // Render nothing for this item.
            }
            return (
              <TouchableOpacity
                style={styles.wrapper}
                key={index}
                onPress={() => {
                  navigation.navigate(
                    'Portfolio' as never,
                    { stock: item } as never
                  );
                  dispatch(selectedStock(item));
                }}
              >
                <View style={styles.listItem}>
                  <View style={{ width: '25%' }}>
                    <Text style={styles.ticker}>{item.symbol}</Text>
                    <Text style={styles.description}>Desription</Text>
                  </View>
                  <View style={{ width: '35%' }}>{/* GRAPH */}</View>
                  <View style={{ width: '40%' }}>
                    <Text style={styles.pricer}>
                      {' '}
                      $ {item.quote['05. price']}
                    </Text>
                    <Text
                      style={
                        +item.quote['09. change']?.replace('%', '') > 0
                          ? styles.pourcentageUP
                          : styles.pourcentageDOWN
                      }
                    >
                      {+item.quote['09. change']?.replace('%', '') > 0
                        ? '+' + item.quote['09. change'] + '%'
                        : item.quote['09. change']}{' '}
                      %
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  searchContainer: {
    width: SIZES.width,
    backgroundColor: COLORS.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabStyle: {
    width: 'auto',
  },
  indicatorStyle: {
    backgroundColor: 'blue',
  },
  tabBarStyle: {
    backgroundColor: COLORS.primary,
    height: 70,
    paddingBottom: 5,
    fontSize: 30,
    fontFamily: 'Roboto-Bold',
  },
  listItem: {
    width: '100%',
    paddingTop: 30,
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 25,
  },
  ticker: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    textAlign: 'left',
  },
  description: {
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
    color: 'gray',
    opacity: 0.8,
  },
  pricer: {
    fontFamily: 'Roboto-ExtraBold',
    fontSize: 20,
    textAlign: 'right',
  },
  pourcentageUP: {
    textAlign: 'right',

    color: 'green',
    fontFamily: 'Roboto-Bold',
  },
  pourcentageDOWN: {
    textAlign: 'right',
    color: 'red',
    fontFamily: 'Roboto-Bold',
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStockText: {
    paddingVertical: 20,
    fontSize: SIZES.h2,
    fontFamily: 'Roboto-ExtraBold',
  },
});
