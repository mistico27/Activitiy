import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home Page</h1>} />
        <Route path='/login' element={<h1>login Page</h1>} />
        <Route path='/register' element={<h1>register Page</h1>} />
        <Route path='/task' element={<h1>task Page</h1>} />
        <Route path='/add-task' element={<h1>add -task Page</h1>} />
        <Route path='/task/:id' element={<h1>get a task Page</h1>} />
        <Route path='/profile' element={<h1>profile Page</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App