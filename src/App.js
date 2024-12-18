import { Route, Routes } from 'react-router-dom';
import './App.css'
import CustomerRoutes from './Routers/CustomerRoutes';
import AdminRouters from '../src/Routers/AdminRouters'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<CustomerRoutes/>}></Route>        
        <Route path='/admin/*' element={<AdminRouters/>}/>
      </Routes>      
      <div>       
      </div>
    </div>
  );
}

export default App;
