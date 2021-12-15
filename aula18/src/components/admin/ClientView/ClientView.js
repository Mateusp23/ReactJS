import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Api from '../../../Api';
import {getToken} from '../../../Auth';

export default function ClientView() {
    
    const [clients, setClients] = useState([]);
    const history = useHistory();
    
    useEffect(()=>{ //load
        Api.get(
            '/clients',
            {
                params : {},
                headers : {
                    Authorization: 'Bearer '+  getToken()
                }
            }
        )
        .then((response)=>{
            setClients(response.data);
        })
    }, [])  

    const handleAddButton = () => {
        history.push('/admin/client/add')
    }
    
    return (
      <div className="row">
        <div className="com-sm-1"></div>
        <div className="com-sm-10 container">
          <h1 className="title-client-list">Lista de clientes</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>id</th>
                <th>nome</th>
                <th>email</th>
                <th>telefone</th>
                <th>endereço</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.idClient}>
                  <td>{client.idClient}</td>
                  <td>{client.name}</td>
                  <td>{client.emailt}</td>
                  <td>{client.phone}</td>
                  <td>{client.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-div">
            <button className="btn-new-client" onClick={handleAddButton}>
                Novo Cliente
            </button>
          </div>
        </div>
        <div className="com-sm-1"></div>
      </div>
    );
}