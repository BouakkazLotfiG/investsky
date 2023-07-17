import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SIZES, COLORS, FONTS } from '../../constants/Theme';
import StockCard from '../../components/StockCard';

const News: React.FC = () => {
  const stock = useSelector((state: RootState) => state.user);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {stock.length === 0 ? (
            <Text style={styles.header}>No stock added</Text>
          ) : (
            <>
              <Text style={styles.header}>Added Stock</Text>

              {/* list of added stock to portfolio */}
              <View style={styles.cardsContainer}>
                {stock.map((item) => (
                  <StockCard key={item.symbol} stock={item} />
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZES.padding * 2,
    flexGrow: 1,
    gap: 15,
    backgroundColor: COLORS.white,
    width: SIZES.width,
  },
  header: {
    ...FONTS.h1,
    color: COLORS.black,
    paddingVertical: SIZES.paddingVertical,
    paddingHorizontal: SIZES.paddingHorizontal * 1.5,
  },
  cardsContainer: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
    paddingHorizontal: SIZES.paddingHorizontal * 1.5,
    paddingVertical: SIZES.paddingVertical,
  },
});

export default News;
