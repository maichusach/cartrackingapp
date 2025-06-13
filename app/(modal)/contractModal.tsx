import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import ModalWrapper from '@/components/ModalWrapper';
import Typo from '@/components/Typo';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { GetCustomerCombobox, GetEpuipmentCombobox, GetProjectCombobox, GetUnitHiringCombobox } from '@/services/categoryService';
import { createOrUpdateContract, deleteContract } from '@/services/contractService';
import { ContractType } from '@/types';
import { formatCurrency } from '@/utils/common';
import { scale, verticalScale } from '@/utils/styling';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


const ContractModal = () => {

    // Project 
    const [openProject, setOpenProject] = useState(false);
    const [valueProject, setValueProject] = useState(null);
    const [itemsProject, setItemsProject] = useState<{ label: string; value: string | number }[]>([]);
    const [loadingProject, setLoadingProject] = useState(true);
    const [projectError, setProjectError] = useState('');

     // Fuel combobox
     const [openCustomer, setOpenCustomer] = useState(false);
     const [valueCustomer, setValueCustomer] = useState(null);
     const [itemsCustomer, setItemsCustomer] = useState<{ label: string; value: string | number }[]>([]);
     const [loadingCustomer, setLoadingCustomer] = useState(true);
     const [customerError, setCustomerError] = useState('');

    // Fuel combobox
    const [openUnitHiring, setOpenUnitHiring] = useState(false);
    const [valueUnitHiring, setValueUnitHiring] = useState(null);
    const [itemsUnitHiring, setItemsUnitHiring] = useState<{ label: string; value: string | number }[]>([]);
    const [loadingUnitHiring, setLoadingUnitHiring] = useState(true);

     const [openEquipment, setOpenEquipment] = useState(false);
    const [valueEquipment, setValueEquipment] = useState(null);
    const [itemsEquipment, setItemsEquipment] = useState<{ label: string; value: string | number }[]>([]);
    const [loadingEquipment, setLoadingEquipment] = useState(true);
    const [equipmentError, setEquipmentError] = useState('');


    const [contract, setContract] = useState<ContractType>({
        contractId : "",
        contractCode:"",
        contractSign: new Date(), 
        content:"", 
        projectCode:"", 
        projectName:"", 
        customerId:"", 
        customerCode:"",
        customerName:"",
        equipmentTypeCode: "",
        equipmentTypeName: "",
        unitCode: "",
        unitName: "",
        price:0,
        driver: "",
        carCode: "",
        description: "",
        image : null,
    });
    const [loading, setLoading] = useState(false); 
    const [showDatePicker, setShowDatePicker] = useState(false);
    const router = useRouter();

    type paramType = {
        contractId: string;
        contractCode: string;
        contractSign: string; 
        content: string;
        projectCode: string;
        projectName: string;
        customerId: string;
        customerCode: string;
        customerName: string;
        equipmentTypeCode: string; 
        equipmentTypeName: string;
        unitCode: string;
        unitName: string;
        price:string; 
        driver: string;
        carCode: string;
        description: string;
        image:any;  
    };

    //let o : paramType = useLocalSearchParams();
    const oldContract : paramType = useLocalSearchParams();
 
    useEffect(()=>{
        if(oldContract?.contractId){
            setContract({
                contractId: oldContract?.contractId,
                contractCode: oldContract?.contractCode,
                //contractSign: new Date(), 
                contractSign: new Date(oldContract.contractSign as string), 
                content: oldContract.content || "",
                projectCode: oldContract.projectCode || "", 
                projectName: oldContract.projectName || "", 
                customerId: oldContract.customerId || "", 
                customerCode: oldContract.customerCode || "",  
                customerName: oldContract.customerName || "",
                equipmentTypeCode: oldContract.equipmentTypeCode || "", 
                equipmentTypeName: oldContract.equipmentTypeName || "", 
                unitCode: oldContract.unitCode || "", 
                unitName: oldContract.unitName || "",  
                price:  Number(oldContract.price),  
                driver: oldContract.driver || "",  
                carCode: oldContract.carCode || "",  
                description: oldContract.description || "",   
                image: oldContract?.image,
            });
        }
        fetchDataToCombobox();
    },[]);
 
    const onSubmit = async()=>{
         const {contractId,contractCode, contractSign, content, projectCode, projectName, customerId,customerCode,customerName,
            equipmentTypeCode,equipmentTypeName,unitCode,unitName,price,driver,carCode,description,image} = contract;
         if(! contractCode || !contractSign || !projectCode || !customerId || !equipmentTypeCode
            || !unitCode || !price
          )
          {
            Alert.alert("Hợp đồng", "Bạn phải chọn đầy đủ thông tin!");
            return;
         }
         console.log("Ok rooi di tiep thoi");

         let contractData: ContractType = {
            contractId,contractCode, contractSign, content, projectCode, projectName, customerId,customerCode,customerName,
            equipmentTypeCode,equipmentTypeName,unitCode,unitName,price,driver,carCode,description,
            image: image? image:null, 
         }
         if(oldContract?.contractId) contractData.contractId = oldContract.contractId;
         setLoading(true);
         const res = await createOrUpdateContract(contractData);
         console.log("Customer data:", contractData);

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
        if(!oldContract?.contractId) return;
        setLoading(true);
        const res = await deleteContract(oldContract?.contractId);
        setLoading(false);
        if(res.success)
        {
            Alert.alert("Hợp đồng", "Xóa Hợp đồng thành công!");
            router.back();
        }
        else{
            Alert.alert("Hợp đồng", res.msg);
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
 const onDateChange =(event: any, selectedDate: any) => {
        const currentDate = selectedDate || contract.contractSign;
        setContract({...contract, contractSign: currentDate});
        setShowDatePicker(Platform.OS ==="ios"?true: false);
    };

    const fetchDataToCombobox = async () => {
      try {
        const formattedDataProject  = await GetProjectCombobox();
        setItemsProject(formattedDataProject);
        setLoadingProject(false);  

        const formattedDataCustomer  = await GetCustomerCombobox();
        setItemsCustomer(formattedDataCustomer);
        setLoadingCustomer(false); 

        const formattedDataEquipment  = await GetEpuipmentCombobox();
        setItemsEquipment(formattedDataEquipment);
        setLoadingEquipment(false); 

        const formattedDataUnitHiring  = await GetUnitHiringCombobox();
        setItemsUnitHiring(formattedDataUnitHiring);
        setLoadingUnitHiring(false); 

      } catch (error) {
        Alert.alert("Lỗi kết nối combo", "");
      }
    };
  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
        title={oldContract?.contractId?"Cập nhật Hợp đồng": "Thêm mới Hợp đồng"}
        leftIcon={<BackButton/>}
        style={{marginBottom:spacingY._10}}
        />
        {/** form */}
        <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}> 
             {/** Customer Code */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Mã hợp đồng</Typo> 
                <Input  
                    value={contract.contractCode} 
                    onChangeText={(value)=> setContract({...contract, 
                        contractCode:value
                    })}
                />  
            </View>
            {/** Contract date */} 
            <View style={styles.inputContainer}>
                 <Typo color={colors.neutral200}  size={16}>Ngày ký hợp đồng</Typo>
                {
                    !showDatePicker && (
                        <Pressable
                        style={styles.dateInput}
                        onPress={()=> setShowDatePicker(true)}
                        >
                            <Typo size={14}>
                                {new Date(contract?.contractSign as string).toLocaleDateString()}
                            </Typo>
                        </Pressable>
                    )
                }

                {
                    showDatePicker && (
                        <View style={Platform.OS ==="ios" && styles.iosDatePicker}>
                            <DateTimePicker 
                                themeVariant='dark'
                                value={contract.contractSign as Date}
                                textColor={colors.white}
                                mode='date'
                                display={Platform.OS ==="ios"?'spinner':"default"}
                                onChange={onDateChange}
                            />
                            {
                                Platform.OS ==="ios" && (
                                    <TouchableOpacity 
                                    style={styles.datePickerButton}
                                    onPress={()=> setShowDatePicker(false)}
                                    >
                                        <Typo size={15} fontWeight={"500"}>
                                            OK
                                        </Typo>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    )
                }
            </View>

            {/** Project */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Dự án </Typo> 
                <Dropdown
                    style={styles.dropdownContainer}
                    activeColor={colors.neutral700}
                    //placeholderStyle={styles.dropdownPlacehoder}
                    selectedTextStyle={styles.dropdownSelectedText} 
                    iconStyle={styles.dropdownIcon}
                    data={itemsProject}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    itemTextStyle={styles.dropdownItemText}
                    itemContainerStyle={styles.dropdownItemContainer}
                    containerStyle = {styles.dropdownListContainer}
                    // placeholder={!isFocus ? 'Select item' : '...'} 
                    value={contract.projectCode} 
                    onChange={item => {
                        setContract({...contract, projectCode: item.value})
                    }} 
                />
            </View>
            {/** Customer */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>NCC/NTP</Typo> 
                <Dropdown
                    style={styles.dropdownContainer}
                    activeColor={colors.neutral700}
                    //placeholderStyle={styles.dropdownPlacehoder}
                    selectedTextStyle={styles.dropdownSelectedText} 
                    iconStyle={styles.dropdownIcon}
                    data={itemsCustomer}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    itemTextStyle={styles.dropdownItemText}
                    itemContainerStyle={styles.dropdownItemContainer}
                    containerStyle = {styles.dropdownListContainer}
                    // placeholder={!isFocus ? 'Select item' : '...'} 
                    value={contract.customerId} 
                    onChange={item => {
                        setContract({...contract, customerId: item.value})
                    }} 
                />
            </View>

            {/** fax */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Loại thiết bị</Typo> 
                <Dropdown
                    style={styles.dropdownContainer}
                    activeColor={colors.neutral700}
                    //placeholderStyle={styles.dropdownPlacehoder}
                    selectedTextStyle={styles.dropdownSelectedText} 
                    iconStyle={styles.dropdownIcon}
                    data={itemsEquipment}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    itemTextStyle={styles.dropdownItemText}
                    itemContainerStyle={styles.dropdownItemContainer}
                    containerStyle = {styles.dropdownListContainer}
                    // placeholder={!isFocus ? 'Select item' : '...'} 
                    value={contract.equipmentTypeCode} 
                    onChange={item => {
                        setContract({...contract, equipmentTypeCode: item.value})
                    }} 
                />
            </View>

             {/** email */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Loại hình thuê</Typo> 
                <Dropdown
                    style={styles.dropdownContainer}
                    activeColor={colors.neutral700}
                    //placeholderStyle={styles.dropdownPlacehoder}
                    selectedTextStyle={styles.dropdownSelectedText} 
                    iconStyle={styles.dropdownIcon}
                    data={itemsUnitHiring}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    itemTextStyle={styles.dropdownItemText}
                    itemContainerStyle={styles.dropdownItemContainer}
                    containerStyle = {styles.dropdownListContainer}
                    // placeholder={!isFocus ? 'Select item' : '...'} 
                    value={contract.unitCode} 
                    onChange={item => {
                        setContract({...contract, unitCode: item.value})
                    }} 
                />
            </View>
            {/** contact */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Đơn giá</Typo> 
                <View
                    style={styles.containerText}
                    > 
                        <TextInput 
                            style={styles.textinputnumber }
                            placeholderTextColor={colors.neutral400}
                            keyboardType='numeric'
                            value={formatCurrency(contract.price?.toString()||"0")}
                            onChangeText={(value)=> setContract({...contract, 
                                price:Number(value.replace(/[^0-9]/g,""))
                            })}
                        /> 
                    </View>
                {/* <Input 
                    // placeholder='salary'
                    keyboardType='numeric'
                    value={contract.price?.toString()}
                    onChangeText={(value)=> setContract({...contract, 
                        price:Number(value.replace(/[^0-9]/g,""))
                    })}
                /> */}
            </View>
            <View style={styles.inputContainer}>
                 
                <Typo color={colors.neutral200}  size={16}>Tài xế</Typo>  
                <Input  
                    value={contract.driver} 
                    onChangeText={(value)=> setContract({...contract, 
                        driver:value
                    })}
                />
            </View>
             <View style={styles.inputContainer}>
                <View style={styles.flexRow}>
                    <Typo color={colors.neutral200}  size={16}>Ghi chú</Typo>
                    <Typo color={colors.neutral500}  size={14}>(Option)</Typo>
                </View>
                
                <Input  
                    value={contract.content}
                    multiline
                    containerStyle={{
                        flexDirection:"row",
                        height: verticalScale(100),
                        alignItems: "flex-start",
                        paddingVertical:15
                    }}
                    onChangeText={(value)=> setContract({...contract, 
                        content:value
                    })}
                />
            </View>
            
        </ScrollView>
      </View>
      <View style ={styles.footer}>
        {
            oldContract?.contractId && !loading &&  (
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
                    {oldContract?.contractId?"Cập nhật":"Lưu"}
                </Typo>
            </Button>
      </View>
    </ModalWrapper>
  )
}

export default ContractModal

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
    textinputnumber: {
        flex:1,
        color:colors.white,
        fontSize:verticalScale(14),
        textAlign:"right",
        alignItems:"flex-end"
    },
    containerText:{
        flexDirection:"row",
        height: verticalScale(54),
        alignItems:"center",
        justifyContent:"center",
        borderWidth:1,
        borderColor:colors.neutral300,
        borderRadius: radius._17,
        borderCurve:"continuous",
        paddingHorizontal:spacingX._15,
        gap: spacingX._10
    },
})