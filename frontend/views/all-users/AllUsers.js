import React, { Component } from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const shortid = require("shortid"); // generates a unique id w/ .generate()

const backendHost = `http://${window.env.BACKEND_HOST}`;
// process.env.BACKEND_HOST cannot be used b/c process.env is set at buildtime for react

function generate(array) {
  return array.map(value => (
    <ListItem key={shortid.generate()}>
      <ListItemText
        primary={`Username: ${value.username} Info: ${value.info}`}
      />
    </ListItem>
  ));
}

class AllUsers extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  async componentDidMount() {
    await fetch(`${backendHost}/api/get-users`, {})
      .then(res => {
        if (res.status === 200) {
          res.json().then(body => {
            this.setState({ users: JSON.parse(body) });
          });
        } else if (res.status === 404) {
        } else {
          const error = new Error(res.error);
          console.error(error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { users } = this.state;
    return (
      <>
        <Link to="/addUser">Add User</Link>
        <br />
        <Link to="/updateUser">Update User</Link>
        <br />
        <Link to="/deleteUser">Delete User</Link>
        <br />
        <br />
        <strong>All currently added users:</strong>
        <List>{generate(users)}</List>
      </>
    );
  }
}

export default AllUsers;
