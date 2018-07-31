import React, { Component } from 'react';

import PostQuestion from './components/post.question';
import Questions from './components/questions';
import PostAnswer from './components/post.answer';
import About from './components/About';
import Contact from './components/Contact';
import Workshops from './components/Workshops';
import ClientWorkshop from './components/ClientWorkshop';
import Applicants from './components/Applicants';
import Index from './components/Index';


import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends Component {

  // <Route exact path="/" component={Questions} />

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Index} />
            {/*<Route path="/applicants/:Id" component={Applicants} />*/}
            {/*<Route path="/workshop/:workshopId/applicants" component={Applicants} />*/}
            <Route path="/client/workshops" component={ClientWorkshop} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route exact path="/workshops" component={Workshops} />
            <Route path="/workshops/:workshopId/applicants" component={Applicants}/>
            <Route exact path="/workshops/:workshopId" component={Workshops} />

            <Route path="/answers/:questionId" component={PostAnswer} />
            <Route path="/postquestion" component={PostQuestion} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
