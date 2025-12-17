import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookingPage from './pages/BookingPage';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '1rem 0', marginBottom: '2rem' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <h1 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>Badminton Booking</h1>
              <nav style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}>Book Court</Link>
                <Link to="/admin" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}>Admin</Link>
              </nav>
            </div>
            <div>
              {/* User profile could go here */}
            </div>
          </div>
        </header>
        <main className="container">
          <Routes>
            <Route path="/" element={<BookingPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
