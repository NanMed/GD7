import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Pedido from './components/pedidos/Pedidos'

function App() {
  // state = {
  //   id: '',
  //   estado: '',
  //   nuevo_estado: ''
  // }

  // getTodo = () => {
  //     axios.get('/tasks/all')
  //         .then(res => {
  //             this.setState({ tasks: res.data.data });
  //         })
  //         .catch(err => console.log(err));
  // }

  // addTodo = (description) => {
  //     return axios.post('/tasks/add', {
  //         description: description
  //     })
  //     .then(res => {
  //         console.log(res);
  //     })
  //     .catch(err => console.log(err));
  // }

  return (
    <Pedido></Pedido>
  );
}

export default App;
