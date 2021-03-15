import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useEffect } from 'react'

import { store } from './index'
import { loadQuestions } from './redux/actions/questionActions'

import Navbar from './components/layout/Navbar'
import Home from './components/dashboard/Home'
import Dashboard from './components/dashboard/Dashboard'
import QuestionDetails from './components/questions/QuestionDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateQuestion from './components/questions/CreateQuestion'


function App() {

  // Load questions
  useEffect(() => {
    store.dispatch(loadQuestions())
  })

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/dashboard' component={Dashboard}/>
          <Route path='/question/:id' component={QuestionDetails} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/ask-question' component={CreateQuestion} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
