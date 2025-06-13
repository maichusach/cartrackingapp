import Button from '@/components/Button';
import BuyfuelList from '@/components/BuyfuelList';
import Header from '@/components/Header';
import Input from '@/components/Input';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { GetBuyFuelList } from '@/services/buyfuelService';
import { InputFuelType } from '@/types';
import { verticalScale } from '@/utils/styling';
import { Entypo } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const Buyfuel = () => {

     const router = useRouter();
    const [searchText, setSearchText] = useState(""); 
     const [reload, setReload] = useState(false); // trigger reload
     
    const [filtered, setFiltered] = useState<InputFuelType[]>([]);
    const [buyfuels, setBuyfuels] = useState<InputFuelType[]>([]);
  
    const loadBuyfuels   = async () => { 
        //console.log(token);
        const allContracts = await GetBuyFuelList(); 
        setBuyfuels(allContracts);
        setFiltered(allContracts);
        //console.log(allContracts);
    };
    
    useEffect(() => { 
        loadBuyfuels();
    }, []);

    useEffect(() => {
        const lower = searchText.toLowerCase();
        //const filteredData = buyfuels;
        const filteredData = buyfuels?.filter(c =>
            c.fuelTypeName.toLowerCase().includes(lower)
        ); 
        setFiltered(filteredData);
    }, [searchText, buyfuels]);
 
    useFocusEffect(
        useCallback(() => {
            loadBuyfuels();
        }, [])
    );

  return (
    <ScreenWrapper>
       <View style = {styles.container}>
            <Header
                title={"Danh sách mua nhiên liệu"} 
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
                <BuyfuelList data={filtered}
                />
            </View>
        </ScrollView>
        <Button style={styles.floatingButton} onPress={()=> router.push("/(modal)/buyfuelModal")}>
          <Entypo 
            name='plus'
            color={colors.black}
            weight='bold'
            size={verticalScale(24)}
          />
        </Button>
       </View>
    </ScreenWrapper>
  )
}

export default Buyfuel

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