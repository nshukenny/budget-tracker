import { Box } from "@mui/material";
import Navbar from "./component/Navbar";
import Feed from "./views/Feed";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Report from './views/Report';

function App() {
  return (
    <Box>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Feed} />
          <Route path="/report" component={Report} />
        </Switch>
      </Router>
    </Box>
  );
}

export default App;
