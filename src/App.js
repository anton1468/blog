import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import PostPage from './pages/PostsPage'
import CreatePage from './pages/CreatePage'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/"><PostPage /></Route>
          <Route path="/createpost"><CreatePage /></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
