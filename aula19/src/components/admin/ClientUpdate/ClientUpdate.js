import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import Api from "../../../Api";
import { getToken } from "../../../Auth";

export default function ClientUpdate() {

  let { idClient } = useParams();
  const [client, setClient] = useState([]);
  const { handleSubmit, register, reset } = useForm();
  const history = useHistory();

  useEffect(() => {
    Api.get(`/clients/${idClient}`, {
      params: {},
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
    .then((response) => {
      setClient(response.data);
      console.log(response.data);
      reset(response.data);
    });
  }, [idClient]);

  const onSubmit = (data) => {
    Api.put(
      `/clients/${client.idClient}`,
      {
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address
      },
      {
        headers: {
          Authorization: "Bearer " + getToken()
        },
      }
    )
      .then()
      .finally(() => {
        history.push("/admin/client/view")
        window.location.reload(true)
      })
  }

  return (
    <div className="row">
      <div className="col-sm-1"></div>
      <div className="col-sm-10 mb-5">
        <br />
        <br />
        <h1>Editar Cliente:</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Nome</label>
            <input
              {...register("name")}
              type="text"
              className="form-control"
              defaultValue={client.name}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              {...register("email")}
              type="text"
              className="form-control"
              defaultValue={client.email}
            />
          </div>
          <div className="form-group">
            <label>Telefone</label>
            <input
              {...register("phone")}
              type="text"
              className="form-control"
              defaultValue={client.phone}
            />
          </div>
          <div className="form-group">
            <label>Endereço</label>
            <input
              {...register("address")}
              type="text"
              className="form-control"
              defaultValue={client.address}
            />
          </div>
          <button type="submit" className="btn-send-client">
            Enviar
          </button>
          <br />
          <br />
        </form>
      </div>
      <div className="col-sm-1"></div>
    </div>
  );
}
