import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/main'
import Singin from './components/body/usermange/usermanagecomponent/signin'
import SignUp from './components/body/usermange/usermanagecomponent/signgup';
import wallet from './components/body/usermange/wallet';
import deposit from './components/body/usermange/deposit';
import History from './components/body/usermange/history';

function App() {
  return (
    <Router>
      <div className="App" >
        <Routes>
          <Route path='/signin' Component={Singin} />
          <Route path = "/signup" Component={SignUp} />
          <Route path='/' Component={Main} />
          <Route path="/wallet" Component={wallet} />
          <Route path='/deposit' Component={deposit}/>
          <Route path='/history' Component={History} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
