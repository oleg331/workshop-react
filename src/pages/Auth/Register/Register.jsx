import React from "react";
import { Button, Paper, Grid } from "@material-ui/core";
import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import { observer } from "mobx-react";
import Agent from '../../../agent';

import InputGeneral from "../../../components/InputGeneral";

const fields = [
  {
    name: "username",
    label: "Username",
    placeholder: "Enter username",
    rules: "required|string|between:5,25"
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email",
    rules: "required|email|string|between:5,25"
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter password",
    rules: "required|string|between:5,25"
  }
];

const plugins = {
  dvr: dvr(validatorjs)
};

const hooks = {
  onSuccess(form) {
    alert("Form is valid! Send the request here.");
    Agent.auth.register(form.values());
    console.log("Form Values!", form.values());
  },
  onError(form) {
    alert("Form has errors!");
    console.log("All form errors", form.errors());
  }
};

const formInstance = new MobxReactForm({ fields }, { plugins, hooks });

const RegisterForm = observer(({ form }) => (
  <form onSubmit={form.onSubmit}>
    <Paper item xs={12}>
      <Grid alignItems="flex-start">
          <InputGeneral field={form.$("username")} />
          <InputGeneral field={form.$("email")} />
          <InputGeneral field={form.$("password")} type="password" />
          <Button variant="contained" color="primary" onClick={form.onSubmit}>
            Login
          </Button>
      </Grid>
    </Paper>
    <p>{form.error}</p>
  </form>
));

class Register extends React.Component {
  render() {
    return <RegisterForm form={formInstance}></RegisterForm>;
  }
}

export default Register;
