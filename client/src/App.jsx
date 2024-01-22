import {BrowserRouter,Routes,Route} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import {AuthProvider} from './context/AuthContext';
import TaskPage from './pages/TaskPage';
import TaskformPage from './pages/TaskFormPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import { TaskProvider } from './context/TaskContext';
import Navbar from './components/Navbar';

function App(){
  return (
  <AuthProvider>
    <TaskProvider>
    <BrowserRouter>
    <main className='container mx-auto px-10'>
    <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />

      <Route element={<ProtectedRoute/>}>  
        <Route path='/tasks'  element={<TaskPage/>} />
        <Route path='/add-task' element={<TaskformPage/>} />
        <Route path='/tasks/:id' element={<TaskformPage/>} />
        <Route path='/profile' element={<ProfilePage/>} />
      </Route>
      </Routes>
      </main>  
    </BrowserRouter>
    </TaskProvider>
  </AuthProvider>    
  )
}

export default App