import { Link, Outlet, useLocation } from 'react-router-dom';
import useAuthContext from '../../Hooks/useAuthContext';

export default function AdminLayout() {
  const { user } = useAuthContext();
  const location = useLocation();

  const links = [
    { to: '/admin', label: 'Dashboard', icon: '📊' },
    { to: '/admin/products', label: 'Products', icon: '📦' },
    { to: '/admin/users', label: 'Users', icon: '👥' },
  ];

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-[Poppins]">
      <div className="flex gap-2 items-center mb-8">
        <h1 className="text-3xl font-bold font-[Inter]">Admin Dashboard</h1>
        <span className="bg-[#DB4444] text-white text-xs px-2 py-1 rounded-full">{user?.role}</span>
      </div>
      <div className="flex gap-8 max-md:flex-col">
        <aside className="w-56 max-md:w-full shrink-0">
          <nav className="flex flex-col gap-1 max-md:flex-row max-md:overflow-x-auto">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors text-sm font-medium whitespace-nowrap ${
                  isActive(link.to)
                    ? 'bg-[#DB4444] text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
