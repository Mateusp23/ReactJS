import React from "react";
import { useForm } from "react-hook-form";
import Api from "../../../Api";
import {useHistory} from 'react-router-dom';
import {setToken} from '../../../Auth'

function Login() {

    const {handleSubmit, register} = useForm()
    const history = useHistory();
    
    const onSubmit = data=>{
        Api.post('/users/login',{
            user: data.user,
            pass: data.password
        })
        .then(function (response) {
            if(response.data.acess === 'true'){
                setToken(response.data.token);
            }
        })
        .finally(function(){
            history.push('/admin/home')
            window.location.reload(true)
        })
    }
    
    return(
        <div className="row">
                    
            <div className="col-sm-1"></div>
            <div className="col-sm-10 container" >  
                <h1 className="title-login">Entrar:</h1>
                <form className="mb-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="">Usuário:</label>
                        <input 
                            {...register("user")}
                            type="text" 
                            className="form-control"
                        />
                        <br/>
                        <label htmlFor="">Senha:</label>
                        <input 
                            {...register("password")}
                            type="text" 
                            className="form-control"
                        />
                        <br/>
                        <button type="submit" className="btn-login">Enviar</button>
                    </div>
                </form>
            </div>
            <div className="col-sm-1"></div>
        </div>
    );
}

export default Login;