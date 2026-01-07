'use client'
import { ValidateInput } from "@/components/inputs/ValidateInput";
import { useModal } from "@/lib/utilities/modalStore";
import { useFormValidation } from "@/lib/validations/hooks/useFormValidation";
import { roomValidationSchem } from "@/lib/validations/schemas/roomValidations";
import { Dialog, DialogPanel, DialogTitle, Fieldset, Legend, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";

export const RoomWizard = ({mode="create"}) => {
    const { handleChange, handleBlur, handleSubmit, errors, getFieldError, hasFieldError, resetForm, values } = useFormValidation(roomValidationSchem, {
        initialValues: {
            name: '',
            bell: '',

        }
    })
    const { isOpen, open, close } = useModal('room')
   
    const onSubmit = () => {

    }
    return (

        <Dialog open={true} onClose={close}  >

            <DialogPanel className="w-full max-w-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <DialogTitle>Create Room </DialogTitle>
                <TabGroup>
                    <TabList>
                        <Tab>
                            Basic Details
                        </Tab>
                        <Tab className={'data-selected:bg-green-500 '}>
                            Factilities
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Fieldset>
                                <Legend>Basic Details</Legend>
                                <ValidateInput />

                            </Fieldset>
                        </TabPanel>
                        <TabPanel>
                            <Fieldset>
                                <Legend>Factilities</Legend>
                                <ValidateInput />
                            </Fieldset>

                        </TabPanel>


                    </TabPanels>

                </TabGroup>

            </DialogPanel>

        </Dialog>

    );
};