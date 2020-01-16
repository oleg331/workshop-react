import React from "react";
import { Button, Paper, Grid, InputLabel, Input, FormHelperText } from "@material-ui/core";
import { observer, inject } from "mobx-react";

@inject('loginFormStore', 'authStore')
@observer
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.loginFormStore.onSubmit(e);

    const { loginFormStore, authStore } = this.props;

    authStore.setEmail(loginFormStore.values().email);
    authStore.setPassword(loginFormStore.values().password);
    authStore.login();
  }

  render() {
    const form = this.props.loginFormStore;
    alert(Object.values(form.values()).length);
    console.log(form.setup().fields);
    return (
      <form onSubmit={this.handleSubmit}>
        <Paper>
          <Grid container alignItems="flex-start">
            <Grid item xs={12}>
              <InputLabel htmlFor={form.$("email").id}>{form.$("email").label}</InputLabel>
              <Input
                {...form.$("email").bind({ type: form.$("email").type })}
                value={form.$("email").value}
              />
              <FormHelperText>{form.$("email").error}</FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor={form.$("password").id}>{form.$("password").label}</InputLabel>
              <Input
                {...form.$("password").bind({ type: form.$("password").type })}
                value={form.$("password").value}
              />
              <FormHelperText>{form.$("password").error}</FormHelperText>
            </Grid>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
            <p>{form.error}</p>
          </Grid>
        </Paper>
      </form>
    )
  }
}

export default Login;
