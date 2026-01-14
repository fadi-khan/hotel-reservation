import { BedType } from '@/data/enums/BedType';
import { RoomFacility } from '@/data/enums/RoomFacility';
import { RoomStatus } from '@/data/enums/RoomStatus';
import { RoomType } from '@/data/enums/RoomType';
import * as yup from 'yup';

export const roomValidationSchem = yup.object().shape({

    roomNo: yup.string()
        .required('Room number is required'),
    status: yup.string()
        .required('Status is required')
        .oneOf(Object.values(RoomStatus), 'Please select a valid status'),
    facilities: yup.array()
        .of(yup.string().oneOf(Object.values(RoomFacility), 'Please select a valid facility'))
        .required('Facilities are required')
        .min(1, 'At least one facility is required'),
    price: 
    yup.number()
        .required("Price is required")
        .max(999999, "Price must be less than 999999")
        .typeError("Price must be a number")
        .min(10, "Price must be at least 10")
        .positive("Price must be a positive number"),
    discountedPrice: yup.number()
        .max(999999, "Price must be less than 999999")
        .typeError("Discounted price must be a number")
        .optional()
        .min(10, "Discounted price must be at least 10")
        .positive("Discounted price must be a positive number"),
    bedType: yup.string()
        .required("Bed type is required")
        .oneOf(Object.values(BedType), "Please select a valid bed type"),
    roomType: yup.string()
        .required("Room type is required")
        .oneOf(Object.values(RoomType), "Please select a valid room type")





})