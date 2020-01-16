import React from "react";
import { Button, Paper, Grid, InputLabel, Input, FormHelperText } from "@material-ui/core";
import { observer, inject } from "mobx-react";

@inject('registerFormStore', 'authStore')
@observer
class Register extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.registerFormStore.onSubmit(e);

    const { registerFormStore, authStore } = this.props;

    authStore.setUsername(registerFormStore.values().username);
    authStore.setEmail(registerFormStore.values().email);
    authStore.setPassword(registerFormStore.values().password);

    authStore.register();
  }

  render() {
    const form = this.props.registerFormStore;
    return (
      <form onSubmit={this.handleSubmit}>
        <Paper>
          <Grid container alignItems="flex-start">
            <Grid item xs={12}>
              <InputLabel htmlFor={form.$("username").id}>{form.$("username").label}</InputLabel>
              <Input
                {...form.$("username").bind({ type: form.$("email").type })}
                value={form.$("username").value}
              />
              <FormHelperText>{form.$("username").error}</FormHelperText>
            </Grid>
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
              Register
            </Button>
            <p>{form.error}</p>
          </Grid>
        </Paper>
      </form>
    )
  }
}

export default Register;
