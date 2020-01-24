import { Form } from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';

class RegisterFormStore extends Form {

  plugins() {
    return {
      dvr: dvr(validatorjs)
    };
  }

  setup() {
    return {
      formName: "register",
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
        console.log("Form valid", form.values());
      },
      onError(form) {
        console.log("All form errors", form.errors());
      }
    };
  }
}

export default new RegisterFormStore();