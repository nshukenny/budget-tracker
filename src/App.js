import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Feed from "./Feed";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Report from './Report';

function App() {
  return (
    <Box>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" component={Feed} />
          <Route path="report" element={<Report />} />
        </Switch>
      </Router>
    </Box>
  );
}
export default App;
