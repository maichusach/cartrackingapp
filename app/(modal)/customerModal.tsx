import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import ModalWrapper from '@/components/ModalWrapper';
import Typo from '@/components/Typo';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { createOrUpdateCustomer, deleteCustomer } from '@/services/customerService';
import { CustomerType } from '@/types';
import { scale, verticalScale } from '@/utils/styling';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

const CustomerModal = () => {

    const [customer, setCustomer] = useState<CustomerType>({
        customerCode : "",
        customerName:"",
        address:"", 
        phone:"", 
        fax:"", 
        email:"", 
        contact: "",
        image : null,
    });
    const [loading, setLoading] = useState(false); 
    const router = useRouter();

    type paramType = {
        customerId: string;
        customerCode: string;
        customerName: string;
        address?: string;
        phone?: string;
        fax?: string;
        image?: any;
        email?: string;
        contact?: string;
    }

    const oldCustomer : paramType = useLocalSearchParams();
 
    useEffect(()=>{
        const checkToken  = async () => { 
            //console.log(token);
            const token = await AsyncStorage.getItem("userToken"); 
            if(token == null)
            {
              router.push("/login");
            }
        };
        checkToken();
        if(oldCustomer?.customerId){
            setCustomer({
                customerId: oldCustomer?.customerId,
                customerCode: oldCustomer?.customerCode,
                customerName: oldCustomer?.customerName, 
                address: oldCustomer.address || "",
                phone: oldCustomer.phone || "", 
                fax: oldCustomer.fax || "", 
                email: oldCustomer.email || "", 
                contact: oldCustomer.contact || "",  
                image: oldCustomer?.image,
            });
        }
    },[]);
 
    const onSubmit = async()=>{
         const {customerId,customerCode, customerName, address, phone, fax, email,contact,image} = customer;
         if(! customerCode || !customerName || !address ){
            Alert.alert("NCC/NTP", "Bạn phải chọn đầy đủ thông tin!");
            return;
         }
         console.log("Ok rooi di tiep thoi");

         let customerData: CustomerType = {
            customerId,
            customerCode,
            customerName,
            address,
            phone,
            fax,
            email,
            contact,
            image: image? image:null, 
         }
         if(oldCustomer?.customerId) customerData.customerId = oldCustomer.customerId;
         setLoading(true);
         const res = await createOrUpdateCustomer(customerData);
         console.log("Customer data:", customerData);

         setLoading(false);

         if(res.success){
            router.back();
         }
         else{
            Alert.alert("Customer", res.msg);
         }

    };
    const onDelete = async() =>{
        //console.log("Xoa khoi danh sacsh", oldWallet?.id);
        if(!oldCustomer?.customerId) return;
        setLoading(true);
        const res = await deleteCustomer(oldCustomer?.customerId);
        setLoading(false);
        if(res.success)
        {
            Alert.alert("NCC/NTP", "Xóa NCC/NTP thành công!");
            router.back();
        }
        else{
            Alert.alert("NCC/NTP", res.msg);
        }
    }
    const showDeleteAlert = () =>{
        Alert.alert(
            "Xác nhận",
            "Bạn có muốn xóa không? \n Động tác này sẽ xóa thông tin ra khỏi danh sách",
            [
                {
                    text: "Hủy",
                    onPress: () => console.log("cancel delete"),
                    style:"cancel"
                },
                 {
                    text: "Xóa",
                    onPress: () => onDelete(),
                    style:"destructive"
                }
            ]
        );
    };


  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
        title={oldCustomer?.customerId?"Cập nhật NCC/NTP": "Thêm mới NCC/NTP"}
        leftIcon={<BackButton/>}
        style={{marginBottom:spacingY._10}}
        />
        {/** form */}
        <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}> 
             {/** Customer Code */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Mã NCC/NTP</Typo> 
                <Input  
                    value={customer.customerCode} 
                    onChangeText={(value)=> setCustomer({...customer, 
                        customerCode:value
                    })}
                />  
            </View>
            {/** Customer Name */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Tên NCC/NTP </Typo> 
                <Input  
                    value={customer.customerName} 
                    onChangeText={(value)=> setCustomer({...customer, 
                        customerName:value
                    })}
                />  
            </View>

            {/** Address */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Địa chỉ </Typo> 
                <Input  
                    value={customer.address} 
                    onChangeText={(value)=> setCustomer({...customer, 
                        address:value
                    })}
                />  
            </View>
            {/** Phone */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Điện thoại</Typo> 
                <Input  
                    value={customer.phone} 
                    onChangeText={(value)=> setCustomer({...customer, 
                        phone:value
                    })}
                />  
            </View>

            {/** fax */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>fax</Typo> 
                <Input  
                    value={customer.fax} 
                    onChangeText={(value)=> setCustomer({...customer, 
                        fax:value
                    })}
                />  
            </View>

             {/** email */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>email</Typo> 
                <Input  
                    value={customer.email} 
                    onChangeText={(value)=> setCustomer({...customer, 
                        email:value
                    })}
                />  
            </View>
            {/** contact */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Người liên hệ</Typo> 
                <Input  
                    value={customer.contact} 
                    onChangeText={(value)=> setCustomer({...customer, 
                        contact:value
                    })}
                />  
            </View>
             
            {/* <View style={styles.inputContainer}>
                <View style={styles.flexRow}>
                    <Typo color={colors.neutral200} size={16}>Hình ảnh</Typo>
                    <Typo color={colors.neutral200} size={14}>(Option)</Typo>
                </View>
                 
                
                <ImageToUpload  
                file={customer.image} 
                onClear={()=>setCustomer({...customer,image: null})}
                onSelect={(file)=> setCustomer({...customer, image:file})}
                    placeholder='Upload hình ảnh'

                    />
            </View> */}
        </ScrollView>
      </View>
      <View style ={styles.footer}>
        {
            oldCustomer?.customerId && !loading &&  (
                <Button
                    onPress={showDeleteAlert}
                    style={{
                        backgroundColor: colors.rose,
                        paddingHorizontal: spacingX._15
                    }}
                >
                    <FontAwesome
                    name='trash-o' 
                    color={colors.white}
                    size={verticalScale(24)}
                    weight='bold'
                    />
                </Button>
            )
        }
            <Button onPress={onSubmit} loading={loading} style={{flex:1}}>
                <Typo color={colors.black} fontWeight={"700"}>
                    {oldCustomer?.customerId?"Cập nhật":"Lưu"}
                </Typo>
            </Button>
      </View>
    </ModalWrapper>
  )
}

export default CustomerModal

const styles = StyleSheet.create({
    container:{
        flex:1, 
        paddingHorizontal:spacingX._20
    },
    form:{
        gap: spacingY._30,
        paddingVertical: spacingY._15,
        paddingBottom: spacingY._40
    },
    footer:{
        alignContent:"center",
        flexDirection:"row",
        justifyContent:"center",
        paddingHorizontal: spacingX._20,
        gap:scale(12),
        paddingTop: spacingY._15,
        borderTopColor: colors.neutral700,
        marginBottom: spacingY._5,
        borderTopWidth:1
    },
    inputContainer:{
        gap: spacingY._10
    },
    iosDropdown:{
        flexDirection:"row",
        height: verticalScale(54),
        alignItems:"center",
        justifyContent:"center",
        fontSize:verticalScale(14),
        borderWidth:1,
        color: colors.white,
        borderColor: colors.neutral300,
        borderRadius: radius._17,
        borderCurve: "continuous",
        paddingHorizontal: spacingX._15
    },

    androidDropdown:{
        height: verticalScale(54),
        alignContent: "center",
        justifyContent:"center",
        borderWidth:1,
        fontSize: verticalScale(14),
        color: colors.white,
        borderColor: colors.neutral300,
        borderRadius:radius._17,
        borderCurve: "continuous"
    },
    flexRow:{
        flexDirection:"row",
        alignItems:"center",
        gap: spacingX._5,
    },
    dateInput: {
        flexDirection:"row",
        height: verticalScale(54),
        alignItems:"center",
        borderWidth:1,
        borderColor: colors.neutral300,
        borderRadius: radius._17,
        borderCurve: "continuous",
        paddingHorizontal: spacingX._15
    },
    iosDatePicker:{

    },
    datePickerButton:{

    },
    dropdownContainer: {
        height: verticalScale(54),
        borderWidth:1,
        borderColor: colors.neutral300,
        paddingHorizontal: spacingX._15,
        borderRadius: radius._15,
        borderCurve:"continuous"
    },
    dropdownItemText:{
        color: colors.white
    },
    dropdownSelectedText:{
        color: colors.white,
        fontSize: verticalScale(14)
    },
     dropdownListContainer: {
         
        backgroundColor: colors.neutral300, 
        borderRadius: radius._15,
        borderCurve:"continuous",
        paddingVertical: spacingY._7,
        top: 5,
        borderColor: colors.neutral500,
        shadowColor: colors.black,
        shadowOffset: {width:0, height:5},
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation:5
    }, 
    dropdownPlacehoder:{
        color: colors.white
    },
    dropdownItemContainer:{
        borderRadius: radius._15,
        marginHorizontal: spacingX._7
    },
     dropdownIcon:{
        height: verticalScale(30),
        tintColor: colors.neutral300
    },
})