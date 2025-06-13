 
import { colors, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
//import { useTheme } from '@react-navigation/native';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';


export default function CustomTabs({ state, descriptors, navigation }:BottomTabBarProps) {
  
    const tabbarIcons: any ={
        index: (isFocused: boolean)=>(
            <FontAwesome5
            name='truck-loading'
            size={verticalScale(30)}
            weight={isFocused?"fill":"regular"}
            color={isFocused? colors.primary:colors.neutral400}
            />
        ),
        contract: (isFocused: boolean)=>(
            <FontAwesome5
            name='file-contract'
            size={verticalScale(30)}
            weight={isFocused?"fill":"regular"}
            color={isFocused? colors.primary:colors.neutral400}
            />
        ),
        customer: (isFocused: boolean)=>(
            <FontAwesome5
            name='house-user'
            size={verticalScale(30)}
            weight={isFocused?"fill":"regular"}
            color={isFocused? colors.primary:colors.neutral400}
            />
        ),
        equipmenttype: (isFocused: boolean)=>(
            <MaterialCommunityIcons
            name='slot-machine'
            size={verticalScale(30)}
            weight={isFocused?"fill":"regular"}
            color={isFocused? colors.primary:colors.neutral400}
            />
        ),
       
        
        buyfuel: (isFocused: boolean)=>(
            <MaterialCommunityIcons
            name='fuel'
            size={verticalScale(30)}
            weight={isFocused?"fill":"regular"}
            color={isFocused? colors.primary:colors.neutral400}
            />
        ),
         fuelsupply: (isFocused: boolean)=>(
            <MaterialCommunityIcons
            name='fuel-cell'
            size={verticalScale(30)}
            weight={isFocused?"fill":"regular"}
            color={isFocused? colors.primary:colors.neutral400}
            />
        ),
      //   wallet: (isFocused: boolean)=>(
      //     <Icons.Wallet
      //     size={verticalScale(30)}
      //     weight={isFocused?"fill":"regular"}
      //     color={isFocused? colors.primary:colors.neutral400}
      //     />
      // ),
        profile: (isFocused: boolean)=>(
          <MaterialIcons
          name='app-settings-alt'
          size={verticalScale(30)}
          weight={isFocused?"fill":"regular"}
          color={isFocused? colors.primary:colors.neutral400}
          />
      )
        // settings: (isFocused: boolean)=>(
        //     <Icons.Gear
        //     size={verticalScale(30)}
        //     weight={isFocused?"fill":"regular"}
        //     color={isFocused? colors.primary:colors.neutral400}
        //     />
        // )
    }

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            //href={buildHref(route.name, route.params)}
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
           {
            tabbarIcons[route.name] && tabbarIcons[route.name](isFocused)
           }
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
    tabbar:{
        flexDirection: 'row', 
        width:"100%", 
        height:Platform.OS === "ios"?verticalScale(73): verticalScale(55),
        backgroundColor:colors.neutral800,
        justifyContent:"space-around",
        alignItems:"center",
        borderTopColor: colors.neutral700,
        borderTopWidth:1,
    },
    tabbarItem:{
        marginBottom: Platform.OS === "ios"? spacingY._10:spacingY._20,
        justifyContent:"center",
        alignItems:"center",
    }
})