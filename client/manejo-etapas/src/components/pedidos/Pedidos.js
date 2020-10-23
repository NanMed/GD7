import React, { useState, useEffect} from 'react';
import axios from 'axios';

import ReactDOM from "react-dom";
import dragula from "react-dragula";


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
            
                if (source.id === 2 && target.id === 1) {
                    dragulaN.cancel(el);
                } else if (source.id === 4) {
                    dragulaN.cancel(el);
                } else {
                    actualizaPedido(el.id, source.id, target.id);
                }
            });    
    }, []);

    const actualizaPedido = async (id, source, target) => {
        const pedidoObject = {
            id: id,
            estado: source, 
            nuevo_estado: target
        };
        await axios.post('http://localhost:5000/pedido/actualiza', pedidoObject)
        .then((res) => {
            console.log("Pedido actualizado")
            // pedidoObject.id = res.data.data.id;
        }).catch((error) => {
            console.log("El error es: ", error)
        });
    }

    const addPedido = async () => {
        let cPedido = Object.assign([], pedidos);
        const pedidoObject = {
            id: '',
            estado: '1', 
            nuevo_estado:'1'
        };
        await axios.post('http://localhost:5000/pedido/add', pedidoObject)
        .then((res) => {
            console.log("id pedido ", res.data.id)
            pedidoObject.id = res.data.id;
        }).catch((error) => {
            console.log("El error es: ", error)
        });
        cPedido.push(pedidoObject);
        setPedidos(cPedido);
        console.log("Pedidos ", cPedido); 
    }

    return (
        <>
             <div className="container" >
                 <div className="row">Dashboard</div>
                 <br></br>
                 <div className ="row">
                     <button className="btn btn-primary" onClick={addPedido}>Crear pedido</button>
                 </div>
                 <br>
                 </br>
                 <div className ="row">
                     <div className ="col-md-3" >
                         1. Salida de planta
                         <div id="1" ref={salidaPedido}>
                            {pedidos
                            .filter((pos) => parseInt(pos.nuevo_estado) === 1)
                            .map((pedido, i) => (
                                <div key={pedido.id} id={pedido.id}>
                                <div>
                                <p> Pedido   { pedido.id } </p>
                                </div>
                            </div>
                            )
                        )}
                        </div>
                     </div>
                     <div className ="col-md-3" id="2" ref={LDDc}>2. LDC 
                     {pedidos
                            .filter((pos) => parseInt(pos.nuevo_estado) === 2)
                            .map((pedido, i) => (
                                <div key={pedido.id} id={pedido.id}>
                                <div>
                                <p> Pedido   { pedido.id } </p>
                                </div>
                            </div>
                            )
                        )}
                     </div>
                     <div className ="col-md-3" id="3" ref={procEntrega}>3. En proceso de entrega
                     {pedidos
                            .filter((pos) => parseInt(pos.nuevo_estado) === 3)
                            .map((pedido, i) => (
                                <div key={pedido.id} id={pedido.id}>
                                <div>
                                <p> Pedido   { pedido.id } </p>
                                </div>
                            </div>
                            )
                        )}
                     
                     </div>
                     <div className ="col-md-3"> 
                     <div className="row" style={{height:"10%"}}>4. Entregado</div>
                     <br/>
                     <div className="col" id="4" ref={completado} style={{height:"100%"}}>a. Completo <br/>

                     {pedidos
                            .filter((pos) => parseInt(pos.nuevo_estado) === 4)
                            .map((pedido, i) => (
                                <div key={pedido.id} id={pedido.id}>
                                <div>
                                <p> Pedido   { pedido.id } </p>
                                </div>
                            </div>
                            )
                        )}
                     </div>
 
                     <div className="col" id="5" ref={fallido} style={{height:"100%"}}>b. Fallido  <br/><br/>
                     {pedidos
                            .filter((pos) => parseInt(pos.nuevo_estado) === 5)
                            .map((pedido, i) => (
                                <div key={pedido.id} id={pedido.id}>
                                <div>
                                <p> Pedido   { pedido.id } </p>
                                </div>
                            </div>
                            )
                        )}
                     
                     </div>
                     </div>
                 </div>

                 
             </div>
             </>
             
      )
      
    }

