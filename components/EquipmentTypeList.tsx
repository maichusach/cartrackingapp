import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { EquipmentTypeItemProps, EquipmentTypeProps, EquipmentTypeType } from '@/types';
import { verticalScale } from '@/utils/styling';
import { FlashList } from "@shopify/flash-list";
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Typo from './Typo';

const EquipmentTypeList = ({data}: EquipmentTypeProps) => {

    const router = useRouter();

    const handleClick = (item: EquipmentTypeType)=>{
        router.push({
            pathname:"/(modal)/equipmentTypeModal",
            params:{
                equipmentTypeCode: item?.equipmentTypeCode,
                equipmentTypeName : item?.equipmentTypeName,
                productName : item?.productName,
                adlicensePlatedress : item?.licensePlate,
                yearOfManufacture : item?.yearOfManufacture,
                countryOfManufacture : item?.countryOfManufacture,
                description : item?.description, 
                image: item?.image, 
                isCreate: "true"
            }
        })
    }
  return (
    <View style={styles.container}> 
       <View style={styles.list}>
            <FlashList
                data={data} 
                renderItem={({ item,index }) =>(
                <EquipmentTypeItem 
                item = {item} 
                index={index} 
                handleClick={handleClick}
                />
            )}
                estimatedItemSize={200}
            />
       </View> 
    </View>
  )
}

const EquipmentTypeItem = ({
    item, index, handleClick
}:EquipmentTypeItemProps) =>{ 
    return (
    <Animated.View entering={FadeInDown.delay(index*50)
        .springify()
        .damping(14)
    }>
        <TouchableOpacity style={styles.row} onPress={()=> handleClick(item)}> 
            <View style={styles.imageContainer}>
                <Image 
                    style={{flex:1}}
                    source={item?.image}
                    contentFit='cover'
                    transition={100}
                />
            </View>
            <View style={styles.categoryDes}>
                <Typo size={17}>{item?.equipmentTypeName}</Typo>
                <Typo size={12} color={colors.neutral400} textProps={{numberOfLines:1}}>
                    {"NSX: " + item?.productName}
                </Typo>
                <Typo size={12} color={colors.neutral400} textProps={{numberOfLines:1}}>
                    {"Biển số: " + item?.licensePlate}
                </Typo>
                <Typo size={12} color={colors.neutral400} textProps={{numberOfLines:1}}>
                    {"Năm SX: " + item?.yearOfManufacture}
                </Typo>
            </View> 
        </TouchableOpacity>
    </Animated.View>)
}

export default EquipmentTypeList

const styles = StyleSheet.create({
    container:{
        gap:spacingY._17
    },
     imageContainer:{
        height: verticalScale(70),
        width: verticalScale(70),
        borderWidth:1,
        borderColor: colors.neutral600,
        borderRadius:radius._12,
        borderCurve: "continuous",
        overflow:"hidden"
    },
    list:{
        minHeight:3
    },

    row:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        gap: spacingX._12,
        marginBottom: spacingY._12,

        backgroundColor: colors.neutral800,
        padding: spacingY._10,
        paddingHorizontal: spacingY._10,
        borderRadius: radius._17
    },
    icon:{
        height: verticalScale(44),
        aspectRatio:1,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:radius._12,
        borderCurve:"continuous"
    },
    categoryDes: {
        flex:1,
        gap: 2.5
    },
    amountDate:{
        alignItems:"flex-end",
        gap:3
    }
})