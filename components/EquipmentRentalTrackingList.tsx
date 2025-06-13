import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { EquipmentRentalTrackingItemProps, EquipmentRentalTrackingType, EquipmentRentalTrackingTypeProps } from '@/types';
import { formatNumber } from '@/utils/common';
import { verticalScale } from '@/utils/styling';
import { FlashList } from "@shopify/flash-list";
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Typo from './Typo';

const EquipmentRentalTrackingList = ({data}: EquipmentRentalTrackingTypeProps) => {

    const router = useRouter();

    const handleClick = (item: EquipmentRentalTrackingType)=>{
        router.push({
            pathname:"/(modal)/equipmentRentalTrackingModal",
            //pathname:"/(modals)/equipmentRentalTrackingModal",
            params:{
                trackingId: item?.trackingId,  
                projectCode : item?.projectCode,
                projectName : item?.projectName,
                contractId : item?.contractId,
                contractCode : item?.contractCode,
                carCode : item?.carCode,
                licensePlate : item?.licensePlate,
                typeHiringCode : item?.typeHiringCode,
                typeHiringName : item?.typeHiringName,  
                dateTracking :dayjs(item?.dateTracking?.toLocaleString()).format("YYYY-MM-DD"),
                timeWorks : item?.timeWorks,
                shirtWorks : item?.shirtWorks,
                price : item?.price,
                amount : item?.amount,  
                timesFrom : item?.dateTimesFrom?.toLocaleString(),
                timesTo : item?.dateTimesTo?.toLocaleString(),
                timesFromLocal : dayjs(item?.timesFrom?.toLocaleString()).format("HH:mm:ss"),
                timesToLocal : dayjs(item?.timesTo?.toLocaleString()).format("HH:mm:ss"),
                deduction : item?.deduction,
                classify1 : item?.classify1,
                classify2 : item?.classify2,
                worksContent : item?.worksContent,
                constructionSite : item?.constructionSite,
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
                <EquipmentRentalTrackingItem 
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

const EquipmentRentalTrackingItem = ({
    item, index, handleClick
}:EquipmentRentalTrackingItemProps) =>{ 
    return (
    <Animated.View entering={FadeInDown.delay(index*50)
        .springify()
        .damping(14)
    }>
        <TouchableOpacity style={styles.row} onPress={()=> handleClick(item)}> 
            <View style={styles.categoryDes}>
                <Typo size={15}>{"Công việc thực hiện: "+item?.worksContent}</Typo>
                <Typo size={12}>{"Mã xe: "+item?.carCode}</Typo>
                <Typo size={12} color={colors.neutral400} textProps={{numberOfLines:1}}>
                    {"Loại hình thuê: " + item?.typeHiringName}  {" - Ngày: " + dayjs(item?.dateTracking?.toLocaleString()).format("DD/MM/YYYY")}
                </Typo> 
                <Typo size={12} color={colors.neutral400} textProps={{numberOfLines:1}}>
                    {"Từ: " + dayjs(item?.dateTimesFrom?.toLocaleString()).format("HH:mm")}  {" - Đến: " +dayjs(item?.dateTimesTo?.toLocaleString()).format("HH:mm")}
                </Typo> 
                <Typo size={12} color={colors.neutral400} textProps={{numberOfLines:1}}>
                    {"Đơn giá: " + formatNumber(item?.price as number)} {"- Thành tiền: " + formatNumber(item?.amount as number)}
                </Typo>
                <Typo size={12} color={colors.neutral400} textProps={{numberOfLines:1}}>
                    {"Dự án: " + item?.projectName}
                </Typo> 
            </View> 
        </TouchableOpacity>
    </Animated.View>)
}

export default EquipmentRentalTrackingList

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