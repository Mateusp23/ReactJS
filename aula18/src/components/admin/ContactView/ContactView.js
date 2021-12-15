import React, { useEffect, useState } from "react";
import Api from '../../../Api';
import {getToken} from '../../../Auth';
import {useHistory} from 'react-router-dom';

function ContactView(){
    
    const [contacts, setContacts] = useState([]);
    const history = useHistory();

    useEffect(()=>{
        Api.get('/contacts',
            {
                params: {},
                headers: {
                    Authorization : "Bearer " + getToken()
                }
            }
        )
        .then((response)=>{
            setContacts(response.data);
        })
    },[]);

    const handleClickResponse = (idContact) =>{
        history.push(`/admin/contact/response/${idContact}`)
    }

    const handleClickDelete = (idContact) =>{
        Api.delete(`/contacts/${idContact}`, 
            {},
            {
                headers:{
                    Authorization: "Bearer " + getToken()
                }
            }
        )
        .then(()=>{
            history.push('/admin/contact/view')
            window.location.reload(true)
            }
        )

    }

    return(
        <div className="row">
            <div className="com-sm-1"></div>
            <div className="com-sm-10 container">
                <h2 className="title-contactView">Lista de contatos</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID:</th>
                            <th>Nome:</th>
                            <th>Email:</th>
                            <th>Mensagem:</th>
                            <th>Status:</th>
                            <th colSpan="2">Ações:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index)=>
                            <tr key={index}>
                                <td>{contact.idContact}</td>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.message}</td>
                                <td>{contact.status}</td>
                                <td>
                                    <button
                                        onClick={()=>handleClickResponse(contact.idContact)}
                                        className= "btn-response"
                                    >
                                        Responder
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={()=>handleClickDelete(contact.idContact)}
                                        className= "btn-delete"
                                    >
                                        Deletar
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="com-sm-1"></div>
        </div>
    );
}
export default ContactView;