import React, { useState } from 'react';

const Pedidos = ({pedido, i}) => {    
      return(
        <div>
            <div key={pedido.id} id={pedido.id}>
                <div>
                <p> Pedido   { pedido.id.toString() } </p>
                </div>
            </div>
        </div>

      );

      
}

export default Pedidos;