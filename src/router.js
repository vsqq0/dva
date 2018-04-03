import React from "react";
import { Route, Switch, Redirect, routerRedux } from "dva/router";// Router,
import dynamic from "dva/dynamic";

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: "/app",
      // models: () => [import("./models/users")],
      // models: () => import('./models/users'),
      component: () => import("./routes/App")
    },
    {
      path: "/cart",
      component: () => import("./routes/cart")
    },
    {
      path: "/chooseAdress/*",
      component: () => import("./routes/chooseAdress")
    },
    {
      path: "/classify",
      component: () => import("./routes/classify")
    },
    {
      path: "/classifyLookup/*",
      component: () => import("./routes/classifyLookup")
    },
    {
      path: "/cshop",
      component: () => import("./routes/cshop")
    },
    {
      // path: "/details",
      path:"/details/*",
      component: () => import("./routes/details")
    },
    {
      path: "/evaluate",
      component: () => import("./routes/evaluate")
    },
    {
      path: "/flagship",
      component: () => import("./routes/flagship")
    },
    {
      path: "/flagship/*",
      component: () => import("./routes/flagship")
    },
    {
      path: "/login",
      component: () => import("./routes/login")
    },
    {
      path: "/logistics/*",
      component: () => import("./routes/logistics")
    },
    {
      path: "/newAddress",
      component: () => import("./routes/newAddress")
    },
    {
      path: "/order",
      component: () => import("./routes/order")
    },
    {
      path: "/orderDetails/*",
      component: () => import("./routes/orderDetails")
    },
    {
      path: "/newAddress",
      component: () => import("./routes/newAddress")
    },
    {
      path: "/payjump/*",
      component: () => import("./routes/payjump")
    },
    {
      path: "/persional",
      component: () => import("./routes/persional")
    },
    {
      path: "/persionalConfig",
      component: () => import("./routes/persionalConfig")
    },
    {
      path: "/receipt",
      component: () => import("./routes/receipt")
    },
    {
      path: "/register/*",
      component: () => import("./routes/register")
    },
    {
      path: "/register",
      component: () => import("./routes/register")
    },
    {
      path: "/search",
      component: () => import("./routes/search")
    },
    {
      path: "/supplierCharts",
      component: () => import("./routes/supplierCharts")
    }
  ];

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/App" />} />
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