import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Pedido from './Pedido';
import ReactDOM from "react-dom";
import dragula from "react-dragula";
import DragulaStyles from "react-dragula/dist/dragula.min.css";

export default function App() {
    let salidaPedido = React.createRef();
    let LDDc = React.createRef();
    let procEntrega = React.createRef();
    let completado = React.createRef();
    let fallido = React.createRef();

    const [pedidos, setPedidos] = useState([
        { id: 0, estado:'', nuevo_estado:'' }, 
    
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

            let salida = ReactDOM.findDOMNode(salidaPedido.current);
            let ldc = ReactDOM.findDOMNode(LDDc.current);
            let entrega = ReactDOM.findDOMNode(procEntrega.current);
            let entregaCom = ReactDOM.findDOMNode(completado.current);
            let entregaFall = ReactDOM.findDOMNode(fallido.current);
        
            var dragulaN = dragula(
              [salida, ldc, entrega, entregaCom, entregaFall],
              {}
            );
            dragulaN.on("drop", function (el, target, source, sibling) {
              console.log("Elemento", el, "Target", target, "Source", source, sibling);
              var elId = el.id;
              var destinoId = target.id;
              console.log(elId);
              console.log("DestinoID", destinoId);
              //actualizaEstado(destinoId);
        
              if (source.id == 2 && target.id == 1) {
                dragulaN.cancel(el);
              }
              if (source.id == 4 || source.id == 5) {
                dragulaN.cancel(el);
              }
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

    /*const actualizaEstado = async (destino) => {
        await axios
          .put(`http://localhost:5000/pedido/${id}`, { id: destino })
          .then((res) => {
            console.log("Estado actualizado");
          })
          .catch((err) => {
            console.log(err);
          });
      };*/


    return (
        <>
             <div className="container" >
                 <div className="row">Dashboard</div>
                 <div className ="row">
                     <button className="btn btn-primary" onClick={addPedido}>Crear pedido</button>
                 </div>
                 <div className ="row">
                     <div className ="col-md-3" >
                         1. Salida de planta
                         <div id="1" ref={salidaPedido}>
                            {pedidos.map((pedido, i) => (
                                <div key={pedido.id} id={pedido.id}>
                                <div>
                                <p> Pedido   { pedido.id } - { pedido.estado }</p>
                                </div>
                            </div>
                            )
                        )}
                        </div>
                     </div>
                     <div className ="col-md-3" id="2" ref={LDDc}>2. LDC </div>
                     <div className ="col-md-3" id="3" ref={procEntrega}>3. En proceso de entrega</div>
                     <div className ="col-md-3"> 
                     <div className="row" style={{height:"10%"}}>4. Entregado</div>
                     <div className="row" id="4" ref={completado} style={{height:"45%"}}>a. Completo <br/>
                     </div>
                     <div className="row" id="5" ref={fallido} style={{height:"45%"}}>b. Fallido</div>
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

