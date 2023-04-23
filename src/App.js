import { BrowserRouter, Link, Outlet, useRoutes } from 'react-router-dom';

// Pages
import About from './pages/about.jsx';
import Home from './pages/Home/home.jsx'

const App = () => {

    const routes = useRoutes([
      { path: '/', element: <Home /> },
        {path: 'about',element: <About/>},
    ]);

    return routes;
};

export default App;