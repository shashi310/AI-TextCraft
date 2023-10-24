import logo from './logo.svg';
import './App.css';
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import MainRoutes from './routes/MainRoutes';

function App() {
  return (
    <div className="App">
     <MainRoutes />
    </div>
  );
}

export default App;
