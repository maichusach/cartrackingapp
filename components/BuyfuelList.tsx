import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { InputFuelItemProps, InputFuelType, InputFuelTypeProps } from '@/types';
import { formatNumber } from '@/utils/common';
import { verticalScale } from '@/utils/styling';
import { FlashList } from "@shopify/flash-list";
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Typo from './Typo';

const BuyfuelList = ({data}: InputFuelTypeProps) => {

    const router = useRouter();

    const handleClick = (item: InputFuelType)=>{
        router.push({
            pathname:"/(modal)/buyfuelModal",
            params:{
                inputFuelId: item?.inputFuelId, 
                dateOfSupply :dayjs(item?.dateOfSupply?.toLocaleString()).format("YYYY-MM-DD"), 
                projectCode : item?.projectCode,
                projectName : item?.projectName,
                customerId : item?.customerId,
                customerCode : item?.customerCode,
                customerName : item?.customerName,
                fuelTypeCode : item?.fuelTypeCode,
                fuelTypeName : item?.fuelTypeName, 
                quantity : item?.quantity,
                price : item?.price,
                amount : item?.amount, 
                startDate :dayjs(item?.startDate?.toLocaleString()).format("YYYY-MM-DD"),
                endDate :dayjs(item?.endDate?.toLocaleString()).format("YYYY-MM-DD"),
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
                <BuyfuelItem 
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

const BuyfuelItem = ({
    item, index, handleClick
}:InputFuelItemProps) =>{ 
    return (
    <Animated.View entering={FadeInDown.delay(index*50)
        .springify()
        .damping(14)
    }>
        <TouchableOpacity style={styles.row} onPress={()=> handleClick(item)}> 
            <View style={styles.categoryDes}>
                <Typo size={15}>{"NCC: "+item?.customerName}</Typo>
                <Typo size={12} color={colors.neutral400} textProps={{numberOfLines:1}}>
                    {"Loại nhiên liệu: " + item?.fuelTypeName}
                </Typo>
                <Typo size={12} color={colors.neutral400} textProps={{numberOfLines:1}}>
                    {"Ngày cấp: " + dayjs(item?.dateOfSupply?.toLocaleString()).format("DD/MM/YYYY")}
                </Typo>
                <Typo size={12} color={colors.neutral400} textProps={{numberOfLines:1}}>
                    {"Số lượng: " + formatNumber(item?.quantity as number)} {"- Đơn giá: " + formatNumber(item?.price as number)}
                </Typo>
                   <Typo size={12} color={colors.neutral400} textProps={{numberOfLines:1}}>
                    {"Dự án: " + item?.projectName}
                </Typo> 
            </View> 
        </TouchableOpacity>
    </Animated.View>)
}

export default BuyfuelList

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