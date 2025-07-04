import { ScrollView, StyleSheet, View } from 'react-native';

import Button from '@/components/Button';
import EquipmentRentalTrackingList from '@/components/EquipmentRentalTrackingList';
import Header from '@/components/Header';
import Input from '@/components/Input';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { GetTrackingCarDayList } from '@/services/trackingCarDayService';
import { EquipmentRentalTrackingType } from '@/types';
import { verticalScale } from '@/utils/styling';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const [filtered, setFiltered] = useState<EquipmentRentalTrackingType[]>([]);
  const [trackingcars, setTrackingcars] = useState<EquipmentRentalTrackingType[]>([]);
  const [searchText, setSearchText] = useState(""); 

   useEffect(() => { 
      const checkLogin   = async () => { 
            //console.log(token);
            const token = await AsyncStorage.getItem("userToken"); 
            if(token == null)
            {
              router.push("/login");
            }
        };
        checkLogin();
        loadTrackingCarDays();
    }, []);

  

  const loadTrackingCarDays   = async () => { 
          //console.log(token);
          const allTrackingCarDays = await GetTrackingCarDayList(); 
          setTrackingcars(allTrackingCarDays);
          setFiltered(allTrackingCarDays);
          //console.log(allContracts);
      };
       
    useEffect(() => {
        const lower = searchText.toLowerCase();
        //const filteredData = trackingcars;
        const filteredData = trackingcars?.filter(c =>
            c.carCode.toLowerCase().includes(lower)
        ); 
        setFiltered(filteredData);
    }, [searchText, trackingcars]);

    useFocusEffect(
        useCallback(() => {
            loadTrackingCarDays();
        }, [])
    );
  return (
     <ScreenWrapper>
       <View style = {styles.container}>
            <Header
                title={"Nhật ký công trình"}
                style={{marginBottom:spacingY._10}}
            />
            {/** form */}
        <ScrollView contentContainerStyle={styles.form}> 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}>Nhập thông tin tìm kiếm</Typo>
                <Input 
                    placeholder='Mã hoặc tên'
                    value={searchText}
                    placeholderTextColor={colors.neutral400}
                    containerStyle={{backgroundColor: colors.neutral800}}
                    onChangeText={setSearchText}
                    //onChangeText={handleSearch}
                    //onChangeText={(value)=> setSearchText(value)}
                />
            </View> 
            {/** List customer */}
            <View>
                <EquipmentRentalTrackingList data={filtered}
                />
            </View>
        </ScrollView>
        <Button style={styles.floatingButton} onPress={()=> router.push("/(modal)/equipmentRentalTrackingModal")}>
          <Entypo 
            name='plus'
            color={colors.black}
            weight='bold'
            size={verticalScale(24)}
          />
        </Button>
       </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
     container:{
        flex:1,
        paddingHorizontal:spacingX._20,
        marginTop: verticalScale(8)
      },
       form:{
        gap: spacingY._30,
        marginTop: spacingY._15
    },
    inputContainer:{
        gap: spacingY._10
    },
    searchIcon:{
        backgroundColor:colors.neutral700,
        padding: spacingX._10,
        borderRadius:50
    },
    floatingButton:{
        height: verticalScale(50),
        width: verticalScale(50),
        borderRadius:100,
        position: "absolute",
        bottom: verticalScale(30),
        right: verticalScale(30)
    },
    scrollViewStyle:{
        marginTop:spacingY._25,
        paddingBottom: verticalScale(100),
        gap: spacingY._25
    }
})