import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Header from '@/components/Header';
import ImageToUpload from '@/components/ImageToUpload';
import ModalWrapper from '@/components/ModalWrapper';
import Typo from '@/components/Typo';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { GetContractByProjectCombobox, GetFuelTypeCombobox, GetProjectCombobox } from '@/services/categoryService';
import { createOrUpdateFuelSupply, deleteFuelSupply } from '@/services/fuelSupplyService';
import { FuelSupplyType } from '@/types';
import { formatCurrency } from '@/utils/common';
import { scale, verticalScale } from '@/utils/styling';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


const FuelSupplyModal = () => {
   

    // Project 
    const [openProject, setOpenProject] = useState(false);
    const [valueProject, setValueProject] = useState(null);
    const [itemsProject, setItemsProject] = useState<{ label: string; value: string | number }[]>([]);
    const [loadingProject, setLoadingProject] = useState(true);
    const [projectError, setProjectError] = useState('');

     // Fuel combobox
     const [openCustomer, setOpenCustomer] = useState(false);
     const [valueCustomer, setValueCustomer] = useState(null);
     const [itemsContract, setItemsContract] = useState<{ label: string; value: string | number }[]>([]);
     const [loadingCustomer, setLoadingCustomer] = useState(true);
     const [customerError, setCustomerError] = useState('');

    // Fuel combobox
     
    const [itemsFuel, setItemsFuel] = useState<{ label: string; value: string | number }[]>([]);
    const [loadingFuel, setLoadingFuel] = useState(true);

    const [fuelSupply, setFuelSupply] = useState<FuelSupplyType>({
        fuelSupplyId : "", 
        dateOfSupply: new Date(),  
        projectCode:"", 
        projectName:"", 
        contractId:"", 
        contractCode:"",
        carCode:"",
        licensePlate:"",
        equipmentTypeCode: "",
        equipmentTypeName: "", 
        fuelTypeCode: "",
        fuelTypeName: "", 
        quantity:0,
        price:0,
        amount:0, 
        month:0,
        year:0, 
        description: "",
        image : null,
    });
    const [loading, setLoading] = useState(false); 
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [amountTotal, setAmountTotal] = useState(0); 
    const router = useRouter();

    type paramType = {
        fuelSupplyId: string;  
        projectCode: string;
        projectName: string;
        contractId: string;
        contractCode: string;
        carCode: string;
        licensePlate: string;
        equipmentTypeCode: string; 
        equipmentTypeName: string; 
        fuelTypeCode: string; 
        fuelTypeName: string; 
        dateOfSupply: string;  
        quantity: string;
        price:string; 
        amount: string;
        month:string;  
        year:string;  
        description: string;
        image:any;  
    };

    //let o : paramType = useLocalSearchParams();
    const oldFuelSupply : paramType = useLocalSearchParams();
 
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
        if(oldFuelSupply?.fuelSupplyId){
            setFuelSupply({
                fuelSupplyId: oldFuelSupply?.fuelSupplyId, 
                dateOfSupply: new Date(oldFuelSupply.dateOfSupply as string),  
                projectCode: oldFuelSupply.projectCode || "", 
                projectName: oldFuelSupply.projectName || "", 
                contractId: oldFuelSupply.contractId || "", 
                contractCode: oldFuelSupply.contractCode || "",  
                carCode: oldFuelSupply.carCode || "",
                licensePlate: oldFuelSupply.licensePlate || "",
                equipmentTypeCode: oldFuelSupply.equipmentTypeCode || "", 
                equipmentTypeName: oldFuelSupply.equipmentTypeName || "",   
                fuelTypeCode: oldFuelSupply.fuelTypeCode || "", 
                fuelTypeName: oldFuelSupply.fuelTypeName || "",   
                quantity:  Number(oldFuelSupply.quantity),  
                price:  Number(oldFuelSupply.price),  
                amount:  Number(oldFuelSupply.amount),   
                month:  Number(oldFuelSupply.month),  
                year:  Number(oldFuelSupply.year),   
                description: oldFuelSupply.description || "",   
                image: oldFuelSupply?.image,
            });
            setAmountTotal(Number(oldFuelSupply.amount));
        }
        fetchDataToCombobox();
    },[]);
 
    const onSubmit = async()=>{
         const {fuelSupplyId,dateOfSupply,projectCode, projectName, contractId,contractCode,carCode,licensePlate,
            equipmentTypeCode,equipmentTypeName,fuelTypeCode,fuelTypeName,
            quantity,amount,price,month,year,description,image} = fuelSupply;
         if(! projectCode || !dateOfSupply || !projectCode || !contractId || !fuelTypeCode
            || !quantity || !price
          )
          {
            Alert.alert("Hợp đồng", "Bạn phải chọn đầy đủ thông tin!");
            return;
         }
         console.log("Ok rooi di tiep thoi");

         let fuelSupplyData: FuelSupplyType = {
            fuelSupplyId,dateOfSupply,projectCode, projectName, contractId,contractCode,carCode,licensePlate,
            equipmentTypeCode,equipmentTypeName,fuelTypeCode,fuelTypeName, quantity,amount:amountTotal
            ,price,month,year,description,
            image: image? image:null, 
         }
         if(oldFuelSupply?.fuelSupplyId) fuelSupplyData.fuelSupplyId = oldFuelSupply.fuelSupplyId;
         setLoading(true);
         const res = await createOrUpdateFuelSupply(fuelSupplyData);
         console.log("Customer data:", fuelSupplyData);

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
        if(!oldFuelSupply?.fuelSupplyId) return;
        setLoading(true);
        const res = await deleteFuelSupply(oldFuelSupply?.fuelSupplyId);
        setLoading(false);
        if(res.success)
        {
            Alert.alert("Nhập nhiên liệu", "Xóa nhập nhiên liệu thành công!");
            router.back();
        }
        else{
            Alert.alert("Nhập nhiên liệu", res.msg);
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
 const onDateOfSupplyChange =(event: any, selectedDate: any) => {
        const currentDate = selectedDate || fuelSupply.dateOfSupply;
        setFuelSupply({...fuelSupply, dateOfSupply: currentDate});
        setShowDatePicker(Platform.OS ==="ios"?true: false);
    };

   const handleDropdownProjectChange = async (item: any) => {
        console.log('hau');
        setFuelSupply({...fuelSupply, projectCode: item.value})
        console.log('Selected item:', item.value);
        const formattedDataContract  = await GetContractByProjectCombobox(item.value);
        console.log(formattedDataContract);
        setItemsContract(formattedDataContract);
        setLoadingCustomer(false); 
    };  

    const fetchDataToCombobox = async () => {
      try {
        const formattedDataProject  = await GetProjectCombobox();
        setItemsProject(formattedDataProject);
        setLoadingProject(false);  

        const formattedDataContract  = await GetContractByProjectCombobox(oldFuelSupply.projectCode);
        setItemsContract(formattedDataContract);
        setLoadingCustomer(false); 

        const formattedDataFuel  = await GetFuelTypeCombobox();
        setItemsFuel(formattedDataFuel);
        setLoadingFuel(false);  
      
      } catch (error) {
        Alert.alert("Lỗi kết nối combo", "");
      }
    };

    const handleQuantityChange  =(input:string) => {
        setFuelSupply({...fuelSupply, quantity: Number(input.replace(/[^0-9]/g,""))}); 
        CalculationTotalAmount();
    }

     const handlePriceChange  =(input:string) => {
        setFuelSupply({...fuelSupply, price: Number(input.replace(/[^0-9]/g,""))});
        CalculationTotalAmount();
    }

    const CalculationTotalAmount =() =>{
        const currentquantity = fuelSupply.quantity;
        const currentPrice =  fuelSupply.price;
        const currentAmount  = ((currentquantity??0) * (currentPrice??0)); 
        //setBuyfuel({...buyfuel, amount: currentAmount});
        setAmountTotal(currentAmount); 
    }
  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
        title={oldFuelSupply?.fuelSupplyId?"Cập nhật cấp nhiên liệu": "Thêm mới cấp nhiên liệu"}
        leftIcon={<BackButton/>}
        style={{marginBottom:spacingY._10}}
        />
        {/** form */}
        <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}> 
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
                    value={fuelSupply.projectCode} 
                    onChange={(item)=>{
                        handleDropdownProjectChange(item)
                    }} 
                />
            </View>
            {/** Project */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Mã xe </Typo> 
                <Dropdown
                    style={styles.dropdownContainer}
                    activeColor={colors.neutral700}
                    //placeholderStyle={styles.dropdownPlacehoder}
                    selectedTextStyle={styles.dropdownSelectedText} 
                    iconStyle={styles.dropdownIcon}
                    data={itemsContract}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    itemTextStyle={styles.dropdownItemText}
                    itemContainerStyle={styles.dropdownItemContainer}
                    containerStyle = {styles.dropdownListContainer}
                    // placeholder={!isFocus ? 'Select item' : '...'} 
                    value={fuelSupply.contractId} 
                    onChange={item => {
                        setFuelSupply({...fuelSupply, contractId: item.value})
                    }} 
                />
            </View>

            {/** FuelType */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Loại nhiên liệu</Typo> 
                <Dropdown
                    style={styles.dropdownContainer}
                    activeColor={colors.neutral700}
                    //placeholderStyle={styles.dropdownPlacehoder}
                    selectedTextStyle={styles.dropdownSelectedText} 
                    iconStyle={styles.dropdownIcon}
                    data={itemsFuel}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    itemTextStyle={styles.dropdownItemText}
                    itemContainerStyle={styles.dropdownItemContainer}
                    containerStyle = {styles.dropdownListContainer}
                    // placeholder={!isFocus ? 'Select item' : '...'} 
                    value={fuelSupply.fuelTypeCode} 
                    onChange={item => {
                        setFuelSupply({...fuelSupply, fuelTypeCode: item.value})
                    }} 
                />
            </View>

            {/** Contract date */} 
            <View style={styles.inputContainer}>
                 <Typo color={colors.neutral200}  size={16}>Ngày cấp</Typo>
                {
                    !showDatePicker && (
                        <Pressable
                        style={styles.dateInput}
                        onPress={()=> setShowDatePicker(true)}
                        >
                            <Typo size={14}>
                                {new Date(fuelSupply?.dateOfSupply as string).toLocaleDateString()}
                            </Typo>
                        </Pressable>
                    )
                }

                {
                    showDatePicker && (
                        <View style={Platform.OS ==="ios" && styles.iosDatePicker}>
                            <DateTimePicker 
                                themeVariant='dark'
                                value={fuelSupply.dateOfSupply as Date}
                                textColor={colors.white}
                                mode='date'
                                display={Platform.OS ==="ios"?'spinner':"default"}
                                onChange={onDateOfSupplyChange}
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
 
            {/** Quantity */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Số lượng</Typo>
                <View style={styles.containerText} > 
                    <TextInput 
                        style={styles.textinputnumber }
                        placeholderTextColor={colors.neutral400}
                        keyboardType='numeric'
                        value={formatCurrency(fuelSupply.quantity?.toString()||"0")}
                        onChangeText={(value)=>  {handleQuantityChange(value)}}
                    /> 
                </View> 
                {/* <Input 
                    // placeholder='salary'
                    keyboardType='numeric'
                    value={fuelSupply.quantity?.toString()}
                    onChangeText={(value)=> setFuelSupply({...fuelSupply, 
                        quantity:Number(value.replace(/[^0-9]/g,""))
                    })}
                /> */}
            </View>
             {/** Price */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Đơn giá</Typo> 
                <View style={styles.containerText} > 
                    <TextInput 
                        style={styles.textinputnumber }
                        placeholderTextColor={colors.neutral400}
                        keyboardType='numeric'
                        value={formatCurrency(fuelSupply.price?.toString()||"0")}
                        onChangeText={(value)=> {handlePriceChange(value)}}
                    /> 
                </View> 
                {/* <Input 
                    // placeholder='salary'
                    keyboardType='numeric'
                    value={fuelSupply.price?.toString()}
                    onChangeText={(value)=> setFuelSupply({...fuelSupply, 
                        price:Number(value.replace(/[^0-9]/g,""))
                    })}
                /> */}
            </View>
             {/** Amount */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Thành tiền</Typo> 
                <View style={styles.containerText}  > 
                    <TextInput 
                        style={styles.textinputnumber }
                        placeholderTextColor={colors.neutral400}
                        keyboardType='numeric'
                        value={formatCurrency(amountTotal.toString())}
                        onChangeText={(value)=> setAmountTotal(Number(value))}
                    /> 
                </View>
                {/* <Input 
                    // placeholder='salary'
                    keyboardType='numeric'
                    value={fuelSupply.amount?.toString()}
                    onChangeText={(value)=> setFuelSupply({...fuelSupply, 
                        amount:Number(value.replace(/[^0-9]/g,""))
                    })}
                /> */}
            </View> 
            <View style={styles.inputContainer}>
                <View style={styles.flexRow}>
                    <Typo color={colors.neutral200} size={16}>Hình ảnh</Typo>
                </View>
                 
                {/** image input */}
                <ImageToUpload  
                    file={fuelSupply.image} 
                    onClear={()=>setFuelSupply({...fuelSupply,image: null})}
                    onSelect={(file)=> setFuelSupply({...fuelSupply, image:file})}
                        placeholder='Tai hinh anh'

                    />
            </View>
        </ScrollView>
      </View>
      <View style ={styles.footer}>
        {
            oldFuelSupply?.fuelSupplyId && !loading &&  (
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
                    {oldFuelSupply?.fuelSupplyId?"Cập nhật":"Lưu"}
                </Typo>
            </Button>
      </View>
    </ModalWrapper>
  )
}

export default FuelSupplyModal

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