import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Header from '@/components/Header';
import ImageToUpload from '@/components/ImageToUpload';
import Input from '@/components/Input';
import ModalWrapper from '@/components/ModalWrapper';
import Typo from '@/components/Typo';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { GetContractByProjectCombobox, GetProjectCombobox } from '@/services/categoryService';
import { GetContractDetailByContractId } from '@/services/contractService';
import { createOrUpdateTrackingCarDay, deleteTrackingCarDay } from '@/services/trackingCarDayService';
import { EquipmentRentalTrackingType } from '@/types';
import { formatCurrency } from '@/utils/common';
import { scale, verticalScale } from '@/utils/styling';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


const EquipmentRentalTrackingModal = () => {
    //const {user} = useAuth();

    //const router = useRouter();

    // Project 
    const [itemsProject, setItemsProject] = useState<{ label: string; value: string | number }[]>([]);
    const [loadingProject, setLoadingProject] = useState(true);

     // Fuel combobox
     const [itemsContract, setItemsContract] = useState<{ label: string; value: string | number }[]>([]);
     const [loadingCustomer, setLoadingCustomer] = useState(true);


    const [equipmentTracking, setEquipmentTracking] = useState<EquipmentRentalTrackingType>({
        trackingId : "", 
        dateTracking: new Date(),  
        projectCode:"", 
        projectName:"", 
        contractId:"", 
        contractCode:"",
        carCode:"",
        licensePlate:"",
        typeHiringCode: "",
        typeHiringName: "", 
        timesFrom: new Date(),  
        timesTo: new Date(),  
        dateTimesFrom: new Date(),  
        dateTimesTo: new Date(),  
        timesFromLocal: "" , 
        timesToLocal: "" ,
        timeWorks:0,
        shirtWorks:0,
        price:0,
        amount:0, 
        deduction:0, 
        classify1: "",
        classify2: "",
        worksContent: "",
        constructionSite: "",
        description: "",
        image : null,
    });
    const [loading, setLoading] = useState(false); 
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [timeWorksCurrent, setTimeWorksCurrent] = useState(0);
    const [typeHiringCodeCurrent, setTypeHiringCodeCurrent] = useState("");
    const [typeHiringNameCurrent, setTypeHiringNameCurrent] = useState("");
    const [priceChoose, setPriceChoose] = useState(0);
    const [amountTotal, setAmountTotal] = useState(0); 
    // const [dateTimesToLocal, setDateTimesToLocal] = useState(new Date()); 
    // const [dateTimesFromLocal, setDateTimesFromLocal] = useState(new Date()); 
    const router = useRouter();

    type paramType = {
        trackingId: string;  
        projectCode: string;
        projectName: string;
        contractId: string;
        contractCode: string;
        carCode: string;
        licensePlate: string;
        typeHiringCode: string; 
        typeHiringName: string; 
        dateTracking: string; 
        timesFrom: string; 
        timesTo: string;  
        timesFromLocal: string; 
        timesToLocal: string;  
        timeWorks: string;
        shirtWorks: string;
        price:string; 
        amount: string;
        deduction:string;  
        classify1:string;  
        classify2:string;  
        worksContent:string;  
        constructionSite:string;  
        description: string;
        image:any;  
    };

    //let o : paramType = useLocalSearchParams();
    const oldEquipmentTracking : paramType = useLocalSearchParams();
 
    useEffect(()=>{
        if(oldEquipmentTracking?.trackingId){
            setEquipmentTracking({
                trackingId: oldEquipmentTracking?.trackingId, 
                dateTracking: new Date(oldEquipmentTracking.dateTracking as string),  
                projectCode: oldEquipmentTracking.projectCode || "", 
                projectName: oldEquipmentTracking.projectName || "", 
                contractId: oldEquipmentTracking.contractId || "", 
                contractCode: oldEquipmentTracking.contractCode || "",  
                carCode: oldEquipmentTracking.carCode || "",
                licensePlate: oldEquipmentTracking.licensePlate || "",
                typeHiringCode: oldEquipmentTracking.typeHiringCode || "", 
                typeHiringName: oldEquipmentTracking.typeHiringName || "",   
                timesFrom: new Date(oldEquipmentTracking.timesFrom as string), 
                timesTo: new Date(oldEquipmentTracking.timesTo as string),    
                dateTimesFrom: new Date(oldEquipmentTracking.timesFrom as string), 
                dateTimesTo: new Date(oldEquipmentTracking.timesTo as string),    
                timesFromLocal: oldEquipmentTracking.timesFromLocal, 
                timesToLocal: oldEquipmentTracking.timesToLocal,    
                timeWorks:  Number(oldEquipmentTracking.timeWorks),  
                shirtWorks:  Number(oldEquipmentTracking.shirtWorks), 
                price:  Number(oldEquipmentTracking.price),  
                amount:  Number(oldEquipmentTracking.amount),   
                deduction:  Number(oldEquipmentTracking.deduction),   
                classify1: oldEquipmentTracking.classify1 || "",   
                classify2: oldEquipmentTracking.classify2 || "",   
                worksContent: oldEquipmentTracking.worksContent || "",   
                constructionSite: oldEquipmentTracking.constructionSite || "",   
                description: oldEquipmentTracking.description || "",   
                image: oldEquipmentTracking?.image,
            });
            setPriceChoose(Number(oldEquipmentTracking.price));
            setAmountTotal(Number(oldEquipmentTracking.amount));
            setTimeWorksCurrent(Number(oldEquipmentTracking.timeWorks));
            setTypeHiringNameCurrent(oldEquipmentTracking.typeHiringName);
            setTypeHiringCodeCurrent(oldEquipmentTracking.typeHiringCode);
            // setDateTimesFromLocal( new Date(oldEquipmentTracking.timesFrom));
            // setDateTimesToLocal( new Date(oldEquipmentTracking.timesTo));
        }
        fetchDataToCombobox();
    },[]);
 
    const onSubmit = async()=>{
         const {trackingId,dateTracking,projectCode, projectName, contractId,contractCode,carCode,licensePlate,typeHiringCode,typeHiringName, timesFrom,timesTo,
            timeWorks,shirtWorks,price,deduction,classify1,classify2,worksContent,constructionSite,description,image} = equipmentTracking;
             
            const timeFromLocal = timesFrom.toLocaleTimeString();
            const timeToLocal = timesTo?.toLocaleTimeString();
            console.log(timeFromLocal);
            console.log(timeToLocal);
         if(!projectCode || !dateTracking ||  !contractId
            || !amountTotal || !priceChoose || !timesFrom || !timesTo || !worksContent
          )
          {
            Alert.alert("Hợp đồng", "Bạn phải chọn đầy đủ thông tin!");
            return;
         }
         console.log("Ok rooi di tiep thoi");

         let equipmentTrackingData: EquipmentRentalTrackingType = {
            trackingId,dateTracking,projectCode, projectName, contractId,contractCode,carCode,licensePlate,
            typeHiringCode:typeHiringCodeCurrent,typeHiringName,
            timesFrom,timesTo,
            dateTimesFrom:timesFrom ,dateTimesTo:timesTo,
            timesFromLocal:timeFromLocal,timesToLocal:timeToLocal,
            timeWorks:timeWorksCurrent,shirtWorks,
            amount:amountTotal,price:priceChoose,
            deduction,classify1,classify2,worksContent,constructionSite,description,
            image: image? image:null, 
         }
         if(oldEquipmentTracking?.trackingId) equipmentTrackingData.trackingId = oldEquipmentTracking.trackingId;
         setLoading(true);
         const res = await createOrUpdateTrackingCarDay(equipmentTrackingData);
         //console.log("Customer data:", equipmentTrackingData);

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
        if(!oldEquipmentTracking?.trackingId) return;
        setLoading(true);
        const res = await deleteTrackingCarDay(oldEquipmentTracking?.trackingId);
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
        const currentDate = selectedDate || equipmentTracking.dateTracking;
        setEquipmentTracking({...equipmentTracking, dateTracking: currentDate});
        setShowDatePicker(Platform.OS ==="ios"?true: false);
        
    };

     const showStartTimePicker  =(event: any, selectedDate: any) => {
        const currentStartTime = selectedDate || equipmentTracking.timesFrom;
        const currentEndTime =  equipmentTracking.timesTo; 
        setEquipmentTracking({...equipmentTracking, timesFrom: currentStartTime}); 
        setShowStartDatePicker(Platform.OS ==="ios"?true: false);
        const diffMs = currentEndTime.getTime() - currentStartTime.getTime(); 
        const seconds = Math.floor((diffMs / 1000) % 60);
        const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        console.log(`${hours}h ${minutes}m ${seconds}s`);
         const timeWorksSet =  parseFloat((hours + minutes/60).toFixed(2));
        setTimeWorksCurrent(timeWorksSet);  
        
        CalculationTotalAmount(timeWorksSet);
    };

    const showEndTimePicker  =(event: any, selectedDate: any) => {
        const currentStartTime =  equipmentTracking.timesFrom;
        const currentEndTime = selectedDate || equipmentTracking.timesTo; 
        setEquipmentTracking({...equipmentTracking, timesTo: currentEndTime});
        setShowEndDatePicker(Platform.OS ==="ios"?true: false);
        const diffMs = currentEndTime.getTime() - currentStartTime.getTime(); 
        const seconds = Math.floor((diffMs / 1000) % 60);
        const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        console.log(`${hours}h ${minutes}m ${seconds}s`);
        //setEquipmentTracking({...equipmentTracking, timeWorks: hours});
        const timeWorksSet =  parseFloat((hours + minutes/60).toFixed(2));
        setTimeWorksCurrent(timeWorksSet);  
        
        CalculationTotalAmount(timeWorksSet);
    };

    const CalculationTotalAmount =(timeWorksSet : number) =>{
        const currentUnitHiring = typeHiringCodeCurrent;
        const currentPrice =  priceChoose; 

        if(currentUnitHiring ==="thuethang")
        {
            console.log(currentPrice);
            console.log(timeWorksSet);
            const currentAmount  = parseFloat( ((currentPrice/240) * timeWorksSet).toFixed(0));
            console.log('Selected item thuethang:', currentAmount);
            setAmountTotal(currentAmount); 
        }
        else if(currentUnitHiring ==="thueca")
        {
            const currentAmount  = parseFloat( (currentPrice * timeWorksSet).toFixed(0));
            console.log('Selected item thueca:', currentAmount);
            setAmountTotal(currentAmount); 
        }
        else{
            const currentAmount  = parseFloat( (currentPrice * timeWorksSet).toFixed(0));
            console.log('Selected item ddieeuf hanh:', currentAmount);
            setAmountTotal(currentAmount); 
        }
       
    }
 
   const handleDropdownProjectChange = async (item: any) => {
        console.log('hau');
        setEquipmentTracking({...equipmentTracking, projectCode: item.value})
        console.log('Selected item:', item.value);
        const formattedDataContract  = await GetContractByProjectCombobox(item.value);
        setItemsContract(formattedDataContract);
        setLoadingCustomer(false); 
    };  

    const handleDropdownContractChange = async (item: any) => { 
        
        console.log('Selected item:', item.value);
        setEquipmentTracking({...equipmentTracking, contractId: item.value})
        const dataContract  = await GetContractDetailByContractId(item.value); 
        const priceString = String(dataContract.price);
        setPriceChoose(parseFloat(priceString));
        //setEquipmentTracking({...equipmentTracking, price: parseFloat(priceString)}); 
        setTypeHiringNameCurrent(dataContract.unitName);
        setTypeHiringCodeCurrent(dataContract.unitCode);
        //setEquipmentTracking({...equipmentTracking, typeHiringName: formattedDataContract.unitName});
        //setEquipmentTracking({...equipmentTracking, typeHiringName: formattedDataContract.equipmentTypeName});
        //console.log(formattedDataContract);
        CalculationTotalAmount(timeWorksCurrent);
    };  

    const fetchDataToCombobox = async () => {
      try {
        const formattedDataProject  = await GetProjectCombobox();
        setItemsProject(formattedDataProject);
        setLoadingProject(false);  

        const formattedDataContract  = await GetContractByProjectCombobox(oldEquipmentTracking.projectCode);
        setItemsContract(formattedDataContract);
        setLoadingCustomer(false);  
      
      } catch (error: any) {
        Alert.alert("Lỗi kết nối combo", error.message);
      }
    };

    
  
  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
        title={oldEquipmentTracking?.trackingId?"Cập nhật nhật ký": "Thêm mới nhật ký"}
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
                    value={equipmentTracking.projectCode} 
                    onChange={(item: any)=>{
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
                    value={equipmentTracking.contractId} 
                    onChange={(item: any) => { handleDropdownContractChange(item)
                    }} 
                />
            </View>
             {/** Loại hình thuê */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Loại hình thuê</Typo> 
                <Input 
                    // placeholder='salary' 
                    value={typeHiringNameCurrent} 
                    editable={false}
                /> 
            </View>
 
             {/** Price */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Đơn giá</Typo> 
                <View
                    style={styles.containerText}
                    > 
                      <TextInput 
                        style={styles.textinputnumber }
                        placeholderTextColor={colors.neutral400}
                        keyboardType='numeric'
                        value={formatCurrency(priceChoose.toString())}
                         editable={false}
                      /> 
                    </View>
                 
            </View>
             {/** Amount */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Thành tiền</Typo> 
                <View
                    style={styles.containerText}
                    > 
                      <TextInput 
                        style={styles.textinputnumber }
                        placeholderTextColor={colors.neutral400}
                        keyboardType='numeric'
                        value={formatCurrency(amountTotal.toString())}
                        onChangeText={(value)=>  setAmountTotal(parseFloat(formatCurrency(value)))}
                      /> 
                    </View>
                
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
                                {new Date(equipmentTracking?.dateTracking as string).toLocaleDateString()}
                            </Typo>
                        </Pressable>
                    )
                }

                {
                    showDatePicker && (
                        <View style={Platform.OS ==="ios" && styles.iosDatePicker}>
                            <DateTimePicker 
                                themeVariant='dark'
                                value={equipmentTracking.dateTracking as Date}
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
                <Typo color={colors.neutral200}  size={16}>Bắt đầu</Typo> 
                {
                    !showStartDatePicker && (
                        <Pressable
                        style={styles.dateInput}
                        onPress={()=> setShowStartDatePicker(true)}
                        >
                            <Typo size={14}>
                                {new Date(equipmentTracking?.timesFrom).toLocaleTimeString()}
                            </Typo>
                        </Pressable>
                    )
                }

                {
                    showStartDatePicker && (
                        <View style={Platform.OS ==="ios" && styles.iosDatePicker}>
                            <DateTimePicker 
                                themeVariant='dark'
                                value={equipmentTracking.timesFrom as Date}
                                textColor={colors.white}
                                mode='time'
                                display={Platform.OS ==="ios"?'spinner':"default"}
                                onChange={showStartTimePicker}
                            />
                            {
                                Platform.OS ==="ios" && (
                                    <TouchableOpacity 
                                    style={styles.datePickerButton}
                                    onPress={()=> setShowStartDatePicker(false)}
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

            {/** Kết thúc*/} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Kết thúc</Typo> 
                {
                    !showEndDatePicker && (
                        <Pressable
                        style={styles.dateInput}
                        onPress={()=> setShowEndDatePicker(true)}
                        >
                            <Typo size={14}>
                                {new Date(equipmentTracking?.timesTo).toLocaleTimeString()}
                            </Typo>
                        </Pressable>
                    )
                }

                {
                    showEndDatePicker && (
                        <View style={Platform.OS ==="ios" && styles.iosDatePicker}>
                            <DateTimePicker 
                                themeVariant='dark'
                                value={equipmentTracking.timesTo as Date}
                                textColor={colors.white}
                                mode='time'
                                display={Platform.OS ==="ios"?'spinner':"default"}
                                onChange={showEndTimePicker}
                            />
                            {
                                Platform.OS ==="ios" && (
                                    <TouchableOpacity 
                                    style={styles.datePickerButton}
                                    onPress={()=> setShowEndDatePicker(false)}
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
             {/** Kết thúc*/} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Thời gian</Typo> 
                <Input 
                    // placeholder='salary'
                    keyboardType='numeric'
                    value={timeWorksCurrent?.toString()}
                    //editable={false}
                    // onChangeText={(value)=> setEquipmentTracking({...equipmentTracking, 
                    //     timeWorks:Number(value.replace(/[^0-9]/g,""))
                    // })}
                />
            </View>
            {/** Số ca*/} 
            {/* <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Số ca</Typo> 
                <Input 
                    // placeholder='salary'
                    keyboardType='numeric'
                    value={equipmentTracking.shirtWorks?.toString()}
                    onChangeText={(value)=> setEquipmentTracking({...equipmentTracking, 
                        shirtWorks:Number(value.replace(/[^0-9]/g,""))
                    })}
                />
            </View> */}
            {/** Khấu trừ*/} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Khấu trừ</Typo> 
                <View
                    style={styles.containerText}
                    > 
                      <TextInput 
                        style={styles.textinputnumber }
                        placeholderTextColor={colors.neutral400}
                        keyboardType='numeric'
                        value={formatCurrency(equipmentTracking.deduction?.toString()||"0")}
                        onChangeText={(value)=> setEquipmentTracking({...equipmentTracking, 
                            deduction:Number(value.replace(/[^0-9]/g,""))
                        })}
                      /> 
                    </View>
                {/* <Input 
                    // placeholder='salary'
                    keyboardType='numeric'
                    value={formatCurrency(equipmentTracking.deduction?.toString()||"0")}
                    onChangeText={(value)=> setEquipmentTracking({...equipmentTracking, 
                        deduction:Number(value.replace(/[^0-9]/g,""))
                    })}
                /> */}
            </View>
            {/** Phân loại 1 */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Phân loại 1</Typo> 
                <Input  
                    value={equipmentTracking.classify1} 
                    onChangeText={(value)=> setEquipmentTracking({...equipmentTracking, 
                        classify1:value
                    })}
                />  
            </View>
             {/** Phân loại 2 */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Phân loại 2</Typo> 
                <Input  
                    value={equipmentTracking.classify2} 
                    onChangeText={(value)=> setEquipmentTracking({...equipmentTracking, 
                        classify2:value
                    })}
                />  
            </View>
            {/** Nội dung công việc */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Nội dung công việc</Typo>  
                <Input  
                    value={equipmentTracking.worksContent} 
                    onChangeText={(value)=> setEquipmentTracking({...equipmentTracking, 
                        worksContent:value
                    })}
                />
            </View>
            {/** Vị trí */} 
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}  size={16}>Vị trí</Typo> 
                <Input  
                    value={equipmentTracking.constructionSite} 
                    onChangeText={(value)=> setEquipmentTracking({...equipmentTracking, 
                        constructionSite:value
                    })}
                />  
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.flexRow}>
                    <Typo color={colors.neutral200} size={16}>Hình ảnh</Typo>
                </View>
                 
                {/** image input */}
                <ImageToUpload  
                file={equipmentTracking.image} 
                onClear={()=>setEquipmentTracking({...equipmentTracking,image: null})}
                onSelect={(file: any)=> setEquipmentTracking({...equipmentTracking, image:file})}
                    placeholder='Tai hinh anh'

                    />
            </View>
        </ScrollView>
      </View>
      <View style ={styles.footer}>
        {
            oldEquipmentTracking?.trackingId && !loading &&  (
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
                    {oldEquipmentTracking?.trackingId?"Cập nhật":"Lưu"}
                </Typo>
            </Button>
      </View>
    </ModalWrapper>
  )
}

export default EquipmentRentalTrackingModal

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

    textinput: {
        flex:1,
        color:colors.white,
        fontSize:verticalScale(14),
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