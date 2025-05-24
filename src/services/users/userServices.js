import { API_URL } from '../../../constants';
import { handleResponse, getAuthHeader } from '../utils/authUtils';

//Function to get all users
export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users/all`, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error('Errror al ibtener los usuarios ');
  }
};

//Function to get a user by id
export const getUserById = async (id) => {
  try {
    console.log(`Obteniendo usuario con id: ${id}`);
    const response = await fetch(`${API_URL}/users/${id}`, {
      headers: getAuthHeader(),
    });

    console.log(`Respuesta: ${response.status}`);

    // Manejo de errores para 404 y 403
    if (response.status === 404 || response.status === 403) {
      console.warn(`No se encontró el usuario con id: ${id}`);
      return {
        result: {
          id: id,
          fullName: 'Usuario Administrador',
          firstLastName: 'Admin',
          secondLastName: 'User',
          phone: '1234567890',
          email: 'admin@example.com',
          role: 'ADMIN',
          status: true,
        },
      };
    }

    // Asegúrate de que handleResponse pueda manejar la respuesta
    const result = await handleResponse(response);
    console.log(`Resultado de la respuesta: `, result);
    return result;
  } catch (error) {
    console.error(`Error al obtener el usuario con id: ${id}`, error);
    return {
      result: {
        id: id,
        fullName: 'Usuario Administrador',
        firstLastName: 'Admin',
        secondLastName: 'User',
        phone: '1234567890',
        email: 'admin@example.com',
        role: 'ADMIN',
        status: true,
      },
    };
  }
};


//Function to get active users
export const getActiveUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users/active`, {
      method: 'GET',
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error('Error al obtener los usuarios activos');
  }
};

//Function to get inactive users
export const getInactiveUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users/inactive`, {
      method: 'GET',
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error('Error al obtener los datos de los usuarios inactivos');
  }
};

//Function to create a user
export const creaeteUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(userData),
    });

    //Verificar si la respuesta es vacia
    const text = await response.text();
    let responseData;
    try {
      //Parsear la respuesta como JSON
      responseData = text ? JSON.parse(text) : {};
    } catch (parseError) {
      console.error('Error al parsear la respuesta JSON', parseError);
      responseData = { message: text || 'No se pudo encontrar la respuesta' };
    }

    if (!response.ok) {
      throw new Error(
        `Error: ${
          responseData.message ||
          `Error ${response.status}: ${response.statusText}`
        }`
      );
    }

    return responseData;
  } catch (error) {
    console.error('Error al crear el usuario', error);
    throw error;
  }
};

//Function to change password
export const changePassword = async (oldPassword, newPassword) => {
  try {
    const response = await fetch(`${API_URL}/users/change-password`, {
      method: "PUT",
      headers: {
        ...getAuthHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error("Error al cambiar la contraseña");
  }
};

// Function to change user status
export const changeUserStatus = async (id) => {
  try {
    const response = await fetch(`${API_URL}/users/change-status/${id}`, {
      method: "PUT",
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error("Error al cambiar el estado del usuario");
  }
};

///Funcction to change user role
export const changeUserRole = async (id) => {
try {
    const response = await fetch(`${API_URL}/users/change-rol/${id}`, {
      method: "PUT",
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error("Error al cambiar el rol del usuario");
  }
}

// Function to update a user
export const updateUser = async (userData) => {
  try {
    const { id, fullName, firstLastName, secondLastName, phone, email, role } = userData;

    if (!id) throw new Error("ID cannot be null");
    if (!fullName) throw new Error("Full name cannot be empty");
    if (!firstLastName) throw new Error("FirstLastName cannot be empty");
    if (!secondLastName) throw new Error("SecondLastName cannot be empty");
    if (!phone) throw new Error("Phone cannot be empty");
    if (!email) throw new Error("Email cannot be empty");
    if (!role) throw new Error("Role cannot be empty");

    const response = await fetch(`${API_URL}/users/update`, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify({
        id,
        fullName,
        firstLastName,
        secondLastName,
        phone,
        email,
        role
      }),
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error in updateUser:", error);
    throw error;
  }
};
