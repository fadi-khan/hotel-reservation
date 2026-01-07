import { Description, Field, Input, Label } from "@headlessui/react"

export const ValidateInput = ({ }) => {
    return (
        <div className="w-full max-w-md px-4 text-black">
            <Field>
                <Label className="text-sm/6 font-medium ">Name</Label>
                <Input className={'mt-2 block w-full rounded-md   px-3 py-1.5  text-sm/6 focus:outline-2 focus:outline-blue-900'} />
                <Label className="text-sm/6 font-medium  text-red-500 ">Error will go here</Label>

            </Field>
        </div>
    )
}