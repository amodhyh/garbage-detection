import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/results.css';


const ResultsPage = () => {

const location = useLocation();
const data = location.state?.data;

return (
  <div className="results-page">
    <h1>Your {data.predicted_class}</h1>
    
    <p>This is where results data will be displayed.</p>
  </div>
);




}
export default ResultsPage; 