import React, { useState } from 'react';

const PasswordModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg w-full max-w-md shadow-lg'>
        <h2 className='text-xl font-bold mb-4'>Editar Perfil</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Contraseña actual
            </label>
            <input
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded-md'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Contraseña nueva
            </label>
            <input
              name='newPassword'
              type='password'
              value={formData.newPassword}
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded-md'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Confirmar contraseña
            </label>
            <input
              name='confirmPassword'
              type='password'
              value={formData.confirmPassword}
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded-md'
            />
          </div>
          <div className='flex justify-end space-x-2 mt-4'>
            <button
              type='button'
              onClick={onClose}
              className='bg-gray-300 px-4 py-2 rounded hover:bg-gray-400'
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
