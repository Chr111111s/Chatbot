import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../ui/Alert';
import { BotMessageSquare } from 'lucide-react';

const RegisterForm = () => {
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
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Registrando:', formData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleLogin = () =>{
    navigate('/');
  }

  return (
    <div className="flex h-screen flex-col md:flex-row register-mode">
      {/* Panel Izquierdo */}
      <div className="form-panel w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="flex justify-between w-full px-4 mb-6">
          <img src="/uusmb.png" alt="Logo Izquierdo" className="h-20" />
          <img src="/unamlogo.png" alt="Logo Derecho" className="h-20" />
        </div>

        <h1 className="text-3xl font-bold flex items-center gap-2">
          CHATBOT
          <BotMessageSquare color="#CB842E" size={40} />
        </h1>
        <p className="mt-2 text-lg font-semibold">Registrarse</p>
        <p className="font-semibold mb-6">Regístrate para continuar</p>

        {showAlert && (
          <Alert
            message={
              <span>
                Lo sentimos, no hemos podido completar tu registro. Por favor,
                verifica que todos los campos estén completos y que la
                información proporcionada sea correcta. Asegúrate de que tu
                contraseña cumpla con los requisitos de seguridad.
              </span>
            }
            bgColor="bg-alert"
            textColor="text-black"
            imageSrc="alertFail.png"
          />
        )}

        <form
          className="w-full max-w-md grid grid-cols-1 gap-4"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="text-sm text-gray-600">
                Nombre Completo
              </label>
              <input
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="styled-input"
              />
            </div>
            <div>
              <label htmlFor="phone" className="text-sm text-gray-600">
                Teléfono
              </label>
              <input
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="styled-input"
              />
            </div>
            <div>
              <label htmlFor="lastNameMother" className="text-sm text-gray-600">
                Apellido Materno
              </label>
              <input
                id="lastNameMother"
                value={formData.lastNameMother}
                onChange={handleChange}
                className="styled-input"
              />
            </div>
            <div>
              <label htmlFor="lastNameFather" className="text-sm text-gray-600">
                Apellido Paterno
              </label>
              <input
                id="lastNameFather"
                value={formData.lastNameFather}
                onChange={handleChange}
                className="styled-input"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm text-gray-600">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="ejemplo@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                className="styled-input"
              />
            </div>
            <div>
              <label htmlFor="confirmEmail" className="text-sm text-gray-600">
                Confirmar Correo
              </label>
              <input
                id="confirmEmail"
                type="email"
                value={formData.confirmEmail}
                onChange={handleChange}
                className="styled-input"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm text-gray-600">
                Contraseña
              </label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                className="styled-input"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-sm text-gray-600">
                Confirmar Contraseña
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="styled-input"
              />
            </div>
            <div>
              <button
              type="button"
              className="text-orange-600"
              onClick={handleLogin}
            >
              ¿Ya tienes una cuenta? Inicia sesión
            </button>
            </div>
          </div>

      

          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded col-span-2 mt-2"
          >
            Registrarme
          </button>
        </form>
      </div>

      {/* Panel Derecho */}
      <div className="image-panel md:w-1/2 bg-greyPrimary flex items-center justify-center p-8 rounded-3xl drop-shadow-xl">
        <img
          src="loginImage.png"
          alt="Chatbot Ilustración"
          className="max-w-xs md:max-w-full"
        />
      </div>
    </div>
  );
};

export default RegisterForm;
