import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

// content of each tab
const MainMarket = () => <DataList data={searchResults} />;
const JuniorMarket = () => <DataList data={searchResults} />;
const FxRate = () => <DataList data={searchResults} />;
const FunctionRate = () => <DataList data={searchResults} />;

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

export default function Market() {
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
