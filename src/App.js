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
          <Route path="/" component={Feed} />
          <Route path="/report" componet={<Report />} />
        </Switch>
      </Router>
    </Box>
  );
}
export default App;
