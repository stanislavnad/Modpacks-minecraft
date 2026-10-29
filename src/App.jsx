import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import MyModpacksPage from './pages/MyModpacksPage/MyModpacksPage';
import BuilderPage from './pages/BuilderPage/BuilderPage';
import AuthPage from './pages/AuthPage/AuthPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/modpacks" element={<MyModpacksPage />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
