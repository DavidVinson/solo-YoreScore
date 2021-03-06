import React, { useEffect } from 'react';
//react bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import RulesPage from '../RulesPage/RulesPage.jsx';
import GamePage from '../GamePage/GamePage.jsx';
import RoundPage from '../RoundPage/RoundPage.jsx';
import BingoPage from '../BingoPage/BingoPage.jsx';
import BangoPage from '../BangoPage/BangoPage.jsx';
import BongoPage from '../BongoPage/BongoPage.jsx';
// import PointsPage from '../PointsPage/PointsPage.jsx';
import YoreGames from '../YoreGames/YoreGames.jsx';
import YoreScore from '../YoreScore/YoreScore.jsx';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    //put one Container here!
    <Container>
      <Router>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/user"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/user"
          >
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LandingPage at "/home"
            exact
            path="/home"
            authRedirect="/user"
          >
            <LandingPage />
          </ProtectedRoute>

          <Route path="/gamePage">
            <GamePage />
          </Route>

          <Route path="/roundPage">
            <RoundPage />
          </Route>

          <Route path="/bingo">
            <BingoPage />
          </Route>

          <Route path="/bango">
            <BangoPage />
          </Route>

          <Route path="/bongo">
            <BongoPage />
          </Route>

          <Route path="/score">
            <YoreScore />
          </Route>

          <Route path="/game">
            <YoreGames />
          </Route>

          <Route path="/rules">
            <RulesPage />
          </Route>

          {/* <Route path="/admin">
            <AdminPage />
          </Route> */}

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        
        <Footer />
      </Router>
    </Container>
  );
}

export default App;
