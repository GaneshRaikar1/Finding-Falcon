import './App.css';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom'

import Header from './components/Header';
import SelectionScreen from './screens/SelectionScreen';
import ResultScreen from './screens/ResultScreen';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Router>
      <Header/> 
        <Routes>
          <Route path='/'       element={< SelectionScreen/>} />
          <Route path='/result' element={< ResultScreen />} />
          <Route path='/*'      element={<Navigate to='/' replace />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
