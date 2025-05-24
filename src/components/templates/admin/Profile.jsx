import { useState, useEffect } from 'react';
import AsideBar from '../../ui/AsideBar';
import EditProfileModal from './EditProfileModal';
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  PencilIcon,
  ShieldUser,
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserById } from '../../../services/users/userServices';
import { decodeAndDisplayToken } from '../../../services/auth/authService.js';

const Profile = () => {
  const [isAsideExpanded, setIsAsideExpanded] = useState(() => {
    const saved = localStorage.getItem('isExpanded');
    return saved ? JSON.parse(saved) : false;
  });

  const [profileData, setProfileData] = useState({
    id: '',
    fullName: '',
    firstLastName: '',
    secondLastName: '',
    phone: '',
    email: '',
    role: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAsideToggle = (expanded) => setIsAsideExpanded(expanded);

  useEffect(() => {
    const loadUserData = async () => {
      let loaded = false;

      try {
        const tokenData = decodeAndDisplayToken();

        if (tokenData && tokenData.id) {
          // Use the ID from the token without overwriting localStorage
          const userId = tokenData.id;
          console.log('Fetching user data with ID:', userId);

          const response = await getUserById(userId);

          if (response?.result) {
            const profileData = {
              id: response.result.id,
              fullName: response.result.fullName,
              firstLastName: response.result.firstLastName,
              secondLastName: response.result.secondLastName,
              phone: response.result.phone,
              email: response.result.email,
              role: response.result.role,
            };
            setProfileData(profileData);
            loaded = true;
          }
        }
      } catch (err) {
        // Silent error in production
      }

      if (!loaded) {
        try {
          const savedUserId = localStorage.getItem('userId');
          if (savedUserId) {
            const response = await getUserById(savedUserId);

            if (response?.result) {
              const profileData = {
                id: response.result.id,
                fullName: response.result.fullName,
                firstLastName: response.result.firstLastName,
                secondLastName: response.result.secondLastName,
                email: response.result.email,
                role: response.result.role,
              };
              setProfileData(profileData);
              loaded = true;
            }
          }
        } catch (err) {
          // Silent error in production
        }
      }
    };

    loadUserData();
  }, []);

  if (!profileData) {
    return <div className='text-center mt-32'>Cargando perfil...</div>;
  }

  return (
    <div className='flex min-h-screen w-full bg-greyPrimary'>
      <aside className='h-screen sticky top-0 z-20'>
        <AsideBar activePage='users' onToggle={handleAsideToggle} />
      </aside>

      <main
        className={`flex flex-col flex-1 bg-greyPrimary transition-all duration-300 ease-in-out ${
          isAsideExpanded ? 'ml-[16em]' : 'ml-[4em]'
        } overflow-hidden min-h-screen`}
      >
        <div className='max-w-4xl w-full mx-auto p-6 mt-44'>
          <div className='bg-white rounded-2xl shadow-xl p-8'>
            <h1 className='text-3xl font-bold text-center text-gray-800 mb-8'>
              Mi Perfil
            </h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              {/* Nombre completo */}
              <div className='flex items-start gap-4'>
                <UserIcon className='text-primary mt-1' size={24} />
                <div>
                  <p className='text-sm text-gray-500'>Nombre completo</p>
                  <p className='text-lg font-semibold text-gray-800'>
                    {profileData.fullName} {profileData.firstLastName} {profileData.secondLastName}
                  </p>
                </div>
              </div>

              {/* Correo */}
              <div className='flex items-start gap-4'>
                <MailIcon className='text-primary mt-1' size={24} />
                <div>
                  <p className='text-sm text-gray-500'>Correo electrónico</p>
                  <p className='text-lg font-semibold text-gray-800'>
                    {profileData.email}
                  </p>
                </div>
              </div>

              {/* Teléfono */}
              <div className='flex items-start gap-4'>
                <PhoneIcon className='text-primary mt-1' size={24} />
                <div>
                  <p className='text-sm text-gray-500'>Teléfono</p>
                  <p className='text-lg font-semibold text-gray-800'>
                    {profileData.phone}
                  </p>
                </div>
              </div>

              {/* Rol */}
              <div className='flex items-start gap-4'>
                <ShieldUser className='text-primary mt-1' size={24} />
                <div>
                  <p className='text-sm text-gray-500'>Rol</p>
                  <p className='text-lg font-semibold text-gray-800'>
                    {profileData.role}
                  </p>
                </div>
              </div>

              {/* Botón editar */}
              <div className='flex items-start gap-4'>
                <PencilIcon className='text-green-500 mt-1' size={24} />
                <div className='flex flex-col'>
                  <p className='text-sm text-gray-500 mb-1'>Editar perfil</p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className='bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium w-fit'
                  >
                    Editar mi perfil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <EditProfileModal
            profileData={profileData}
            onClose={() => setIsModalOpen(false)}
            onSave={(updatedData) => {
              setProfileData(updatedData);
              setIsModalOpen(false);
            }}
          />
        )}
      </main>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
};

export default Profile;
