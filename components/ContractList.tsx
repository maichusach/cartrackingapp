import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { ContractItemProps, ContractType, ContractTypeProps } from '@/types';
import { formatNumber } from '@/utils/common';
import { verticalScale } from '@/utils/styling';
import { FlashList } from "@shopify/flash-list";
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Typo from './Typo';

const ContractList = ({data}: ContractTypeProps) => {

    const router = useRouter();

    const handleClick = (item: ContractType)=>{
        router.push({
            pathname:"/(modal)/contractModal",
            params:{
                contractId: item?.contractId,
                contractCode : item?.contractCode,
                contractSign :dayjs(item?.contractSign?.toLocaleString()).format("YYYY-MM-DD"),
                //contractSign : (item?.contractSign as Timestamp)?.toDate()?.toISOString(),
                content : item?.content,
                projectCode : item?.projectCode,
                projectName : item?.projectName,
                customerId : item?.customerId,
                customerCode : item?.customerCode,
                customerName : item?.customerName,
                equipmentTypeCode : item?.equipmentTypeCode,
                equipmentTypeName : item?.equipmentTypeName,
                unitCode : item?.unitCode,
                unitName : item?.unitName,
                price : item?.price,
                driver : item?.driver,
                carCode : item?.carCode,
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
                <ContractItem 
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

const ContractItem = ({
    item, index, handleClick
}:ContractItemProps) =>{ 
    return (
    <Animated.View entering={FadeInDown.delay(index*50)
        .springify()
        .damping(14)
    }>
        <TouchableOpacity style={styles.row} onPress={()=> handleClick(item)}> 
            <View style={styles.categoryDes}>
                <Typo size={15}>{"Số hợp đồng: "+item?.customerName}</Typo>
                <Typo size={12} color={colors.neutral400}>
                    {"NCC/NTP: " + item?.customerName}
                </Typo>
                <Typo size={12} color={colors.neutral400} textProps={{numberOfLines:1}}>
                    {"Ngày ký: " + dayjs(item?.contractSign?.toLocaleString()).format("DD/MM/YYYY")} {"- Loại hình thuê: " + item?.unitName}
                </Typo>
                <Typo size={12} color={colors.neutral400} textProps={{numberOfLines:1}}>
                    {"Thiết bị: " + item?.equipmentTypeName}
                </Typo> 
                <Typo size={12} color={colors.neutral400} textProps={{numberOfLines:1}}>
                    {"Đơn giá: " + formatNumber(item?.price as number)}
                </Typo>
            </View> 
        </TouchableOpacity>
    </Animated.View>)
}

export default ContractList

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