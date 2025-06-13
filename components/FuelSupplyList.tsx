import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { FuelSupplyItemProps, FuelSupplyType, FuelSupplyTypeProps } from '@/types';
import { formatNumber } from '@/utils/common';
import { verticalScale } from '@/utils/styling';
import { FlashList } from "@shopify/flash-list";
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Typo from './Typo';

const FuelSupplyList = ({data}: FuelSupplyTypeProps) => {

    const router = useRouter();

    const handleClick = (item: FuelSupplyType)=>{
        router.push({
            pathname:"/(modal)/fuelsupplyModal",
            params:{
                fuelSupplyId: item?.fuelSupplyId, 
                 
                projectCode : item?.projectCode,
                projectName : item?.projectName,
                contractId : item?.contractId,
                contractCode : item?.contractCode,
                carCode : item?.carCode,
                licensePlate : item?.licensePlate,
                equipmentTypeCode : item?.equipmentTypeCode,
                equipmentTypeName : item?.equipmentTypeName, 
                fuelTypeCode : item?.fuelTypeCode,
                fuelTypeName : item?.fuelTypeName, 
                dateOfSupply :dayjs(item?.dateOfSupply?.toLocaleString()).format("YYYY-MM-DD"),
                quantity : item?.quantity,
                price : item?.price,
                amount : item?.amount,  
                month : item?.month, 
                year : item?.year, 
                description : item?.description,
                image: item?.image, 
            }
        })
    }
  return (
    <View style={styles.container}> 
       <View style={styles.list}>
            <FlashList
                data={data} 
                renderItem={({ item,index }) =>(
                <FuelSupplyItem 
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

const FuelSupplyItem = ({
    item, index, handleClick
}:FuelSupplyItemProps) =>{ 
    return (
    <Animated.View entering={FadeInDown.delay(index*50)
        .springify()
        .damping(14)
    }>
        <TouchableOpacity style={styles.row} onPress={()=> handleClick(item)}> 
            <View style={styles.categoryDes}>
                <Typo size={15}>{"Mã xe: "+item?.carCode}</Typo>
                <Typo size={12} color={colors.neutral400} textProps={{numberOfLines:1}}>
                    {"Loại hình thuê: " + item?.equipmentTypeName} {" - Loại nhiên liệu: " + item?.fuelTypeName}
                </Typo>
                <Typo size={12} color={colors.neutral400} textProps={{numberOfLines:1}}>
                    {"Ngày cấp: " + dayjs(item?.dateOfSupply?.toLocaleString()).format("DD/MM/YYYY")}
                </Typo>
                <Typo size={12} color={colors.neutral400} textProps={{numberOfLines:1}}>
                    {"Số lượng: " + formatNumber(item?.quantity as number)} {"- Đơn giá: " + formatNumber(item?.price as number)}
                </Typo>
                <Typo size={12} color={colors.neutral400} textProps={{numberOfLines:1}}>
                    {"Thành tiền: " + formatNumber(item?.amount as number)}
                </Typo>
                   <Typo size={12} color={colors.neutral400} textProps={{numberOfLines:1}}>
                    {"Dự án: " + item?.projectName}
                </Typo> 
            </View> 
        </TouchableOpacity>
    </Animated.View>)
}

export default FuelSupplyList

const styles = StyleSheet.create({
    container:{
        gap:spacingY._17
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