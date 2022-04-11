import './App.css';
import {
  HashRouter as Router,
} from 'react-router-dom';
import Navigation from './components/Navigation';

const App = () => (
  <div className="App">
    <Router>
      <Navigation />
    </Router>
  </div>
);

export default App;
