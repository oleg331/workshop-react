import React from "react";
import { Button, Paper, Grid, InputLabel, Input, FormHelperText } from "@material-ui/core";
import { observer } from "mobx-react";

@observer
class AuthForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.formStore.onSubmit(e);

    // const { loginFormStore, authStore } = this.props;

    // authStore.setEmail(loginFormStore.values().email);
    // authStore.setPassword(loginFormStore.values().password);
    // authStore.login();
  }

  render() {
    const form = this.props.formStore;
    return (
      <form onSubmit={this.handleSubmit}>
        <Paper>
          <Grid container alignItems="flex-start">
            {form.setup().fields.map(field => {
              return (
                <Grid item xs={12} key={`${field.name}`}>
                  <InputLabel htmlFor={form.$(`${field.name}`).id}>{form.$(`${field.name}`).label}</InputLabel>
                  <Input
                    {...form.$(`${field.name}`).bind({ type: form.$(`${field.name}`).type })}
                    value={form.$(`${field.name}`).value}
                  />
                  <FormHelperText>{form.$(`${field.name}`).error}</FormHelperText>
                </Grid>
              )
            })}
            <Button type="submit" variant="contained" color="primary">
              {form.setup().formName}
            </Button>
            <p>{form.error}</p>
          </Grid>
        </Paper>
      </form>
    )
  }
}

export default AuthForm;
