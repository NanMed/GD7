import React, { Component } from 'react';

class Pedido extends Component {

    state = {
        id: this.props.pedido.id,
        estado: this.props.pedido.estado,
        nuevo_estado: this.props.pedido.nuevo_estado
    }

    render(){
        return(
            <>
                <td>{this.state.id}</td>
                <td>{this.state.estado}</td>
                <td>{this.state.nuevo_estado}</td>
            </>
        )
    }
}

export default Pedido;