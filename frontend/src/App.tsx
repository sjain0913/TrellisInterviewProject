import React from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SensorList from "./pages/SensorList";
import EastSensor from "./pages/EastSensor";
import WestSensor from "./pages/WestSensor";
import NorthSensor from "./pages/NorthSensor";
import SouthSensor from "./pages/SouthSensor";

const App: React.FC = () => {
  return (
    <Container>
      {/* Links for all the individual sensor pages */}
      <Router>
        <Switch>
          <Route exact path="/">
            <Header><Title>Sensor Viewer</Title></Header>
            <SensorList />
          </Route>
          <Route path="/east">
            <EastSensor/>
          </Route>
          <Route path="/west">
            <WestSensor/>
          </Route>
          <Route path="/south">
            <SouthSensor/>
          </Route>
          <Route path="/north">
            <NorthSensor/>
          </Route>
        </Switch>
      </Router>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #226f54;
  height: 70px;
  padding: 20px;
  color: white;
`;

const Title = styled.h1`
  font-size: 2em;
`;

export default App;
