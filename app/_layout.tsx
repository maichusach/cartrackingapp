import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{headerShown:false}}>
         <Stack.Screen 
          name="(modal)/equipmentRentalTrackingModal"
          options={{
            presentation:"modal"
          }}
        />
         <Stack.Screen 
          name="(modal)/profileModal"
          options={{
            presentation:"modal"
          }}
          />
           <Stack.Screen 
      name="(modal)/customerModal"
      options={{
        presentation:"modal"
      }}
      />
       <Stack.Screen 
      name="(modal)/equipmentTypeModal"
      options={{
        presentation:"modal"
      }}
      />
      <Stack.Screen 
      name="(modal)/contractModal"
      options={{
        presentation:"modal"
      }}
      />
      <Stack.Screen 
      name="(modal)/buyfuelModal"
      options={{
        presentation:"modal"
      }}
      />
       <Stack.Screen 
      name="(modal)/fuelsupplyModal"
      options={{
        presentation:"modal"
      }}
      />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      // <StatusBar style="auto" />

    // </ThemeProvider>
  );
}
