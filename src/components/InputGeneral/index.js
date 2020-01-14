import React from "react";
import { observer } from "mobx-react";
import {
  InputLabel,
  Input,
  FormHelperText,
  Grid
} from "@material-ui/core";

export default observer(({ field, type = "text", placeholder = null }) => (
  <Grid item xs={12}>
    <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
    <Input {...field.bind({ type, placeholder })} />
    <FormHelperText>{field.error}</FormHelperText>
  </Grid>
));
