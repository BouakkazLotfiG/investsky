import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import { addStock } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';

//Components
import TextButton from '../../components/buttons/TextButton';
import IconButton from '../../components/buttons/IconButton';

// Style
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { SIZES, FONTS, COLORS } from '../../constants/Theme';

// Types
import { StockData } from '../../types/index';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import StockGraphLarge from '../../components/StockGraphLarge';

type RootStackParamList = {
  Portfolio: { stock: StockData };
};
type PortfolioRouteProp = RouteProp<RootStackParamList, 'Portfolio'>;

export default function Portfolio() {
  const navigation = useNavigation<any>();
  const route = useRoute<PortfolioRouteProp>();
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const stock = useSelector((state: RootState) => state.stock);
  const dispatch = useDispatch();
  console.log('stock', stock.symbol);

  const handleNavigateToTabs = () => {
    navigation.navigate('(tabs)', { screen: 'Market' });
  };

  const showToast = (symbol: string) => {
    Toast.show({
      type: 'success',
      text1: `Successfully added ${symbol} to tour profile`,
    });
  };
  useEffect(() => {
    setSelectedStock(stock);
    setIsLoading(false);
  }, [stock]);

  // Display a loading indicator while the data is being fetched
  if (isLoading) {
    return <ActivityIndicator size='large' color='#0000ff' />;
  }

  return (
    <SafeAreaView>
      {selectedStock?.symbol === '' ? (
        <View style={styles.container}>
          <View style={styles.emptyStock}>
            <Text style={styles.emptyStockText}>No Stock to display</Text>
            <TextButton
              text='Access the Stock Market'
              onPress={handleNavigateToTabs}
            />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <IconButton
              onPress={() => navigation.navigate('Market')}
              icon={faChevronLeft}
            />
            <View>
              <Text style={FONTS.h2}>{selectedStock?.symbol}</Text>
              <Text style={styles.desc}>{selectedStock?.name}</Text>
            </View>
          </View>
          {/* Rate */}
          <View style={styles.rate}>
            <Text style={FONTS.h1}>${selectedStock?.quote['05. price']}</Text>

            <Text
              style={
                parseFloat(
                  selectedStock?.quote['10. change percent']?.replace(
                    '%',
                    ''
                  ) ?? ''
                ) > 0
                  ? [styles.pourcentageUP, styles.percent]
                  : [styles.pourcentageDOWN, styles.percent]
              }
            >
              {selectedStock &&
              +selectedStock.quote['10. change percent']?.replace('%', '') > 0
                ? '$' +
                  '+' +
                  selectedStock?.quote['09. change'] +
                  ' (' +
                  selectedStock?.quote['10. change percent'] +
                  ')'
                : '$' +
                  selectedStock?.quote['09. change'] +
                  ' (' +
                  selectedStock?.quote['10. change percent'] +
                  ')'}
            </Text>
          </View>
          {/* Graph */}
          <View>
            <StockGraphLarge graphData={selectedStock?.graph} />
          </View>
          {/* info */}
          <View style={styles.info}>
            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>Close Price</Text>
              <Text style={styles.infoValue}>
                ${selectedStock?.quote['08. previous close']}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>Last trade price</Text>
              <Text style={styles.infoValue}>
                ${selectedStock?.quote['08. previous close']}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>Outstanding</Text>
              <Text style={styles.infoValue}>
                ${selectedStock?.quote['08. previous close']}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoTitle}>Market Value</Text>
              <Text style={styles.infoValue}>
                ${selectedStock?.quote['06. volume']}
              </Text>
            </View>
          </View>
          {/* add to portfolio button */}
          <TextButton
            onPress={() => {
              navigation.navigate('Market');
              showToast(selectedStock?.symbol ?? '');
              dispatch(addStock(selectedStock as StockData));
            }}
            text='Add to Portfolio'
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZES.padding * 2,
    display: 'flex',
    justifyContent: 'space-around',
    gap: 15,
    backgroundColor: COLORS.white,
    width: SIZES.width,
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    paddingVertical: SIZES.paddingVertical,
    paddingHorizontal: SIZES.paddingHorizontal * 1.5,
  },
  desc: {
    color: COLORS.gray,
  },
  rate: {
    flexDirection: 'column',
    justifyContent: 'space-between',

    paddingHorizontal: 25,
    paddingVertical: 10,
  },

  percent: {
    fontSize: SIZES.h4 * 0.9,
    textAlign: 'left',
    fontFamily: FONTS.h4.fontFamily,
  },

  pourcentageUP: {
    color: COLORS.green,
  },
  pourcentageDOWN: {
    color: COLORS.red,
  },

  info: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 5,
    paddingHorizontal: SIZES.paddingHorizontal * 2,
    paddingBottom: SIZES.paddingVertical * 2,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoTitle: {
    fontSize: SIZES.h3,
    color: COLORS.gray,
    fontFamily: 'Roboto-Medium',
  },
  infoValue: {
    fontSize: SIZES.h3,
    fontFamily: 'Roboto-ExtraBold',
  },
  emptyStock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  emptyStockText: {
    fontSize: SIZES.h2,
    fontFamily: 'Roboto-ExtraBold',
  },
});
