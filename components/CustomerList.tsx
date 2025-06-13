import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { CustomerItemProps, CustomerProps, CustomerType } from '@/types';
import { verticalScale } from '@/utils/styling';
import { FlashList } from "@shopify/flash-list";
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Typo from './Typo';

const CustomerList = ({data}: CustomerProps) => {

    const router = useRouter();

    const handleClick = (item: CustomerType)=>{
        router.push({
            pathname:"/(modal)/customerModal",
            params:{
                customerId: item?.customerId,
                customerCode : item?.customerCode,
                customerName : item?.customerName,
                address : item?.address,
                phone : item?.phone,
                fax : item?.fax,
                email : item?.email,
                contact : item?.contact,
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
                <CustomerItem 
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

const CustomerItem = ({
    item, index, handleClick
}:CustomerItemProps) =>{ 
    return (
    <Animated.View entering={FadeInDown.delay(index*50)
        .springify()
        .damping(14)
    }>
        <TouchableOpacity style={styles.row} onPress={()=> handleClick(item)}> 
            <View style={styles.categoryDes}>
                <Typo size={17}>{item?.customerName}</Typo>
                <Typo size={12} color={colors.neutral400} textProps={{numberOfLines:1}}>
                    {"Địa chỉ: " + item?.address}
                </Typo>
            </View> 
        </TouchableOpacity>
    </Animated.View>)
}

export default CustomerList

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