import React from 'react';
import { Route, Switch, Redirect, routerRedux } from 'dva/router'; // Router,
import dynamic from 'dva/dynamic';

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/app',
      // models: () => [import("./models/users")],
      // models: () => import('./models/users'),
      component: () => import('./routes/App')
    },
    {
      path: '/list',
      component: () => import('./routes/list')
    },
    {
      path: '/detail',
      component: () => import('./routes/detail')
    },
    {
      path: '/login',
      component: () => import('./routes/login')
    }
  ];

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/list" />} />
        {routes.map(({ path, ...dynamics }, key) => (
          <Route
            key={key}
            exact
            path={path}
            component={dynamic({
              app,
              ...dynamics
            })}
          />
        ))}
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
// import React from 'react';
// import { Router, Route, Switch } from 'dva/router';
// import IndexPage from './routes/IndexPage';

// function RouterConfig({ history }) {
//   return (
//     <Router history={history}>
//       <Switch>
//         <Route path="/" exact component={IndexPage} />
//       </Switch>
//     </Router>
//   );
// }

// export default RouterConfig;
