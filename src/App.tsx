import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ScrollToTop from './components/layout/ScrollToTop';
import Dashboard from './pages/Dashboard';
import FinalChallenge from './pages/FinalChallenge';
import Courses from './pages/Courses';
import Lesson from './pages/Lesson/Lesson';
import LessonComplete from './pages/Lesson/LessonComplete/LessonComplete';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Routes with main layout */}
        <Route element={<MainLayout />}>
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/lesson/:lessonId" element={<Lesson />} />
          <Route path="/lesson/:lessonId/complete" element={<LessonComplete />} />
          <Route path="/final-challenge" element={<FinalChallenge />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
