import Home from '#/modules/Home/Home';
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export const RootRouter: React.FC = () => (
   <BrowserRouter>
      <Switch>
         <Route path="/" exact component={Home} />
         <Route path="*" component={() => <span>404 Not found</span>} />
      </Switch>
   </BrowserRouter>
);
