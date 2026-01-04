import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Materi1 from './pages/materi1';
import Materi2 from './pages/materi2';
import Materi3 from './pages/Materi3';
import Materi4 from './pages/Materi4';
import Materi5 from './pages/Materi5';
import Login from './pages/Login';
import Materi6 from './pages/Materi6';

// We will import the other pages later as we build them
// import Materi1 from './pages/Materi1'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Placeholders for future pages so the app doesn't crash if you click links */}
      <Route path="/materi/1" element={<Materi1 />} />
      <Route path="/materi/2" element={<Materi2 />} />
      <Route path="/materi/3" element={<Materi3 />} />
      <Route path="/materi/4" element={<Materi4 />} />
      <Route path="/login" element={<Login />} />
      <Route path="/materi/5" element={<Materi5 />} />
      <Route path="/materi/6" element={<Materi6 />} />
    </Routes>
  );
}

export default App;