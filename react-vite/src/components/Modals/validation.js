import { validate as emailValidator } from 'react-email-validator'


export function validateSignUpForm(firstName, lastName, email, username, password, confirmPassword) {
    const errors = {};

    // First Name
    if (firstName.trim().length <= 0) {
        errors.first_name = "This field is required"
    }

    // Last Name
    if (lastName.trim().length <= 0) {
        errors.last_name = "This field is required"
    }

    // Email
    if(!emailValidator(email)){
        errors.email = "Invalid Email";
    }

    if (email.trim().length <= 0) {
        errors.email = "This field is required"
    }

    // Username
    if (username.trim().length <= 0) {
        errors.username = "This field is required"
    }

    // Password
    if (password.trim().length <= 0) {
        errors.password = "This field is required"
    }

    // Password
    if (password !== confirmPassword) {
        errors.confirm_password = "Passwords do not match";
    }
    if (confirmPassword.trim().length <= 0) {
        errors.confirm_password = "This field is required"
    }

    return errors;
}

export function validateLogInForm(email, password) {
    const errors = {};

    // Email
    if(!emailValidator(email)){
        errors.email = "Invalid Email";
    }

    if (email.trim().length <= 0) {
        errors.email = "This field is required"
    }

    // Password
    if (password.trim().length <= 0) {
        errors.password = "This field is required"
    }

    return errors;

}

export function validateCheckInForm(rating) {

}
