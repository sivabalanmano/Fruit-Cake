import './App.css';
import { Routes,Route } from 'react-router-dom';
import Details from './pages/details';
import Favorites from './pages/favorites';
import Home from './pages/home';
import Navbar from './components/navbar';

function App() {
  return (
    <div>
      <div className='min-h-screen p-6 bg-white text-lg text-gray-600' >
       <Navbar />
       <Routes>
       <Route path='/' element={<Home />} />
        <Route path='/favorites' element={<Favorites />}  />
        <Route path='/recipe-item/:id' element={<Details />}  />
       </Routes>
      </div>
    </div>
  );
}

export default App;
