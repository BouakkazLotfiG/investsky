import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useNavigation } from 'expo-router';
import DataList from '../../components/DataList';
import { COLORS, SIZES, FONTS } from '../../constants/Theme';

export default function Market() {
  const layout = useWindowDimensions();
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [index, setIndex] = React.useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  // content of each tab
  const MainMarket = () => <DataList data={searchResults} />;
  const JuniorMarket = () => <DataList data={searchResults} />;
  const FxRate = () => <DataList data={searchResults} />;
  const FunctionRate = () => <DataList data={searchResults} />;

  // defining tab routes
  const [routes] = React.useState([
    { key: 'first', title: 'Main Market' },
    { key: 'second', title: 'Junior Market' },
    { key: 'third', title: 'Fx Rate' },
    { key: 'fourth', title: 'Function Rate' },
  ]);

  // tab names
  const renderScene = SceneMap({
    first: MainMarket,
    second: JuniorMarket,
    third: FxRate,
    fourth: FunctionRate,
  });

  // rendering tabs
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      scrollEnabled
      tabStyle={styles.tabStyle}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBarStyle}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ fontFamily: 'Roboto-Regular', color, fontSize: 16 }}>
          {route.title}
        </Text>
      )}
    />
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* header  */}
      <View style={styles.searchContainer}>{/* search */}</View>

      {/* tabs */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </ScrollView>
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
