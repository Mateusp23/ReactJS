import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Api from "../../../Api";
import { getToken } from "../../../Auth";
import SearchBar from "../../commons/SearchBar/SearchBar";

export default function ClientView() {

  const [clients, setClients] = useState([]);
  const history = useHistory();

  useEffect(() => {
    Api.get("/clients", {
      params: {},
      headers: {
        Authorization: "Bearer" + getToken(),
      },
    })
    .then((response) => {
      setClients(response.data);
    });
  }, []);

  const handleAddButton = () => {
    history.push("/admin/client/add");
  };

  const handleClickUpdate = (idClient) => {
    history.push(`/admin/client/update/${idClient}`);
  };

  const handleClickDelete = (idClient) => {
    Api.delete(
      `/clients/${idClient}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + getToken()
        }
      }
    )
    .then(() => {
      history.push('/admin/client/view');
      window.location.reload(true);
    })
  }

  return (
    <div className="row">
      <div className="com-sm-1"></div>
      <div className="com-sm-10 container">
        <h1 className="title-client-list">Lista de clientes</h1>
        <SearchBar
          path="/clients/search"
          handle={(data) => {
            setClients(data);
          }}
        />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>id</th>
              <th>nome</th>
              <th>email</th>
              <th>telefone</th>
              <th>endereço</th>
              <th colspan="2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client)=>
              <tr key={client.idClient}>
                <td>{client.idClient}</td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.address}</td>
                <td>
                  <td>
                    <button
                      onClick={() => handleClickUpdate(client.idClient)}
                      className="btn-response"
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleClickDelete(client.idClient)}
                      className="btn-delete"
                    >
                      Deletar
                    </button>
                  </td>
                </td>
              </tr>
            )}
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
  )
}
