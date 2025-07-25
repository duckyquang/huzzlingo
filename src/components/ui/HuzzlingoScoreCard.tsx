import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../store';

export default function HuzzlingoScoreCard() {
  const navigate = useNavigate();
  const { lastHuzzlingoScore, lastHuzzlingoDate } = useSelector((state: RootState) => state.learning);

  const handleAssessClick = () => {
    navigate('/final-challenge');
  };

  if (!lastHuzzlingoScore) {
    return (
      <div className="bg-huzz-dark-accent rounded-xl p-6 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-white/60">Huzzlingo Score</h3>
          <span className="text-2xl">🎯</span>
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className="text-2xl font-bold">N/A</p>
          <button
            onClick={handleAssessClick}
            className="text-sm px-3 py-1.5 bg-gradient-huzz rounded-lg hover:opacity-90 transition-opacity"
          >
            Assess now
          </button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(lastHuzzlingoDate!).toLocaleDateString();

  return (
    <div className="bg-huzz-dark-accent rounded-xl p-6 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-white/60">Huzzlingo Score</h3>
        <span className="text-2xl">🎯</span>
      </div>
      <div className="flex flex-col">
        <p className="text-3xl font-bold">{lastHuzzlingoScore}</p>
        <p className="text-sm text-white/40">Last assessed: {formattedDate}</p>
      </div>
    </div>
  );
} 