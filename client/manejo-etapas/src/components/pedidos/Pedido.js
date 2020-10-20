import React, { useState } from 'react';

const Pedidos = ({pedido, i}) => {    
      return(
        <div>
            <div key={pedido.id} id={pedido.id}>
                <div>
                <p> { pedido.id } - { pedido.estado }</p>
                </div>
            </div>
        </div>

      );

      
}

export default Pedidos;