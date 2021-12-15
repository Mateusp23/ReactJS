import React from 'react';
import { Link, useHistory} from 'react-router-dom';
import { isAdmin, deleteToken} from '../../Auth';

function Nav(){

    const history = useHistory();

    const logout = () => {
        deleteToken();
        history.push('/user/login');
        window.location.reload(true);
    }
    return (
      <div class="container">
        <nav className="navbar navbar-expand-sm fixed-top nav-site">
          <ul className="navbar-nav justify-content-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                Sobre
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Produtos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contato
              </Link>
            </li>

            {isAdmin() ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/contact/view">
                    Listagem de Contatos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/client/view">
                    Listagem de Clientes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={logout}
                    to="/contact/view"
                  >
                    Sair
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/user/login">
                  Login
                </Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ml-auto"></ul>
        </nav>
      </div>
    );
} 
export default Nav;
