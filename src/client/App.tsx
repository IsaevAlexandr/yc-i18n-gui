import React from "react";
import { Route, Switch } from "react-router-dom";
import KeysetPage from "./pages/KeysetPage/KeysetPage";
import { QueryClientProvider } from "./components/QueryClient";

const App = () => (
  <QueryClientProvider>
    <Switch>
      <Route path="/:keyset?" component={KeysetPage} />
    </Switch>
  </QueryClientProvider>
);

export default App;
