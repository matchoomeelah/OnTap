import { useState } from 'react';

export function useTextInput(id, initialValue, maxLength, errorProps) {
    const [value, setValue] = useState(initialValue);
    const {errors, setErrors} = errorProps;

    function handleChange(e) {
        setValue(e.target.value)
        if (errors[id]) {
            const newErrors = { ...errors };
            delete newErrors[id];
            setErrors(newErrors);
        }
    }

    return {
        id,
        value,
        maxLength,
        onChange: handleChange,
        className: "input",
        type: "text",
    }

}
