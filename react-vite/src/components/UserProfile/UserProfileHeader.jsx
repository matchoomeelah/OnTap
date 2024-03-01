import { useModal } from '../../context/Modal';
import UserSettingsModal from '../Modals/UserSettingsModal';

import "./UserProfile.css";

function UserProfileHeader({ user }) {

  const { setModalContent, setOnModalClose } = useModal();

    return (
        <div id="profile-header">
            <img id="profile-banner-image" src="https://on-tap-bucket.s3.us-west-1.amazonaws.com/profile_banner1.jpeg" />
            <div id="profile-header-info">
                <div id='banner-profile-picture' onClick={() => setModalContent(<UserSettingsModal user={user}/>)}>
                    {user?.profile_pic ?
                        <img className="banner-custom-profile-pic" src={user?.profile_pic} />
                        :
                        <i id="banner-default-profile-pic" className="fas fa-user-circle fa-lg" />
                    }
                </div>
                <div>
                    <div id="profile-header-name">{user?.first_name} {user?.last_name}</div>
                    <div id="profile-header-username">@{user?.username}</div>
                </div>
            </div>
        </div >
    )
}

export default UserProfileHeader
