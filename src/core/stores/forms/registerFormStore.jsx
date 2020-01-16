import { Form } from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';

import authStore from '../authStore';

class RegisterFormStore extends Form {

  plugins() {
    return {
      dvr: dvr(validatorjs)
    };
  }

  setup() {
    return {
      formName: "Register",
      fields: [
        {
          name: "username",
          label: "Username",
          placeholder: "Enter username",
          rules: "string|between:3,25"
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
          rules: "required|string|between:5,25",
          type: "password"
        }
      ]
    };
  }

  hooks() {
    return {
      onSuccess(form) {
        authStore.setUsername(form.values().username);
        authStore.setEmail(form.values().email);
        authStore.setPassword(form.values().password);

        authStore.register();
      },
      onError(form) {
        console.log("All form errors", form.errors());
      }
    };
  }
}

export default new RegisterFormStore();