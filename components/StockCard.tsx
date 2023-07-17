import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, SIZES, FONTS } from '../constants/Theme';
import IconButton from './buttons/IconButton';
import { removeStock } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { StockData } from '../types';

interface StockCardProps {
  stock: StockData;
}

const StockCard: React.FC<StockCardProps> = ({ stock }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.symbol}>{stock.symbol}</Text>
        <Text style={styles.desc}>{stock.name}</Text>
        <View style={styles.rate}>
          <Text style={styles.price}>${stock?.quote['05. price']}</Text>

          <Text
            style={
              parseFloat(
                stock?.quote['10. change percent']?.replace('%', '') ?? ''
              ) > 0
                ? [styles.pourcentageUP, styles.percent]
                : [styles.pourcentageDOWN, styles.percent]
            }
          >
            {stock && +stock.quote['10. change percent']?.replace('%', '') > 0
              ? '$' +
                '+' +
                stock?.quote['09. change'] +
                ' (' +
                stock?.quote['10. change percent'] +
                ')'
              : '$' +
                stock?.quote['09. change'] +
                ' (' +
                stock?.quote['10. change percent'] +
                ')'}
          </Text>
        </View>
      </View>
      <View style={styles.btn}>
        <IconButton
          onPress={() => dispatch(removeStock(stock.symbol))}
          icon={faTrashAlt}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.padding,
    gap: 10,
    backgroundColor: COLORS.white,
    width: SIZES.width * 0.9,
    borderRadius: SIZES.radius,
    elevation: 5,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rate: {
    flexDirection: 'column',
    justifyContent: 'space-between',

    paddingVertical: 10,
  },
  price: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  symbol: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  desc: {
    color: COLORS.gray,
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
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StockCard;
