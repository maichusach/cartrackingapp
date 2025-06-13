import Button from '@/components/Button';
import EquipmentTypeList from '@/components/EquipmentTypeList';
import Header from '@/components/Header';
import Input from '@/components/Input';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { GetEquipmentTypeList } from '@/services/equipmentTypeService';
import { EquipmentTypeType } from '@/types';
import { verticalScale } from '@/utils/styling';
import { Entypo } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const EquipmentType = () => {

     const router = useRouter();
    const [searchText, setSearchText] = useState(""); 
     const [reload, setReload] = useState(false); // trigger reload
     
    const [filtered, setFiltered] = useState<EquipmentTypeType[]>([]);
    const [equipments, setEquipments] = useState<EquipmentTypeType[]>([]);
  
    const loadEquipmentTypes   = async () => { 
        //console.log(token);
        const allEquipments = await GetEquipmentTypeList(""); 
        setEquipments(allEquipments);
        setFiltered(allEquipments);
        //console.log(allEquipments);
    };
    
    useEffect(() => { 
        loadEquipmentTypes();
    }, [reload]);

    useEffect(() => {
        const lower = searchText.toLowerCase();
        const filteredData = equipments?.filter(c =>
            c.equipmentTypeName.toLowerCase().includes(lower)
        );
        setFiltered(filteredData);
    }, [searchText, equipments]);
 
    useFocusEffect(
        useCallback(() => {
            loadEquipmentTypes();
        }, [reload])
    );

  return (
    <ScreenWrapper>
       <View style = {styles.container}>
            <Header
                title={"Danh sách thiết bị"} 
                style={{marginBottom:spacingY._10}}
            />
            {/** form */}
        <ScrollView contentContainerStyle={styles.form}> 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}>Mã hoặc tên thiết bị</Typo>
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
                <EquipmentTypeList data={filtered}
                />
            </View>
        </ScrollView>
        <Button style={styles.floatingButton} onPress={()=> router.push("/(modal)/equipmentTypeModal")}>
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

export default EquipmentType

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