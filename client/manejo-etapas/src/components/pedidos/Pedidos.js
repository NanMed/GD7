import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Pedido from './Pedido';


const Pedidos = () => {
   
    const [pedido, setPedido] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchPedido() {
        const result = await axios("http://localhost:3000/pedido/all")
        setPedido(result.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchPedido();
    }, []);

    return (
        <>
             <div className="container">
                 <div className="row">Dashboard</div>
                 <div className ="row">
                     <button className="btn btn-primary">Crear pedido</button>
                 </div>
                 <div className ="row">
                     <div className ="col-md-3">
                         1. Salida de planta
                        <div>
                            {pedido.map((pedido, i) => {
                                return (
                                    <h1 key={i}>
                                        <h2>
                                            {pedido.id}
                                        </h2>
                                    
                                    </h1>
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