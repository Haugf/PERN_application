import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";

const backendHost = `http://${window.env.BACKEND_HOST}`;
// process.env.BACKEND_HOST cannot be used b/c process.env is set at buildtime for react

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class UpdateUser extends Component {
  // We use a component because it is React-reccomended that form elements be 'controlled'(i.e. store info in state)
  //  Uncontrolled would be getting values using ref like in traditional html.
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      info: ""
    };
  }

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    const { history } = this.props;
    event.preventDefault();
    fetch(`${backendHost}/api/update-user`, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 201) {
          history.push("/");
        } else if (res.status === 409) {
        } else {
          const error = new Error(res.error);
          console.error(error);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const { classes } = this.props;
    const { username, info } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Update User
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={this.handleInputChange}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="info"
                  label="Info"
                  name="info"
                  autoComplete="info"
                  value={info}
                  onChange={this.handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update User
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/">See All Users</Link>
                <br />
                <Link to="/addUser">Add User</Link>
                <br />
                <Link to="/updateUser">Update User</Link>
                <br />
                <Link to="/deleteUser">Delete User</Link>
                <br />
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5} />
      </Container>
    );
  }
}

UpdateUser.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

export default withStyles(styles)(UpdateUser);
