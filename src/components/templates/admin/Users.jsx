import { useState, useEffect } from 'react';
import AsideBar from '../../ui/AsideBar';

const USERS_PER_PAGE = 8;

const mockUsers = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  nombre: 'Christian',
  apellidos: 'Aviles Sotelo',
  correo: `christian${i}@ibt.unam.mx`,
  telefono: '7775201281',
  rol: i === 0 ? 'Administrador' : i % 3 === 0 ? 'Externo' : 'Interno',
  estado: i % 2 === 0,
}));

const Users = () => {
  const [isAsideExpanded, setIsAsideExpanded] = useState(() => {
    const saved = localStorage.getItem('isExpanded');
    return saved ? JSON.parse(saved) : false;
  });

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);

  useEffect(() => {
    const results = mockUsers.filter((user) =>
      `${user.nombre} ${user.apellidos} ${user.correo}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredUsers(results);
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handleAsideToggle = (expanded) => setIsAsideExpanded(expanded);

  return (
    <div className='flex min-h-screen w-full bg-greyPrimary'>
      <aside className='h-screen sticky top-0 z-20'>
        <AsideBar activePage='users' onToggle={handleAsideToggle} />
      </aside>

      <main
        className={`flex flex-col flex-1 bg-greyPrimary transition-all duration-300 ease-in-out ${
          isAsideExpanded ? 'ml-[16em]' : 'ml-[4em]'
        } overflow-hidden h-screen relative`}
      >
        <div className='flex-1 flex flex-col overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'>
          {/* Encabezado */}
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 mt-14'>
            <div className='flex gap-2 flex-wrap'>
              <input
                type='text'
                placeholder='Buscar...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='border rounded-full px-4 py-2 text-sm w-full sm:w-auto'
              />
              <select className='border rounded-md px-2 py-2 text-sm'>
                <option>Filtrar por</option>
                <option>Activos</option>
                <option>Inactivos</option>
              </select>
            </div>
            <button className='bg-primary text-white px-4 py-2 rounded-md shadow-md w-full sm:w-auto'>
              + Agregar Usuario
            </button>
          </div>

          {/* Tabla */}
          <div className='overflow-x-auto bg-white shadow-md rounded-lg'>
            <table className='min-w-full text-sm text-left'>
              <thead className='bg-gray-100 text-gray-600'>
                <tr>
                  <th className='p-3'>
                    <input type='checkbox' />
                  </th>
                  <th className='p-3'>Nombre</th>
                  <th className='p-3'>Apellidos</th>
                  <th className='p-3'>Correo</th>
                  <th className='p-3'>Teléfono</th>
                  <th className='p-3'>Rol</th>
                  <th className='p-3'>Estado</th>
                  <th className='p-3'>Acción</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className='border-t hover:bg-gray-50'>
                    <td className='p-3'>
                      <input type='checkbox' />
                    </td>
                    <td className='p-3'>{user.nombre}</td>
                    <td className='p-3'>{user.apellidos}</td>
                    <td className='p-3'>{user.correo}</td>
                    <td className='p-3'>{user.telefono}</td>
                    <td className='p-3'>
                      <span
                        className={`px-2 py-1 rounded-full text-white text-xs ${
                          user.rol === 'Administrador'
                            ? 'bg-amber-500'
                            : user.rol === 'Interno'
                            ? 'bg-blue-500'
                            : 'bg-purple-500'
                        }`}
                      >
                        {user.rol}
                      </span>
                    </td>
                    <td className='p-3'>
                      <input
                        type='checkbox'
                        className=' ios8-switch'
                        checked={user.estado}
                      />
                    </td>
                    <td className='p-3'>
                      <button className='bg-green-600 text-white px-3 py-1 rounded-md text-xs'>
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className='flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-600 gap-2'>
            <p>
              {Math.min(
                (currentPage - 1) * USERS_PER_PAGE + 1,
                filteredUsers.length
              )}
              -{Math.min(currentPage * USERS_PER_PAGE, filteredUsers.length)} de{' '}
              {filteredUsers.length}
            </p>
            <div className='flex items-center gap-2'>
              <span>Filas por página: {USERS_PER_PAGE}</span>
              <button
                className='px-2 py-1 disabled:text-gray-400'
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              <span>
                {currentPage}/{totalPages}
              </span>
              <button
                className='px-2 py-1 disabled:text-gray-400'
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Users;
