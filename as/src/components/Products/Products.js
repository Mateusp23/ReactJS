import React, {useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, useParams, Link } from 'react-router-dom';
import Api from '../../Api';

function Products() {
    
    let {path, url} = useRouteMatch();

    return(
        <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
                <h2>Pagina de produtos </h2>
                <ul>
                    <li><Link to={`${url}/1`}>Categoria 1</Link></li>
                    <li><Link to={`${url}/2`}>Categoria 2</Link></li>
                    <li><Link to={`${url}/3`}>Categoria 3</Link></li>
                </ul>
                    <Switch>
                        <Route exact path={path}>
                            <AllCattegory />
                        </Route>
                        <Route path={`${path}/:catId`}>
                            <Category/>
                        </Route>
                    </Switch>
            </div>
            <div className="col-sm-1"></div>
        </div>
    );
}
export default Products;

function AllCattegory() {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        Api.get('/products')
            .then((response)=>{
                setProducts(response.data);
            });
    },[]);

    return(
        <>
            <div className="col-sm-10">
                <h2>Todos os produtos </h2>
                <table className="table table-striped">
                    <thead>
                        <th>Nome:</th>
                        <th>Preço:</th>
                        <th>Descrição:</th>
                    </thead>
                    <tbody>
                        {products.map((product, index) =>
                            <tr key={index} >
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )    
}

function Category() {

    let {catId} = useParams();
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        Api.get(`/products/category/${catId}`)
            .then((response)=>{
                setProducts(response.data)
            });
    },[catId]);

    return (
        <>
            <div className="col-sm-10">
                <h2>Categoria {catId} foi selecionado </h2>
                <table className="table table-striped">
                    <thead>
                        <th>Nome:</th>
                        <th>Preço:</th>
                        <th>Descrição:</th>
                    </thead>
                    <tbody>
                        {products.map((product, index)=>
                            <tr key={index} >
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}