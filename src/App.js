import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Layout from './pages/layout';
import Customer from './pages/customer';

function App() {
  return (
    <ChakraProvider>
     <Routes>
      <Route path="/" element={<Layout />} >
           <Route path="dashboard" element={<Dashboard />} ></Route>
           <Route path="customer" element={<Customer />} ></Route>
      </Route>
     </Routes>
    </ChakraProvider>
  );
}

export default App;
