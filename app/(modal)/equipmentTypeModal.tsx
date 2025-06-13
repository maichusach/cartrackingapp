import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Header from '@/components/Header';
import ImageToUpload from '@/components/ImageToUpload';
import Input from '@/components/Input';
import ModalWrapper from '@/components/ModalWrapper';
import Typo from '@/components/Typo';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { createOrUpdateEquipmentType, deleteEquipmentType } from '@/services/equipmentTypeService';
import { EquipmentTypeType } from '@/types';
import { scale, verticalScale } from '@/utils/styling';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

const EquipmentTypeModal = () => {
    const [uploadStatus, setUploadStatus] = useState('');   
    const [equipmentType, setEquipmentType] = useState<EquipmentTypeType>({
        equipmentTypeCode : "",
        equipmentTypeName:"",
        productName:"", 
        licensePlate:"", 
        yearOfManufacture:"", 
        countryOfManufacture:"", 
        description: "",
        image : null,
        isCreate: ""
    });
    const [loading, setLoading] = useState(false); 
    const router = useRouter();

    type paramType = {
        equipmentTypeCode: string;
        equipmentTypeName: string;
        productName?: string;
        licensePlate?: string;
        yearOfManufacture?: string;
        countryOfManufacture?: string;
        image?: any;
        description?: string; 
        isCreate?:string
    }

    const oldEquipmentType : paramType = useLocalSearchParams();
 
    useEffect(()=>{
        if(oldEquipmentType?.isCreate){
            setEquipmentType({
                equipmentTypeCode: oldEquipmentType?.equipmentTypeCode,
                equipmentTypeName: oldEquipmentType?.equipmentTypeName,
                productName: oldEquipmentType?.productName||"", 
                licensePlate: oldEquipmentType.licensePlate || "",
                yearOfManufacture: oldEquipmentType.yearOfManufacture || "", 
                countryOfManufacture: oldEquipmentType.countryOfManufacture || "", 
                description: oldEquipmentType.description || "",  
                image: oldEquipmentType?.image,
                isCreate: oldEquipmentType?.isCreate||""
            });
        }
    },[]);
 
    const onSubmit = async()=>{
         const {equipmentTypeCode,equipmentTypeName, productName, licensePlate, yearOfManufacture, countryOfManufacture, description,isCreate,image} = equipmentType;
         if(!equipmentTypeCode || !equipmentTypeName ){
            Alert.alert("Thiết bị", "Bạn phải chọn đầy đủ thông tin!");
            return;
         }
         console.log("Ok rooi di tiep thoi");

         let equipmentTypeData: EquipmentTypeType = {
            equipmentTypeCode,
            equipmentTypeName,
            productName,
            licensePlate,
            yearOfManufacture,
            countryOfManufacture,
            description,  
            isCreate,   
            image: image? image:null         
         }
         if(oldEquipmentType?.isCreate) equipmentTypeData.equipmentTypeCode = oldEquipmentType.equipmentTypeCode;
         setLoading(true);
         const res = await createOrUpdateEquipmentType(equipmentTypeData);
         //console.log("Customer data:", equipmentTypeData);

         console.log(res.success);

         if(res.success){
            setLoading(false);
            //await uploadImage(res.data?.equipmentTypeCode||"");
            router.back();
         }
         else{
            setLoading(false);
            Alert.alert("Customer", res.msg);
         }

    };
    const onDelete = async() =>{
        //console.log("Xoa khoi danh sacsh", oldWallet?.id);
        if(!oldEquipmentType?.equipmentTypeCode) return;
        setLoading(true);
        const res = await deleteEquipmentType(oldEquipmentType?.equipmentTypeCode);
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
const uploadImage = async (id: string) => {
    
        if (!equipmentType.image) {
          setUploadStatus('Please select an image first.');
          return;
        }
    
        setUploadStatus('Uploading...');

        const token = await AsyncStorage.getItem("authToken"); 
    
        // Prepare the FormData
        const formData = new FormData();
    
        // Convert the local URI to a format that can be sent in FormData
        // Expo doesn't directly give you the file name and type, so you might need to infer it
        const uriParts = equipmentType.image.split('.');
        const fileType = uriParts[uriParts.length - 1];
        const fileName = `image-${Date.now()}.${fileType}`;
    
        formData.append('file', {
          uri: equipmentType.image,
          name: fileName,
          type: `image/${fileType}`, // Adjust the type if needed
        }as any);
        formData.append('couponCode',id);
        formData.append('linkconnect',"http://qc.vietnguyencons.com/"!);
    
        try {
         
          let response = await fetch('http://qc.vietnguyencons.com/api/equipmenttypeapi/uploadimage', {
            method: 'POST',
            body: formData,
            headers: {
              'Authorization': `Bearer ${token}` ,
              'Content-Type': 'multipart/form-data',
            },
          });
    
          const responseData = await response.json();
          console.log(responseData);

          if (response.ok) {
            //setUploadStatus(`Image uploaded successfully! Response: ${JSON.stringify(responseData)}`);
            //setImage('');
            //alert("ok");
          } else {
            //setUploadStatus(`Image upload failed. Status: ${response.status}, Message: ${JSON.stringify(responseData)}`);
            alert("sai roi");
          }
        
        } catch (error: any) {
          console.error('Error uploading image:', error);
          //setUploadStatus(`Image upload failed: ${error.message}`);
        }
      };

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
        title={oldEquipmentType?.equipmentTypeCode?"Cập nhật Thiết bị": "Thêm mới Thiết bị"}
        leftIcon={<BackButton/>}
        style={{marginBottom:spacingY._10}}
        />
        {/** form */}
        <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}> 
             {/** Customer Code */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Mã thiết bị</Typo> 
                <Input  
                    value={equipmentType.equipmentTypeCode} 
                    onChangeText={(value)=> setEquipmentType({...equipmentType, 
                        equipmentTypeCode:value
                    })}
                />  
            </View>
            {/** Customer Name */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Tên thiết bị </Typo> 
                <Input  
                    value={equipmentType.equipmentTypeName} 
                    onChangeText={(value)=> setEquipmentType({...equipmentType, 
                        equipmentTypeName:value
                    })}
                />  
            </View>

            {/** Address */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Nhà sản xuất </Typo> 
                <Input  
                    value={equipmentType.productName} 
                    onChangeText={(value)=> setEquipmentType({...equipmentType, 
                        productName:value
                    })}
                />  
            </View>
            {/** Phone */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Biển số xe</Typo> 
                <Input  
                    value={equipmentType.licensePlate} 
                    onChangeText={(value)=> setEquipmentType({...equipmentType, 
                        licensePlate:value
                    })}
                />  
            </View>

            {/** fax */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Năm SX</Typo> 
                <Input  
                    value={equipmentType.yearOfManufacture} 
                    onChangeText={(value)=> setEquipmentType({...equipmentType, 
                        yearOfManufacture:value
                    })}
                />  
            </View>

             {/** email */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Quốc gia SX</Typo> 
                <Input  
                    value={equipmentType.countryOfManufacture} 
                    onChangeText={(value)=> setEquipmentType({...equipmentType, 
                        countryOfManufacture:value
                    })}
                />  
            </View>
            {/** contact */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Ghi chú</Typo> 
                <Input  
                    value={equipmentType.description} 
                    onChangeText={(value)=> setEquipmentType({...equipmentType, 
                        description:value
                    })}
                />  
            </View>
             
            <View style={styles.inputContainer}>
                <View style={styles.flexRow}>
                    <Typo color={colors.neutral200} size={16}>Hình ảnh</Typo>
                    <Typo color={colors.neutral200} size={14}>(Option)</Typo>
                </View>
                 
                {/** image input */}
                <ImageToUpload  
                file={equipmentType.image} 
                onClear={()=>setEquipmentType({...equipmentType,image: null})}
                onSelect={(file)=> setEquipmentType({...equipmentType, image:file})}
                    placeholder='Upload hình ảnh'

                    />
            </View>
        </ScrollView>
      </View>
      <View style ={styles.footer}>
        {
            oldEquipmentType?.equipmentTypeCode && !loading &&  (
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
                    {oldEquipmentType?.equipmentTypeCode?"Cập nhật":"Lưu"}
                </Typo>
            </Button>
      </View>
    </ModalWrapper>
  )
}

export default EquipmentTypeModal

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