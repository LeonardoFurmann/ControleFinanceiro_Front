import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext'

const Header = () => {

  const { logout } = useAuth();

  return (
    <header className="bg-card w-full flex items-center justify-between px-8 py-4 rounded-b-sm shadow-md">
      <div className="flex items-center space-x-4">
        <img src="/pig.png" alt="Pig" className="h-14 w-14" />
        <span className="text-xl font-semibold text-foreground">Controle Financeiro</span>
      </div>

      <nav className="flex space-x-6 items-center">
        <Link to="/dashboard" className="text-foreground hover:text-primary font-semibold hover:text-mint-500 transition">
          Dashboard
        </Link>
        <Link to="/calendar" className="text-foreground hover:text-primary font-semibold hover:text-mint-500 transition">
          Calendário
        </Link>
        <Link to="/categories" className="text-foreground hover:text-primary font-semibold hover:text-mint-500 transition">
          Categorias
        </Link>
        <Link to="/payment-methods" className="text-foreground hover:text-primary font-semibold hover:text-mint-500 transition">
          Métodos de Pagamento
        </Link>
        <Button className='bg-card hover:bg-background border-border border text-foreground cursor-pointer' onClick={logout} >Sair</Button>
      </nav>
    </header>
  );
};

export default Header;
