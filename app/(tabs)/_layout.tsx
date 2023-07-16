import { Tabs } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { COLORS } from '../../constants/Theme';

import {
  faCircleHalfStroke,
  faMoneyBillTrendUp,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: COLORS.primary,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'white',

            height: 90,
            paddingBottom: 10,
          },
          tabBarItemStyle: {
            margin: 5,
            borderRadius: 10,
          },
        }}
      >
        <Tabs.Screen
          name='Portfolio'
          options={{
            tabBarLabelStyle: {
              fontFamily: 'Roboto-Bold',
            },

            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                icon={faCircleHalfStroke}
                color={color}
                size={30}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='Market'
          options={{
            title: 'Market',
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                color={color}
                icon={faMoneyBillTrendUp}
                size={30}
              />
            ),
            tabBarLabelStyle: {
              fontFamily: 'Roboto-Bold',
            },
          }}
        />
        <Tabs.Screen
          name='News'
          options={{
            title: 'News',
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon color={color} icon={faNewspaper} size={30} />
            ),
            tabBarLabelStyle: {
              fontFamily: 'Roboto-Bold',
            },
          }}
        />
      </Tabs>
    </>
  );
}
