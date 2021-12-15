import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Api from '../../../Api'
import { useHistory } from 'react-router-dom';
import {setToken} from '../../../Auth';

function Login() {
    const history = useHistory();

    const { handleSubmit, register } = useForm();

    const onSubmit = data => {
        Api.post('/users/login', {
            user: data.user,
            pass: data.password
        })
        .then(function(response){
            if(response.data.acess === 'true'){
                setToken(response.data.token)
            }
        })
        .finally(function(){
            history.push('/admin/home');
            window.location.reload(true);
        })
    }

    return(
        <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10" >
                <h1>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="mb-2">
                    <div className="form-group">
                        <label htmlFor="">Usuario</label>
                        <input 
                            type="text" 
                            className="form-control"
                            {...register("user")}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Senha</label>
                        <input 
                            type="text" 
                            className="form-control"
                            {...register("password")}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
            </div>
            <div className="col-sm-1"></div>
        </div>
    );
}
export default Login;