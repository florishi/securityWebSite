import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/main'
import Singin from './components/body/usermange/usermanagecomponent/signin'
import SignUp from './components/body/usermange/usermanagecomponent/signgup';
import wallet from './components/body/usermange/wallet';

function App() {
  return (
    <Router>
      <div className="App" >
        <Routes>
          <Route path='/signin' Component={Singin} />
          <Route path = "/signup" Component={SignUp} />
          <Route path='/' Component={Main} />
          <Route path="/wallet" Component={wallet} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
