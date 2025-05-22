import { useState } from 'react';

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      alert('Passwords match!');
      // Add logic to handle password change
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <div className='min-h-screen bg-white flex flex-col items-center'>
      {/* Encabezado con logos */}
      <div className='w-full flex justify-between items-center px-4 py-2 max-w-6xl mx-auto'>
        <img src='/uusmb.png' alt='Logo Izquierdo' className='h-20' />
        <img src='/unamlogo.png' alt='Logo Derecho' className='h-20' />
      </div>
      {/* Tarjeta principal */}
      <div className='flex-grow flex items-start justify-center w-full px-6 pt-20'>
        <div className='bg-greyPrimary rounded-3xl shadow-lg p-8 w-full max-w-5xl flex flex-col items-center'>
          <h1 className='text-2xl md:text-4xl font-bold text-center mb-4 w-full'>
            INGRESE SU NUEVA
          </h1>
          <h1 className='text-2xl md:text-4xl font-bold text-center mb-8 w-f    ull'>
            CONTRASEÑA
          </h1>
          <p className='text-lg mb-4 text-center w-full'>
            Por favor, ingrese y confirme su nueva contraseña.
          </p>

          <form onSubmit={handleSubmit} className='w-full max-w-md'>
            <div className='mb-4'>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Nueva Contraseña
              </label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={handlePasswordChange}
                className='styled-input'
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
                Confirmar Contraseña
              </label>
              <input
                type='password'
                id='confirmPassword'
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className='styled-input'
              />
            </div>
            <button
              type='submit'
              className='w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 rounded-xl shadow-md text-base'
            >
              Cambiar Contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
