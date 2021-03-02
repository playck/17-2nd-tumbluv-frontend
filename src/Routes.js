import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Main from './Pages/Main/Main';
import Detail from './Pages/Detail/Detail';
import Login from './Pages/Login/Login';
import MyPage from './Pages/MyPage/MyPage';
import Payment from './Pages/Payment/Payment';
import ProjectUpload from './Pages/ProjectUpload/ProjectUpload';
import SignUp from './Pages/SignUp/SignUp';
import Nav from './Components/Nav/Nav';
import { Reset } from 'styled-reset';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/detail:id" component={Detail} />
          <Route exact path="/mypage" component={MyPage} />
          <Route exact path="/payment:id" component={Payment} />
          <Route exact path="/projectupload" component={ProjectUpload} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
