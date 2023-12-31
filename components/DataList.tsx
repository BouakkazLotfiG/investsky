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
import { selectedStock } from '../slices/stockSlice';
import { useNavigation } from 'expo-router';
import StockGraph from './StockGraph';

interface DataListProps {
  data: StockData[];
}

const DataList: React.FC<DataListProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
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
                  {/* stock name */}
                  <View style={{ width: '25%' }}>
                    <Text style={styles.ticker}>{item.symbol}</Text>
                    <Text style={styles.description}>{item.name}</Text>
                  </View>

                  {/* stock graph */}
                  <View style={{ width: '35%' }}>
                    <StockGraph data={item.graph} />
                  </View>

                  {/* stock price */}
                  <View style={{ width: '40%' }}>
                    <Text style={styles.pricer}>
                      {' '}
                      $ {item.quote['05. price']}
                    </Text>
                    <Text
                      style={
                        +item.quote['10. change percent']?.replace('%', '') > 0
                          ? styles.pourcentageUP
                          : styles.pourcentageDOWN
                      }
                    >
                      {+item.quote['10. change percent']?.replace('%', '') > 0
                        ? '+' + item.quote['10. change percent']
                        : item.quote['10. change percent']}{' '}
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
};

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

    overflow: 'hidden',
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

export default DataList;
