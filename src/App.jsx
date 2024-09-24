import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Tasks from './Tasks';
import Viewtasks from './Viewtasks';
import Navbar from './Navbar';
import EditTasks from './EditTasks';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/tasks' element={<ProtectedRoute> <Tasks /> </ProtectedRoute>}></Route>
          <Route path='/viewtasks' element={<ProtectedRoute> <Viewtasks /> </ProtectedRoute>}></Route>
          <Route path='/tasks/:taskId' element={<ProtectedRoute> <EditTasks /> </ProtectedRoute>}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
