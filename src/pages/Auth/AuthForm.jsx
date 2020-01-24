import React from "react";
import { Button, Paper, Grid, InputLabel, Input, FormHelperText } from "@material-ui/core";
import { observer, inject } from "mobx-react";
import { action } from "mobx";
import { withRouter } from "react-router-dom";

@inject("commonStore", "authStore")
@withRouter
@observer
class AuthForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { commonStore, history } = this.props;

    if (commonStore.token) {
      history.push("/");
    }
  }

  @action async handleSubmit(e) {
    e.preventDefault();

    const { formStore, authStore, history } = this.props;

    await formStore.onSubmit(e);

    authStore.setEmail(formStore.values().email);
    authStore.setPassword(formStore.values().password);

    switch (formStore.setup().formName) {
      case 'login': {
        authStore.login().then(() => history.push("/"));
        break;
      }
      case 'register': {
        authStore.setUsername(formStore.values().username);
        authStore.register().then(() => this.props.changeTabIndex(0));
        break;
      }
      default:
    }
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
                    fullWidth
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
