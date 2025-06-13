
import { Icon } from 'phosphor-react-native';
import React, { ReactNode } from "react";
import {
    TextInput,
    TextInputProps,
    TextProps,
    TextStyle,
    TouchableOpacityProps,
    ViewStyle
} from "react-native";

export type ScreenWrapperProps = {
    style?: ViewStyle;
    children: React.ReactNode;
    //bg?:string;
};

export type ModalWrapperProps = {
    style?: ViewStyle;
    children: React.ReactNode;
    bg?:string; 
};

export type accountOptionType = {
    title: string;
    icon: React.ReactNode;
    bgColor: string;
    routeName?:any;
};

export type TypoProps = {
    size?: number;
    color?:string;
    fontWeight?: TextStyle["fontWeight"];
    children: any|null;
    style?: TextStyle;
    textProps?: TextProps;
};

export type IconComponent = React.ComponentType<{
    height?:number;
    width?: number;
    strokeWidth?: number;
    color?: string;
    fill?: string;
}>;

export type IconProps = {
    name: string;
    color?: string;
    size?: number;
    strokeWidth?: number; 
    fill?: string;
};

export type HeaderProps = {
    title?: string;
    style?: ViewStyle;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
};

export type TransactionType = {
    id?: string;
    type: string;
    amount: number;
    category?: string;
    date: Date |  string;
    description?: string;
    image?: any;
    uid?: number;
    walletId: string;
};

export type CategoryType = {
    label: string;
    value: string;
    icon: Icon;
    bgColor: string;
};

export type ExpenseCategoriesType = {
    [key: string]:CategoryType;
};

export type TransactionListType = {
    data: TransactionType[];
    title?: string;
    loading?: boolean;
    emptyListMessage?: string;
};

export type TransactionItemProps = {
    item: TransactionType;
    index: number;
    handleClick: Function;
};

export interface InputProps extends TextInputProps {
    icon?: React.ReactNode;
    containerStyle?:ViewStyle;
    inputStyle?:TextStyle;
    inputRef?: React.RefObject<TextInput>;
}

export interface CustomButtonProps extends TouchableOpacityProps{
    style?: ViewStyle;
    onPress?: ()=>void;
    loading?:boolean;
    hasShadow?:boolean;
    children: React.ReactNode;
}

export type ImageUploadProps = {
    file?:any;
    onSelect: (file:any) =>void;
    onClear: ()=>void;
    containerStyle?:ViewStyle;
    imageStyle?:ViewStyle;
    placeholder?:string;
};

export type UserType = {
    userid?: number;
    username?: string|null;
    name:string|null;
    image?:any;
}|null;

export type UserDataType = {
    name: string;
    image?: any;
};

export type AuthContextType = {
    user: UserType;
    setUser:Function;
    login: (
        username:string,
        password: string 
    )=>Promise<{seccess: boolean; msg?:string}>;
    // register: (
    //     username:string,
    //     password: string,
    //     name: string
    // )=>Promise<{seccess: boolean; msg?:string}>;
    //updateUserData: (userId: number) => Promise<void>;
    logout: () => Promise<void>;
};

export type ResponseType = {
    success: boolean;
    data?: any;
    msg?: string;
};

export type WalletType = {
    id?: string;
    name: string;
    amount?:number;
    totalIncome?:number;
    totalExpenses?:number;
    image:any;
    userid?: number;
    created?:Date;
};

export type BackButtonProps = { 
    style?: ViewStyle;
    iconSize?: number;
};

export type CustomerType = {
    customerId?: string;
    customerCode: string;
    customerName: string; 
    address: string;
    phone: string;
    fax: string;
    email: string;
    contact: string; 
    image:any; 
};

export type CustomerListType = {
    data: CustomerType[];
    title?: string;
    loading?: boolean;
    emptyListMessage?: string;
};

export type CustomerItemProps = {
    item: CustomerType;
    index: number;
    handleClick: Function;
};
export type CustomerProps = {
  data: CustomerType[];
};

export type EquipmentTypeType = {
    equipmentTypeCode: string;
    equipmentTypeName: string;
    productName: string; 
    licensePlate: string;
    yearOfManufacture: string;
    countryOfManufacture: string;
    description: string; 
    isCreate: string;
    image:any;  
};

export type EquipmentTypeList = {
    data: EquipmentTypeType[];
    title?: string;
    loading?: boolean;
    emptyListMessage?: string;
};

export type EquipmentTypeItemProps = {
    item: EquipmentTypeType;
    index: number;
    handleClick: Function;
};
export type EquipmentTypeProps = {
  data: EquipmentTypeType[];
};

export type ContractType = {
    contractId: string;
    contractCode: string;
    contractSign?: Date |  string; 
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
    price?:number; 
    driver: string;
    carCode: string;
    description: string;
    image:any;  
};

export type ContractListType = {
    data: ContractType[];
    title?: string;
    loading?: boolean;
    emptyListMessage?: string;
};

export type ContractItemProps = {
    item: ContractType;
    index: number;
    handleClick: Function;
};
export type ContractTypeProps = {
  data: ContractType[];
};

export type DropdownType = {
    label: string;
    value: string; 
};

export type InputFuelType = {
    inputFuelId: string; 
    dateOfSupply?: Date |  string;  
    projectCode: string;
    projectName: string;
    customerId: string;
    customerCode: string;
    customerName: string;
    fuelTypeCode: string; 
    fuelTypeName: string; 
    quantity?:number; 
    price?:number; 
    amount?:number; 
    startDate?: Date |  string;  
    endDate?: Date |  string;  
    description: string;
    image:any;  
};

export type InputFuelListType = {
    data: InputFuelType[];
    title?: string;
    loading?: boolean;
    emptyListMessage?: string;
};

export type InputFuelItemProps = {
    item: InputFuelType;
    index: number;
    handleClick: Function;
};
export type InputFuelTypeProps = {
  data: InputFuelType[];
};

export type FuelSupplyType = {
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
    dateOfSupply?: Date |  string;  
    quantity?:number; 
    price?:number; 
    amount?:number;  
    month?:number;  
    year?:number;  
    description: string;
    image:any;  
};

export type FuelSupplyListType = {
    data: FuelSupplyType[];
    title?: string;
    loading?: boolean;
    emptyListMessage?: string;
};

export type FuelSupplyItemProps = {
    item: FuelSupplyType;
    index: number;
    handleClick: Function;
};
export type FuelSupplyTypeProps = {
  data: FuelSupplyType[];
};


export type EquipmentRentalTrackingType = {
    trackingId: string;  
    projectCode: string;
    projectName: string;
    contractId: string;
    contractCode: string;
    carCode: string;
    licensePlate: string;
    typeHiringCode: string; 
    typeHiringName: string;  
    dateTracking?: Date |  string;  
    timesFrom: Date ;  
    timesTo: Date ;  
    dateTimesFrom: Date ;  
    dateTimesTo: Date ; 
    timesFromLocal: string ;  
    timesToLocal: string ;  
    timeWorks?:number; 
    shirtWorks?:number;  
    price:number; 
    amount?:number;  
    deduction?:number;  
    classify1: string;
    classify2: string;
    worksContent: string;
    constructionSite: string;
    description: string;
    image:any;  
};

export type EquipmentRentalTrackingListType = {
    data: EquipmentRentalTrackingType[];
    title?: string;
    loading?: boolean;
    emptyListMessage?: string;
};

export type EquipmentRentalTrackingItemProps = {
    item: EquipmentRentalTrackingType;
    index: number;
    handleClick: Function;
};
export type EquipmentRentalTrackingTypeProps = {
  data: EquipmentRentalTrackingType[];
};