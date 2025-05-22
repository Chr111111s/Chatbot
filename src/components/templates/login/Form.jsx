import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import Alert from '../../ui/Alert';
import { useNavigate } from 'react-router-dom';
import { BotMessageSquare } from 'lucide-react';

const Form = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastNameFather: '',
    lastNameMother: '',
    phone: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (isRegistering) {
      setFormData((prev) => ({ ...prev, [id]: value }));
    } else {
      setLoginData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(true);

    // Simulando una llamada fetch
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Aquí iría la lógica real del fetch
      console.log(isRegistering ? formData : loginData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
    setShowAlert(false);
  };

  const handleChangeEmail = (e) => {
    navigate('/checkEmail');
  };
  return (
    <div
      className={`flex h-screen flex-col md:flex-row ${
        isRegistering ? 'register-mode' : ''
      }`}
    >
      {/* Panel Izquierdo */}
      <div className='form-panel w-full md:w-1/2 flex flex-col justify-center items-center p-8'>
        <div className='flex justify-between w-full px-4 mb-6'>
          <img src='/uusmb.png' alt='Logo Izquierdo' className='h-20' />
          <img src='/unamlogo.png' alt='Logo Derecho' className='h-20' />
        </div>

        <h1 className='text-3xl font-bold flex items-center gap-2'>
          CHATBOT
          <BotMessageSquare 
          color='#CB842E'
          size={40}
          />
        </h1>
        <p className='mt-2 text-lg font-semibold'>
          {isRegistering ? 'Registrarse' : 'Bienvenido'}
        </p>
        <p className='font-semibold mb-6'>
          {isRegistering
            ? 'Regístrate para continuar'
            : 'Inicia sesión para poder continuar'}
        </p>

        {!isRegistering && showAlert && (
          <Alert
            message={
              <span>
                Usuario o contraseña incorrectos. Por favor, verifica tus datos
                e <strong>inténtalo de nuevo</strong>. Si sigues teniendo
                problemas, contacta a soporte.
              </span>
            }
            bgColor='bg-alert'
            textColor='text-black'
            imageSrc='alertFail.png'
          />
        )}

        <form
          className={`w-full max-w-md ${
            isRegistering
              ? 'grid grid-cols-1 gap-4'
              : 'grid grid-cols-1 space-y-4 mt-3'
          }`}
          onSubmit={handleSubmit}
        >
          {isRegistering ? (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label htmlFor='firstName' className='text-sm text-gray-600'>
                    Nombre Completo
                  </label>
                  <input
                    id='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    className='styled-input'
                  />
                </div>
                <div>
                  <label htmlFor='phone' className='text-sm text-gray-600'>
                    Teléfono
                  </label>
                  <input
                    id='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    className='styled-input'
                  />
                </div>
                <div>
                  <label
                    htmlFor='lastNameMother'
                    className='text-sm text-gray-600'
                  >
                    Apellido Materno
                  </label>
                  <input
                    id='lastNameMother'
                    value={formData.lastNameMother}
                    onChange={handleChange}
                    className='styled-input'
                  />
                </div>
                <div>
                  <label
                    htmlFor='lastNameFather'
                    className='text-sm text-gray-600'
                  >
                    Apellido Paterno
                  </label>
                  <input
                    id='lastNameFather'
                    value={formData.lastNameFather}
                    onChange={handleChange}
                    className='styled-input'
                  />
                </div>
                <div>
                  <label htmlFor='email' className='text-sm text-gray-600'>
                    Correo Electrónico
                  </label>
                  <input
                    id='email'
                    type='email'
                    placeholder='ejemplo@ejemplo.com'
                    value={formData.email}
                    onChange={handleChange}
                    className='styled-input'
                  />
                </div>
                <div>
                  <label
                    htmlFor='confirmEmail'
                    className='text-sm text-gray-600'
                  >
                    Confirmar Correo
                  </label>
                  <input
                    id='confirmEmail'
                    type='email'
                    value={formData.confirmEmail}
                    onChange={handleChange}
                    className='styled-input'
                  />
                </div>
                <div>
                  <label htmlFor='password' className='text-sm text-gray-600'>
                    Contraseña
                  </label>
                  <input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Contraseña'
                    value={formData.password}
                    onChange={handleChange}
                    className='styled-input'
                  />
                </div>
                <div>
                  <label
                    htmlFor='confirmPassword'
                    className='text-sm text-gray-600'
                  >
                    Confirmar Contraseña
                  </label>
                  <div className='relative'>
                    <input
                      id='confirmPassword'
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className='styled-input pr-10'
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='grid grid-cols-1 space-y-4'>
                <div>
                  <label htmlFor='email' className='text-sm text-gray-600'>
                    Correo Electrónico
                  </label>
                  <input
                    id='email'
                    type='email'
                    value={loginData.email}
                    onChange={handleChange}
                    className='styled-input'
                  />
                </div>
                <div>
                  <label htmlFor='password' className='text-sm text-gray-600'>
                    Contraseña
                  </label>
                  <div className='relative'>
                    <input
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={handleChange}
                      className='styled-input pr-10'
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-2 text-gray-500'
                    >
                      {showPassword ? (
                        <EyeOffIcon size={30} color='#CB842E' />
                      ) : (
                        <EyeIcon size={30} color='#CB842E' />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className={`col-span-2 mt-2 text-sm text-center`}>
            {isRegistering && showAlert && (
              <Alert
                message={
                  <span>
                    Lo sentimos, no hemos podido completar tu registro. Por
                    favor, verifica que todos los campos estén completos y que
                    la información proporcionada sea correcta. Asegúrate de que
                    tu contraseña cumpla con los requisitos de seguridad. Si el
                    problema persiste, no dudes en contactar a nuestro equipo de
                    soporte para obtener ayuda adicional.
                  </span>
                }
                bgColor='bg-alert'
                textColor='text-black'
                imageSrc='alertFail.png'
              />
            )}
            {isRegistering ? (
              <>
                ¿Ya tienes una cuenta?{' '}
                <button
                  type='button'
                  className='text-orange-600'
                  onClick={toggleRegister}
                >
                  Iniciar sesión
                </button>
              </>
            ) : (
              <>
                <div className='mb-2'>
                  <button
                    type='button'
                    className='text-orange-600'
                    onClick={handleChangeEmail}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                ¿Aún no tienes una cuenta?{' '}
                <button
                  type='button'
                  className='text-orange-600'
                  onClick={toggleRegister}
                >
                  Registrarme
                </button>
              </>
            )}
          </div>

          <button
            type='submit'
            className='bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded col-span-2'
          >
            {isRegistering ? 'Registrarme' : 'Continuar'}
          </button>
        </form>
      </div>

      {/* Panel Derecho */}
      <div className='image-panel md:w-1/2 bg-greyPrimary flex items-center justify-center p-8 rounded-3xl drop-shadow-xl'>
        <img
          src='loginImage.png'
          alt='Chatbot Ilustración'
          className='max-w-xs md:max-w-full'
        />
      </div>
    </div>
  );
};

export default Form;
