import { ValidateInput } from "@/components/inputs/ValidateInput";
import { RoomStatus } from "@/data/enums/RoomStatus";
import { RoomFacility } from "@/data/enums/RoomFacility";
import { useModal } from "@/lib/utilities/modalStore";
import { useFormValidation } from "@/lib/validations/hooks/useFormValidation";
import { roomValidationSchem } from "@/lib/validations/schemas/roomValidations";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Fieldset, Label, Legend, Tab, TabGroup, TabList, TabPanel, TabPanels, Checkbox, Field, Description, RadioGroup, Radio } from "@headlessui/react";
import { useState } from "react";
import { FaChair, FaEdit, FaSwimmingPool } from "react-icons/fa";
import { IoAddSharp } from "react-icons/io5";
import { SelectDropDown } from "../dropdowns/SelectDropdown";
import { ArrowLeftIcon, ArrowRightIcon, Button } from "flowbite-react";
import { FaTv, FaWifi, FaDumbbell, FaParking } from "react-icons/fa";
import { MdKingBed, MdKitchen, MdLocalLaundryService, MdPool, MdSingleBed } from "react-icons/md";
import { TbAirConditioning, TbElevator, TbElevatorFilled } from "react-icons/tb";
import { GiBarrel, GiLift } from "react-icons/gi";
import { BiTv } from "react-icons/bi";
import { RiTvFill, RiWifiFill } from "react-icons/ri";
import { object } from "yup";
import { BedType } from "@/data/enums/BedType";
import { RoomType } from "@/data/enums/RoomType";
import { FaDeskpro } from "react-icons/fa6";
import { useRoomCreateQuery } from "@/lib/hooks/useRoomQueries";
export const RoomWizard = ({ mode = "create" }) => {
    const {
        handleChange,
        handleBlur,
        handleSubmit,
        errors: errors,
        getFieldError,
        hasFieldError,
        resetForm,
        touched,
        values: formData }
        = useFormValidation(roomValidationSchem, {

            initialValues: {
                roomNo: '',
                status: RoomStatus.AVAILABLE,
                price: null,
                discountedPrice: null,
                bedType: '',
                facilities: [],
                roomType: ''

            }
        })
    const { isOpen, open, close } = useModal('room')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const createMutation = useRoomCreateQuery()


    const handleTabChange = (index: number) => {
        // Prevent tab change if trying to move to next step and current step has errors
        if (!validateCurrentStep(selectedIndex) && index > selectedIndex) {
            return; // Don't allow tab change
        }

        setSelectedIndex(index);
    }


    const handleFacilityChange = (facility: RoomFacility, checked: boolean) => {
        let updated = checked
            ? [...formData.facilities, facility]
            : formData.facilities.filter((f: RoomFacility) => f !== facility)

        handleChange("facilities", updated)
    }
    const facilityIcons = {
        [RoomFacility.TV]: RiTvFill,
        [RoomFacility.AC]: TbAirConditioning,
        [RoomFacility.WIFI]: RiWifiFill,
        [RoomFacility.KITCHEN]: MdKitchen,
        [RoomFacility.GYM]: FaDumbbell,
        [RoomFacility.LIFT]: TbElevatorFilled,
        [RoomFacility.LAUNDRY]: MdLocalLaundryService,
        [RoomFacility.PARKING]: FaParking,
        [RoomFacility.SWIMMING_POOL]: MdPool,
        [RoomFacility.MINI_BAR]: GiBarrel,
    };

    const validateCurrentStep = (stepIndex: number) => {

        const fields = stepIndex === 0 ? ['roomNo', 'price', 'status'] : ['facilities', 'roomType', 'bedType'];
        const hasEmptyOrErrorFields = fields.some(field => {
            const value = formData[field];
            const hasError = hasFieldError(field);

            // Check for empty required fields (null, undefined, empty string)
            const isEmpty = value === null || value === undefined || value === '';
            handleBlur(field)

            return hasError || isEmpty;
        });

        return !hasEmptyOrErrorFields;



    }

    function nextStep() {
        if (validateCurrentStep(selectedIndex)) {
            selectedIndex < tabs.length - 1 && setSelectedIndex(selectedIndex + 1)
        }
    }
    function prevStep() {
        selectedIndex > 0 && setSelectedIndex(selectedIndex - 1)
    }

    const tabs = [
        { tab: 'Basics' },
        { tab: 'Facilities' }

    ]
    const statusOptions = [
        { value: RoomStatus.AVAILABLE, label: 'Available' },
        { value: RoomStatus.BOOKED, label: 'Booked' },
        { value: RoomStatus.RESERVED, label: 'Reserved' },
        { value: RoomStatus.INACTIVE, label: 'In Active' },
        { value: RoomStatus.MINTANENCE, label: 'Maintenance' }
    ]

    const bedTypIcons = {
        [BedType.SINGLE]: MdSingleBed,
        [BedType.KING]: MdKingBed

    }

    const roomTypeIcons = {
        [RoomType.STANDARD]: FaChair,
        [RoomType.ECONOMY]: FaDeskpro,
        [RoomType.DELUXE]: FaSwimmingPool

    }


    const handleRoomSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        createMutation.mutate(formData, {
            onSuccess: () => {
                resetForm()
                close()
                setSelectedIndex(0)
            }
        })
    }
    return (



        <>
            <div
                className=" flex   items-center gap-x-2 w-full"
                onClick={open}>

                {mode === "create" ? <IoAddSharp size={24} className='size-5' /> : <FaEdit className='size-5' />}
                {mode === "create" ? " Create" : "Edit"}

            </div>

            <Dialog

                open={isOpen} onClose={close} as="div"   >
                <DialogBackdrop
                    onClick={close}
                    transition
                    className=" fixed inset-0 bg-black/60 transition-opacity data-closed:opacity-0"
                />
                <DialogPanel className="w-full p-6 lg:pe-6 pe-0 z-50!  border-2 border-blue-900   bg-white rounded-lg lg:max-w-4xl max-w-md   fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <DialogTitle className={'text-3xl font-bold text-blue-900'}>{mode === "create" ? "Create Room" : "Edit Room"} </DialogTitle>
                    <TabGroup className={' overflow-y-auto max-h-[73vh] lg:max-h-[85vh]'} selectedIndex={selectedIndex} onChange={handleTabChange}>
                        <TabList className={'  font-semibold  w-full flex justify-center   mt-8 items-center pe-4 '}>
                            {tabs.map((item, index) => {
                                const isFirst = index === 0;
                                const isLast = index === tabs.length - 1;

                                return (
                                    <Tab
                                        key={item.tab}
                                        className={` w-full lg:w-1/4 cursor-pointer py-1.5 transition-colors bg-blue-800/50 text-blue-900 data-selected:bg-blue-800 data-selected:text-white ${isFirst ? 'rounded-l-full' : ''} ${isLast ? 'rounded-r-full' : ''} outline-none `}>
                                        {item.tab}
                                    </Tab>
                                );
                            })}

                        </TabList>
                        <form onSubmit={handleRoomSubmit}>
                            <TabPanels className={'mt-8 min-w-full      '}>
                                <TabPanel className={''}>
                                    <Fieldset className={'px-4 gap-4 grid lg:grid-cols-2   w-full '}>
                                        <ValidateInput
                                            value={formData.roomNo}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={hasFieldError('roomNo') ? getFieldError('roomNo') : undefined}
                                            name="roomNo"
                                            label="Room No *"
                                        />

                                        <ValidateInput
                                            value={formData.price}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={hasFieldError('price') ? getFieldError('price') : undefined}
                                            name="price"
                                            label={'Price *'}
                                        />

                                        <ValidateInput
                                            value={formData.discountedPrice}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={hasFieldError('discountedPrice') ? getFieldError('discountedPrice') : undefined}
                                            name="discountedPrice"
                                            label={'Discounted Price'}
                                        />
                                        <SelectDropDown
                                            name={'status'}
                                            label={'Status'}
                                            options={statusOptions}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={hasFieldError('status') ? getFieldError('status') : undefined}

                                        />

                                    </Fieldset>

                                </TabPanel>
                                <TabPanel>

                                    <Fieldset className="px-4 gap-y-6 flex flex-col">
                                        <Field as="div">

                                            <Legend className="text-lg  font-bold text-blue-900 ">Select Facilities </Legend>
                                            <Description className={"text-sm/6 text-gray-500 mb-4 font-medium "}>Choose atleast one facility (Required) </Description>
                                            <div className="grid lg:grid-cols-4  grid-cols-3 gap-y-3 gap-x-2">
                                                {Object.values(RoomFacility).map((facility) => {
                                                    const Icon = facilityIcons[facility];
                                                    return (
                                                        <Field

                                                            key={facility} className="flex items-center  last:col-span-2">
                                                            <Checkbox
                                                                value={facility}
                                                                // onBlur={() => { handleBlur('facilities') }}
                                                                checked={formData.facilities?.includes(facility) || false}
                                                                onChange={(checked) => handleFacilityChange(facility, checked)}
                                                                className="group focus:ring-0 min-w-4 relative flex size-4 cursor-pointer rounded border-2 border-blue-800 bg-white data-checked:bg-blue-800 data-checked:border-blue-800 focus:ring-blue-900"
                                                            >
                                                                <svg
                                                                    className="pointer-events-none absolute inset-0 m-auto size-3 stroke-white opacity-0 group-data-checked:opacity-100"
                                                                    viewBox="0 0 14 14"
                                                                    fill="none"
                                                                >
                                                                    <path
                                                                        d="M3 8L6 11L11 3"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                </svg>
                                                            </Checkbox>

                                                            <Label className=" ml-2.5 text-sm text-blue-800 font-medium flex gap-1.5">
                                                                {Icon && <Icon className="size-4 min-w-4 min-h-4" />}
                                                                {facility}
                                                            </Label>
                                                        </Field>
                                                    );
                                                })}
                                            </div>
                                            {hasFieldError('facilities') && (
                                                <Label className="text-sm/6 font-small h-6 font-bold text-red-500 mt-2">
                                                    {getFieldError('facilities')}
                                                </Label>
                                            )}

                                        </Field>


                                    </Fieldset>

                                    <Fieldset className="px-4  pt-6 flex lg:flex-row flex-col   justify-between lg:gap-x-16">
                                        <Field as="div" className={''} >
                                            <Legend className="text-lg  font-bold text-blue-900  ">Bed Size </Legend>
                                            <Description className={"text-sm/6 text-gray-500 mb-4 font-medium "}>Choose bed size (Required) </Description>
                                            <RadioGroup
                                                className={'flex'}
                                                onBlur={() => handleBlur('bedType')}
                                                value={formData.bedType} onChange={(value) => handleChange('bedType', value)} aria-label="Bed Type">
                                                {Object.values(BedType).map((plan) => {

                                                    const Icon = bedTypIcons[plan];
                                                    return (
                                                        <Field key={plan} className={` ${formData.bedType == plan ? ' shadow-2xl shadow-blue-800 bg-blue-900 text-white scale-100' : 'bg-blue-900/50'} text-blue-900 font-medium  border-2 border-blue-900 w-full lg:w-fit duration-300 transition-all scale-95 ps-2 rounded  flex items-center gap-1 cursor-pointer `}>
                                                            <Radio
                                                                value={plan}
                                                                className={`group flex min-h-4 min-w-4  size-4 items-center  border-2 ${formData.bedType == plan ? 'border-white ' : ' border-blue-900'}justify-center rounded-full  bg-white data-checked:bg-blue-900`}
                                                            >
                                                                <span className="invisible size-2 max-w-2 not-only-of-type: rounded-full bg-blue-900 group-data-checked:visible" />
                                                            </Radio>
                                                            <Label className={'cursor-pointer w-full  py-3  lg:py-6 lg:min-w-24 flex items-center'}>
                                                                {plan}</Label>
                                                        </Field>
                                                    )
                                                })}
                                            </RadioGroup>
                                            {hasFieldError('bedType') && (
                                                <Label className="text-sm/6 font-small h-6 font-bold text-red-500 mt-2">
                                                    {getFieldError('bedType')}
                                                </Label>
                                            )}
                                        </Field>
                                        <Field as="div" className={' lg:mt-0 pt-4 lg:pt-0  '} >
                                            <Legend className="text-lg  font-bold text-blue-900  ">Room Type </Legend>
                                            <Description className={"text-sm/6 text-gray-500 mb-4 font-medium  "}>Please make sure you choose the option that best suits price (Required)</Description>
                                            <RadioGroup
                                                className={'flex text-blue-900 font-medium'}
                                                onBlur={() => handleBlur('roomType')}
                                                value={formData.roomType} onChange={(value) => handleChange('roomType', value)} aria-label="Room Type">
                                                {Object.values(RoomType).map((plan) => {

                                                    const Icon = roomTypeIcons[plan];
                                                    return (
                                                        <Field key={plan} className={` ${formData.roomType == plan ? '  shadow-2xl shadow-blue-800 bg-blue-900 text-white scale-100' : 'bg-blue-900/50'}  border-2 text-blue-900 font-medium border-blue-900 w-full duration-300 transition-all scale-95 px-2 rounded  flex items-center gap-1 cursor-pointer `}>
                                                            <Radio
                                                                value={plan}
                                                                className={`group flex size-4 min-w-4 min-h-4 items-center  justify-center rounded-full  bg-white data-checked:bg-blue-900 border-2 ${formData.roomType == plan ? 'border-white ' : ' border-blue-900'}`}
                                                            >
                                                                <span className="invisible size-2 min-h-2 max-w-2 rounded-full bg-blue-900 group-data-checked:visible" />
                                                            </Radio>
                                                            <Label className={'cursor-pointer py-3 w-full  lg:py-6 lg:min-w-24 flex items-center'}>

                                                                {plan}</Label>
                                                        </Field>
                                                    )
                                                })}
                                            </RadioGroup>
                                            {hasFieldError('roomType') && (
                                                <Label className="text-sm/6 font-small h-6 font-bold text-red-500 mt-2">
                                                    {getFieldError('roomType')}
                                                </Label>
                                            )}
                                        </Field>


                                    </Fieldset>
                                </TabPanel>
                                <div className="flex justify-between items-center  mx-4  my-10 mt-14">
                                    <Button
                                        disabled={selectedIndex === 0}
                                        className="cursor-pointer shadow-lg shadow-blue-900 min-w-28 gap-1 flex bg-blue-900!   focus:ring-0" onClick={prevStep}><ArrowLeftIcon className="size-4" /> Previous</Button>
                                    <Button
                                        type={selectedIndex === 0 ? "button" : "submit"}
                                        className="cursor-pointer shadow-lg shadow-blue-900 min-w-28  gap-1 flex bg-blue-900!  focus:ring-0" onClick={nextStep}>
                                        {selectedIndex === tabs.length - 1 ? (
                                            createMutation.isPending ? "Creating..." : "Submit"
                                        ) : (
                                            "Next"
                                        )} <ArrowRightIcon className="size-4" />
                                    </Button>

                                </div>


                            </TabPanels>

                        </form>

                    </TabGroup>

                </DialogPanel>

            </Dialog>
        </>

    );
};