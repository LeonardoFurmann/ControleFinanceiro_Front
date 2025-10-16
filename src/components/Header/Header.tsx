import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const Header = (props: Props) => {
  return (
    <header className="bg-card w-full flex items-center justify-between px-8 py-4 rounded-b-sm shadow-md">
      <div className="flex items-center space-x-4">
        <img src="/pig.png" alt="Pig" className="h-14 w-14" />
        <span className="text-gray-800  text-xl font-semibold text-foreground">Controle Financeiro</span>
      </div>

      <nav className="flex space-x-6">
        <Link to="/dashboard" className="text-gray-800  text-foreground hover:text-primary font-semibold hover:text-mint-500 transition">
          Dashboard
        </Link>
        <Link to="/calendar" className="text-gray-800  text-foreground hover:text-primary font-semibold hover:text-mint-500 transition">
          Calendário
        </Link>
        <Link to="/categories" className="text-gray-800  text-foreground hover:text-primary font-semibold hover:text-mint-500 transition">
          Categorias
        </Link>
        <Link to="/payment-methods" className="text-gray-800  text-foreground hover:text-primary font-semibold hover:text-mint-500 transition">
          Métodos de Pagamento
        </Link>
      </nav>
    </header>
  );
};

export default Header;
