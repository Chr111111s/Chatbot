import { useState } from 'react';
import { toast } from 'react-toastify';
import { creaeteUser } from '../../../services/users/userServices';
import {
  validateEmail,
  validatePhone,
  validatePassword,
  validateFullName,
  validateLastName,
  validateSecondLastName,
} from '../../../services/utils/validations.js';
import { X, User, Mail, Phone, Save } from 'lucide-react'; 

const AddUserModal = ({ onClose }) => {
  const [form, setForm] = useState({
    fullName: '',
    firstLastName: '',
    secondLastName: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!validateFullName(form.fullName)) {
      toast.error('Nombre completo no es válido');
      return;
    }
    if (!validateLastName(form.firstLastName)) {
      toast.error('Primer apellido no es válido');
      return;
    }
    if (!validateSecondLastName(form.secondLastName)) {
      toast.error('Segundo apellido no es válido');
      return;
    }
    if (!validateEmail(form.email)) {
      toast.error('Email no es válido');
      return;
    }
    if (!validatePhone(form.phone)) {
      toast.error('Teléfono no es válido');
      return;
    }
    if (!validatePassword(form.password)) {
      toast.error('Contraseña no es válida');
      return;
    }

    try {
      await createUser(form);
      toast.success('Usuario creado con éxito');
      onClose();
    } catch (error) {
      toast.error('Error al crear el usuario');
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4'>
      <div className='bg-white p-6 rounded-lg w-full max-w-md shadow-lg'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-gray-800'>Editar Perfil</h2>
          <button
            type='button'
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700'
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='text-sm font-medium text-gray-700 mb-1 flex items-center'>
              <User size={16} className='mr-2' />
              Nombre
            </label>
            <input
              name='fullName'
              value={form.fullName}
              onChange={handleChange}
              className='mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring focus:ring-green-200 focus:border-green-500'
            />
          </div>
          <div>
            <label className='text-sm font-medium text-gray-700 mb-1 flex items-center'>
              <User size={16} className='mr-2' />
              Apellido Paterno
            </label>
            <input
              name='firstLastName'
              value={form.firstLastName}
              onChange={handleChange}
              className='mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring focus:ring-green-200 focus:border-green-500'
            />
          </div>
          <div>
            <label className='text-sm font-medium text-gray-700 mb-1 flex items-center'>
              <User size={16} className='mr-2' />
              Apellido Materno
            </label>
            <input
              name='secondLastName'
              value={form.secondLastName}
              onChange={handleChange}
              className='mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring focus:ring-green-200 focus:border-green-500'
            />
          </div>
          <div>
            <label className='text-sm font-medium text-gray-700 mb-1 flex items-center'>
              <Mail size={16} className='mr-2' />
              Correo electrónico
            </label>
            <input
              name='email'
              value={form.email}
              onChange={handleChange}
              className='mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring focus:ring-green-200 focus:border-green-500'
            />
          </div>
          <div>
            <label className='text-sm font-medium text-gray-700 mb-1 flex items-center'>
              <Phone size={16} className='mr-2' />
              Teléfono
            </label>
            <input
              name='phone'
              value={form.phone}
              onChange={handleChange}
              className='mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring focus:ring-green-200 focus:border-green-500'
            />
          </div>
          <div>
            <label className='text-sm font-medium text-gray-700 mb-1 flex items-center'>
              Contraseña
            </label>
            <input
              type="password"
              name='password'
              value={form.password}
              onChange={handleChange}
              className='mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring focus:ring-green-200 focus:border-green-500'
            />
          </div>
          <div className='flex justify-end space-x-4 mt-6'>
            <button
              type='button'
              onClick={onClose}
              className='bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition duration-200 flex items-center'
            >
              <X size={16} className='mr-2' />
              Cancelar
            </button>
            <button
              type='submit'
              className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200 flex items-center'
            >
              <Save size={16} className='mr-2' />
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
