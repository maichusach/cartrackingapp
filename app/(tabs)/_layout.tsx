import CustomTabs from '@/components/CustomTabs';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
 

const _layout = () => {
  return (
    <Tabs tabBar={CustomTabs} screenOptions={{headerShown:false}}>
        <Tabs.Screen name='index'/>
        {/* <Tabs.Screen name='explore'/> */}
        <Tabs.Screen name='contract'/>
        <Tabs.Screen name='customer'/> 
        <Tabs.Screen name='equipmenttype'/>  
        <Tabs.Screen name='buyfuel'/>
        <Tabs.Screen name='fuelsupply'/>  
        {/* <Tabs.Screen name='wallet'/> */}
        <Tabs.Screen name='profile'/> 
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})

// import { Tabs } from 'expo-router';
// import React from 'react';
// import { Platform } from 'react-native';

// import { HapticTab } from '@/components/HapticTab';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import TabBarBackground from '@/components/ui/TabBarBackground';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//         tabBarBackground: TabBarBackground,
//         tabBarStyle: Platform.select({
//           ios: {
//             // Use a transparent background on iOS to show the blur effect
//             position: 'absolute',
//           },
//           default: {},
//         }),
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'Explore',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }
