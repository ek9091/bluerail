import React, { createRef, useState } from "react";

import { TextInput, Button } from "../../shared/ui-components";

export const PaymentForm = (props) => {
  const cardHolderRef = createRef();
  const cardNumberRef = createRef();
  const cardExpireRef = createRef();
  const cardCVVRef = createRef();
  const [errors, setErrors] = useState({});
  const [isPending, setIsPending] = useState(false);

  const {
    amount,
    onPayment = () => {},
    note = "",
    submitLabel = "Submit",
  } = props;

  async function handlePayment(evt) {
    evt.preventDefault();

    if (isPending) return;
    setIsPending(true);
    setErrors({});

    const cardHolder = cardHolderRef.current.value;
    const cardNumber = cardNumberRef.current.value;
    const cardExpire = cardExpireRef.current.value;
    const cardCVV = cardCVVRef.current.value;

    let currentErrors = {};

    if (cardHolder === "") {
      currentErrors.cardHolderError = "Card holder is required";
    }

    if (cardNumber === "") {
      currentErrors.cardNumberError = "Card number is required";
    }

    if (cardExpire === "") {
      currentErrors.cardExpireError = "Required";
    }

    if (cardCVV === "") {
      currentErrors.cardCVVError = "Required";
    }

    if (Object.keys(currentErrors).length === 0) {
      const response = await onPayment();

      if (response.errors) {
        currentErrors = response.errors;
      }
    }

    setIsPending(false);
    setErrors(currentErrors);
  }

  return (
    <form onSubmit={handlePayment}>
      <div className="flex justify-between items-center mb-2">
        <div className="w-1/2">
          <p className="text-center text-xs -mt-3 mb-2">
            Below fields only need to be filled. <br /> Use dummy information.
          </p>
          <TextInput
            label="Card holder"
            ref={cardHolderRef}
            id="cardHolder"
            error={errors.cardHolderError}
          />
          <TextInput
            label="Card number"
            ref={cardNumberRef}
            id="cardNumber"
            error={errors.cardNumberError}
          />
          <div className="flex">
            <div className="w-1/2 pr-1">
              <TextInput
                label="Expiration"
                ref={cardExpireRef}
                id="cardExpire"
                error={errors.cardExpireError}
              />
            </div>
            <div className="w-1/2 pl-1">
              <TextInput
                label="CVV"
                ref={cardCVVRef}
                id="cardCVV"
                error={errors.cardCVVError}
              />
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="w-32 mx-auto">
            <p className="text-xs uppercase font-bold">Amount owed</p>
            <p className="text-2xl font-bold">
              {amount.toLocaleString("USD", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex-grow">
          {note !== "" && <p className="text-sm">{note}</p>}
        </div>
        <div className="flex-none">
          <Button label={submitLabel} type="submit" />
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;
