'use client';

import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import {
  FaHome,
  FaBox,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
} from 'react-icons/fa';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const navItems = [
    { label: 'Página Inicial', href: '/', icon: <FaHome /> },
    { label: 'Produtos', href: '/produtos', icon: <FaBox /> },
    { label: 'Pedidos', href: '/pedidos', icon: <FaBox /> },
  ];

  const handleLogout = () => {
    document.cookie = 'token=; path=/; max-age=0';

    window.location.href = '/login';
  };

  return (
    <aside
      className={`h-screen fixed top-0 left-0 bg-gray-900 text-white flex flex-col shadow-lg transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        {!collapsed && <h2 className="text-xl font-bold">Meu Estoque</h2>}
        <button onClick={() => setCollapsed(!collapsed)} className="text-white">
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      <nav className="flex-1 px-2 mt-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-gray-800 transition-all"
              >
                <span className="text-lg">{item.icon}</span>
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-2 pb-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-3 py-2 rounded-md hover:bg-red-600 bg-red-500 transition-all"
        >
          <FaSignOutAlt />
          {!collapsed && <span className="text-sm">Sair</span>}
        </button>
      </div>
    </aside>
  );
}
