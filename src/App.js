import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Layout from './pages/layout';
import Customer from './pages/customer/customer';
import CustomerAdd from './pages/customer/customer_add';
import CustomerEdit from './pages/customer/customer_edit';
import Mill from './pages/mill/mill';
import MillAdd from './pages/mill/mill_add';
import MillEdit from './pages/mill/mill_edit';
import Item from './pages/item/item';
import ItemAdd from './pages/item/item_add';
import ItemEdit from './pages/item/item_edit';
import YarnType from './pages/yarn_type/yarn_type';
import YarnTypeAdd from './pages/yarn_type/yarn_type_add';
import YarnTypeEdit from './pages/yarn_type/yarn_type_edit';
import Inward from './pages/inward/inward';



function App() {
  return (
    <ChakraProvider>
     <Routes>
      <Route path="/" element={<Layout />} >
            
           <Route path="dashboard" element={<Dashboard />} ></Route>

           <Route path="customer" element={<Customer />} ></Route>
           <Route path="customer_add" element={<CustomerAdd />} ></Route>
           <Route path="customer_edit" element={<CustomerEdit />} ></Route>

           <Route path="mill" element={<Mill />} ></Route>
           <Route path="mill_add" element={<MillAdd />} ></Route>
           <Route path="mill_edit" element={<MillEdit />} ></Route>

           <Route path="item" element={<Item />} ></Route>
           <Route path="item_add" element={<ItemAdd />} ></Route>
           <Route path="item_edit" element={<ItemEdit />} ></Route>

           <Route path="yarn_type" element={<YarnType />} ></Route>
           <Route path="yarn_type_add" element={<YarnTypeAdd />} ></Route>
           <Route path="yarn_type_edit" element={<YarnTypeEdit />} ></Route>
           
           <Route path="inward" element={<Inward />} ></Route>

      </Route>
     </Routes>
    </ChakraProvider>
  );
}

export default App;
