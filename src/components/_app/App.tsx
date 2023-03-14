import React from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { routes } from '../_routes';
import { AuthRoute } from '../_routes';
import { DefaultLayout } from '../_layout';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {routes.map((route, index) => {
            let Auth: React.FC<{ children?: React.ReactNode }> = Fragment;
            if (route.hasOwnProperty('auth')) if (route.auth) Auth = AuthRoute;
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Auth>
                    <Layout>
                      <Page />
                    </Layout>
                  </Auth>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
