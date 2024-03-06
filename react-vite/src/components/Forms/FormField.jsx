import FormError from "./FormError";
import "./Forms.css"

export default function FormField({ label, errors, inputComponent }) {
    return (
        <div className="field-container">
            <div className="form-label-container">
                <label htmlFor={inputComponent.props.id}>
                    {label}
                </label>
                <FormError error={errors[inputComponent.props.id]} />
            </div>
            {inputComponent}
        </div>
    )
}
