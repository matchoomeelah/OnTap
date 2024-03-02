import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { validateUserSettingsForm } from "./validation";
import { thunkUpdateUser } from "../../redux/users";
import { thunkAuthenticate } from "../../redux/session";

function UserSettingsModal({ user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();

    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});


    const handleSubmit = async e => {
        e.preventDefault();

        const formErrors = validateUserSettingsForm(firstName, lastName, email, username, password, confirmPassword, user);

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // Create form data to send to server
        const formData = new FormData();
        formData.append("first_name", firstName.trim());
        formData.append("last_name", lastName.trim());
        formData.append("email", email.trim());
        formData.append("username", username.trim());
        formData.append("password", password.trim());
        formData.append("profile_pic", image);
        setImageLoading(true);

        const updatedUser = await dispatch(
            thunkUpdateUser(formData, user.id)
        );

        if (updatedUser.errors) {
            setErrors(updatedUser.errors);
            setPassword("");
            setConfirmPassword("");
        } else {
            dispatch(thunkAuthenticate())
            closeModal();
        }
    }

    return (
        <div id="user-settings-container">
            <h2>User Settings</h2>
            <form id="user-settings-form" onSubmit={handleSubmit}>
                <div id="user-settings-name-container">
                    <div>
                        <label className="profile-label" htmlFor="first-name">
                            First Name:
                            <div className="user-error-container">
                            {errors.first_name && <span className="error-message">{errors.first_name}</span>}
                            </div>
                        </label>

                        <input
                            id="first-name"
                            className="input"
                            type="text"
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                                if (errors.first_name) {
                                    const newErrors = { ...errors };
                                    delete newErrors.first_name;
                                    setErrors(newErrors);
                                }
                            }}
                            maxLength={40}
                        />
                    </div>
                    <div></div>
                    <div>
                        <label className="profile-label" htmlFor="last-name">
                            Last Name:
                            <div className="user-error-container">
                            {errors.last_name && <span className="error-message">{errors.last_name}</span>}
                            </div>
                        </label>
                        <input
                            id="last-name"
                            className="input"
                            type="text"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                                if (errors.last_name) {
                                    const newErrors = { ...errors };
                                    delete newErrors.last_name;
                                    setErrors(newErrors);
                                }
                            }}
                            maxLength={40}
                        />
                    </div>
                </div>
                <div className="field-container">
                    <div className="form-label-container">
                        <label className="profile-label" htmlFor="email">
                            Email:
                        </label>
                        <div className="user-error-container">
                        {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>
                    </div>
                    <input
                        id="email"
                        className="input"
                        type="text"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) {
                                const newErrors = { ...errors };
                                delete newErrors.email;
                                setErrors(newErrors);
                            }
                        }}
                        maxLength={100}
                    />
                </div>

                <div className="field-container">
                    <div className="form-label-container">
                        <label className="profile-label" htmlFor="username">
                            Username:
                        </label>
                        <div className="user-error-container">
                        {errors.username && <span className="error-message">{errors.username}</span>}
                        </div>
                    </div>
                    <input
                        id="username"
                        className="input"
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            if (errors.username) {
                                const newErrors = { ...errors };
                                delete newErrors.username;
                                setErrors(newErrors);
                            }
                        }}
                        maxLength={40}
                    />
                </div>

                <div className="field-container">
                    <div className="form-label-container">
                        <label className="profile-label" htmlFor="password">
                            New Password:
                        </label>
                        <div className="user-error-container">
                        {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>
                    </div>
                    <input
                        id="password"
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (errors.password) {
                                const newErrors = { ...errors };
                                delete newErrors.password;
                                setErrors(newErrors);
                            }
                        }}
                        maxLength={50}
                    />
                </div>

                <div className="field-container">
                    <div className="form-label-container">
                        <label className="profile-label" htmlFor="confirm-password">
                            Confirm Password:
                        </label>
                        <div className="user-error-container">
                        {errors.confirm_password && <span className="error-message">{errors.confirm_password}</span>}
                        </div>
                    </div>
                    <input
                        id="confirm-password"
                        className="input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (errors.confirm_password) {
                                const newErrors = { ...errors };
                                delete newErrors.confirm_password;
                                setErrors(newErrors);
                            }
                        }}
                        maxLength={50}
                    />
                </div>
                <div id="profile-picture-field">
                    <label>
                        Profile Picture:
                    </label>
                    <label id="image-input-label" htmlFor="profile-image-input">
                        {image == null ?
                            <img id="profile-add-photo" src="https://i.ibb.co/5rYHfYk/Untitled-4.png" />
                            :
                            <img id="profile-preview-image" src={URL.createObjectURL(image)} />
                        }
                    </label>
                    <input
                        id="profile-image-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            setImage(e.target.files[0])
                            if (errors.image_url) {
                                const newErrors = { ...errors };
                                delete newErrors.image_url;
                                setErrors(newErrors);
                            }
                        }}
                    />
                </div>
                <div className="error-container">
                    {errors.demo_user && <span className="error-message">{errors.demo_user}</span>}
                </div>
                <button className="submit-button" type="submit">Save Settings</button>
            </form>
        </div>
    )
}

export default UserSettingsModal;
