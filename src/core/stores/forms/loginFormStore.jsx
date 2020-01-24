import { Form } from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';

class LoginFormStore extends Form {
  plugins() {
    return {
      dvr: dvr(validatorjs)
    };
  }

  setup() {
    return {
      formName: "login",
      fields: [
        {
          name: "email",
          label: "Email",
          placeholder: "Enter Email",
          rules: "required|email|string|between:5,25",
          value: ""
        },
        {
          name: "password",
          label: "Password",
          placeholder: "Enter Password",
          rules: "required|string|between:5,25",
          value: "",
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

export default new LoginFormStore();