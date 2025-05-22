import { useState, useEffect } from 'react';
import AsideBarExtern from '../../ui/AsideBarExtern';
import PasswordModal from './PasswordModal';
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  PencilIcon,
  Contact,
  RotateCcwKey,
} from 'lucide-react';

const ProfileExtern = () => {
  const [profileData, setProfileData] = useState(null);

  const [isAsideExpanded, setIsAsideExpanded] = useState(() => {
    const saved = localStorage.getItem('isExpanded');
    return saved ? JSON.parse(saved) : false;
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleAsideToggle = (expanded) => setIsAsideExpanded(expanded);

  useEffect(() => {
    const getData = async () => {
      try {
        // Simulación de datos
        const data = {
          nombreCompleto: 'Aviles Sotelo Christian Jesus',
          correo: 'avilessotelochristian@gmail.com',
          telefono: '77762366236',
          rol: 'Externo',
        };
        setProfileData(data);
      } catch (error) {
        console.error('Error al obtener perfil:', error);
      }
    };

    getData();
  }, []);

  if (!profileData) {
    return <div className='text-center mt-32'>Cargando perfil...</div>;
  }

  return (
    <div className='flex min-h-screen w-full bg-greyPrimary'>
      <aside className='h-screen sticky top-0 z-20'>
        <AsideBarExtern activePage='users' onToggle={handleAsideToggle} />
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
                    {profileData.nombreCompleto}
                  </p>
                </div>
              </div>

              {/* Correo */}
              <div className='flex items-start gap-4'>
                <MailIcon className='text-primary mt-1' size={24} />
                <div>
                  <p className='text-sm text-gray-500'>Correo electrónico</p>
                  <p className='text-lg font-semibold text-gray-800'>
                    {profileData.correo}
                  </p>
                </div>
              </div>

              {/* Teléfono */}
              <div className='flex items-start gap-4'>
                <PhoneIcon className='text-primary mt-1' size={24} />
                <div>
                  <p className='text-sm text-gray-500'>Teléfono</p>
                  <p className='text-lg font-semibold text-gray-800'>
                    {profileData.telefono}
                  </p>
                </div>
              </div>

              {/* Rol */}
              <div className='flex items-start gap-4'>
                <Contact className='text-primary mt-1' size={24} />
                <div>
                  <p className='text-sm text-gray-500'>Rol</p>
                  <p className='text-lg font-semibold text-gray-800'>
                    {profileData.rol}
                  </p>
                </div>
              </div>

              

              {/* Botón contrasena */}
              <div className='flex items-start gap-4'>
                <RotateCcwKey className='text-red-500 mt-1' size={24} />
                <div className='flex flex-col'>
                  <p className='text-sm text-gray-500 mb-1'>
                    Cambiar mi contraseña
                  </p>
                  <button
                    onClick={() => setIsPasswordModalOpen(true)}
                    className='bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium w-fit'
                  >
                    Cambiar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isPasswordModalOpen && (
          <PasswordModal
            onClose={() => setIsPasswordModalOpen(false)}
            onSave={(formData) => {
              // Aquí puedes manejar la lógica de actualización de contraseña
              console.log('Nueva contraseña:', formData);
              setIsPasswordModalOpen(false);
            }}
          />
        )}
      </main>
    </div>
  );
};

export default ProfileExtern;
