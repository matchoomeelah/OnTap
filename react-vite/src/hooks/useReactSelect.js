import { useState } from "react";

export function useReactSelect(id, initialValue, options, errorProps) {
    const [selectedValue, setSelectedValue] = useState(initialValue.value);
    const {errors, setErrors} = errorProps;

    function handleChange(e) {
        setSelectedValue(e.value);
        if (errors[id]) {
            const newErrors = { ...errors };
            delete newErrors[id];
            setErrors(newErrors);
        }
    }

    return {
        id,
        selectedValue,
        onChange: handleChange,
        options,
        className: "input select-input",
        defaultValue: initialValue
    }



}
