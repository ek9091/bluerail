import React, { createRef, useState } from "react";

import { TextInput, Button } from "../../shared/ui-components";

export const RegistrationForm = (props) => {
  const { onRegister = () => {} } = props;

  const firstNameRef = createRef();
  const lastNameRef = createRef();
  const emailRef = createRef();
  const passRef = createRef();
  const confirmRef = createRef();

  const [errors, setErrors] = useState({});
  const [isPending, setIsPending] = useState(false);

  async function handleRegister(evt) {
    evt.preventDefault();

    if (isPending) return;
    setIsPending(true);

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const confirm = confirmRef.current.value;

    let currentErrors = {};

    if (firstName === "") {
      currentErrors.firstName = "First name is required";
    }

    if (lastName === "") {
      currentErrors.lastName = "Last name is required";
    }

    if (email === "") {
      currentErrors.email = "Email address is required";
    } else if (!email.match(/^\S+@\S+\.\S+$/)) {
      currentErrors.email = "Email address appears invalid";
    }

    if (password === "") {
      currentErrors.password = "Password is required";
    } else if (confirm === "") {
      currentErrors.confirm = "Enter your password again";
    } else if (password !== confirm) {
      currentErrors.password = currentErrors.confirm =
        "Password fields do not match";
    }

    if (!Object.keys(currentErrors).length) {
      currentErrors = await onRegister({
        firstName,
        lastName,
        email,
        password,
      });
    }

    setErrors(currentErrors);
    setIsPending(false);
  }

  return (
    <form onSubmit={handleRegister}>
      <TextInput
        label="First name"
        ref={firstNameRef}
        error={errors.firstName}
      />
      <TextInput label="Last name" ref={lastNameRef} error={errors.lastName} />
      <TextInput label="Email address" ref={emailRef} error={errors.email} />
      <TextInput
        label="Password"
        type="password"
        ref={passRef}
        error={errors.password}
      />
      <TextInput
        label="Password again"
        type="password"
        ref={confirmRef}
        error={errors.confirm}
      />
      <Button label="Sign up" type="submit" full />
    </form>
  );
};

export default RegistrationForm;
