import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Pedido from './Pedido';


const Pedidos = () => {

    const [pedidos, setPedidos] = useState([
        { id: '', estado:'', nuevo_estado:'' }, 
    
    ]);
    
    useEffect(() => {
        axios('http://localhost:5000/pedido/all')
            .then((response) => {
                console.log(response['data']['data']);
                setPedidos(response.data.data);
            })
            .catch((error) => {
                console.log('There was an error: ', error);
            });
    }, []);

    const addPedido = async () => {
        let cPedido = Object.assign([], pedidos);
        const pedidoObject = {
            estado: '1', 
            nuevo_estado:'0'
        };
        await axios.post('http://localhost:5000/pedido/add', pedidoObject)
        .then((res) => {
            console.log(res.data.data)
            pedidoObject.id = res.data.data.id;
        }).catch((error) => {
            console.log("El error es: ", error)
        });
        cPedido.push(pedidoObject);
        setPedidos(cPedido);
        console.log("Pedidos ", cPedido);
    }

    return (
        <>
             <div className="container">
                 <div className="row">Dashboard</div>
                 <div className ="row">
                     <button className="btn btn-primary" onClick={addPedido}>Crear pedido</button>
                 </div>
                 <div className ="row">
                     <div className ="col-md-3">
                         1. Salida de planta
                         <div>
                            {pedidos.map((pedido, i) => {
                                //console.log("TODO DENTRO DE LISTA DE TASKS",todo);
                                return (
                                    <Pedido pedido={pedido} i={pedido.id}/>
                                )
                            })}
                        </div>
                     </div>
                     <div className ="col-md-3">2. LDC </div>
                     <div className ="col-md-3">3. En proceso de entrega</div>
                     <div className ="col-md-3"> 
                     <div className="row">4. Entregado</div>
                     <div className="row">a. Completo</div>
                     <div className="row">b. Fallido</div>
                     </div>
                 </div>
             </div>
             </>
      )
    }
//     render(){    
//         return (
//             <>
//             <div className="container">
//                 <div className="row">Dashboard</div>
//                 <div className ="row">
//                     <button className="btn btn-primary">Crear pedido</button>
//                 </div>
//                 <div className ="row">
//                     <div className ="col-md-3">
//                         1. Salida de planta
//                         <div>
//                             {/* {this.state.pedido.map((pedido, i) => {
//                                 return (
//                                     <tr key={i}>
//                                         <Pedido id={i} pedido={pedido} />
//                                     </tr>
//                                 )
//                             })} */}
//                         </div>
//                     </div>
//                     <div className ="col-md-3">2. LDC </div>
//                     <div className ="col-md-3">3. En proceso de entrega</div>
//                     <div className ="col-md-3"> 
//                     <div className="row">4. Entregado</div>
//                     <div className="row">a. Completo</div>
//                     <div className="row">b. Fallido</div>
//                     </div>
//                 </div>
//             </div>
//             </>
//         );
//     }
// }

export default Pedidos;