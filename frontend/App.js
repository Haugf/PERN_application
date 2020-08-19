import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddUser from "./views/add-user/AddUser";
import UpdateUser from "./views/update-user/UpdateUser";
import DeleteUser from "./views/delete-user/DeleteUser";
import AllUsers from "./views/all-users/AllUsers";

const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={AllUsers} />
        <Route exact path="/addUser" component={AddUser} />
        <Route exact path="/updateUser" component={UpdateUser} />
        <Route exact path="/deleteUser" component={DeleteUser} />
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
