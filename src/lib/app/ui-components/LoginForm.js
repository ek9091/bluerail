import React, { createRef, useState } from "react";

import { TextInput, Button, FormError } from "../../shared/ui-components";

export function LoginForm(props) {
  const emailRef = createRef();
  const passRef = createRef();
  const [errors, setErrors] = useState({});
  const [isPending, setIsPending] = useState(false);

  const { onLogin = () => {} } = props;

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (isPending) return;
    setIsPending(true);

    const email = emailRef.current.value;
    const pass = passRef.current.value;
    let currentErrors = {};

    if (email === "") {
      currentErrors.email = "Email address is required";
    } else if (!email.match(/^\S+@\S+\.\S+$/)) {
      currentErrors.email = "Email address appears invalid";
    }

    if (pass === "") {
      currentErrors.pass = "Password is required";
    }

    if (Object.keys(currentErrors).length === 0) {
      currentErrors = await onLogin(email, pass);
    }

    setErrors(currentErrors);
    setIsPending(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      {errors.form !== undefined && <FormError message={errors.form} />}
      <TextInput label="Email address" ref={emailRef} error={errors.email} />
      <TextInput
        label="Password"
        type="password"
        ref={passRef}
        error={errors.pass}
      />
      <Button
        type="submit"
        label="Login"
        isWaiting={isPending}
        disabled={isPending}
        full
      />
    </form>
  );
}

export default LoginForm;
