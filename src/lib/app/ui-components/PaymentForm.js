import React, { createRef } from "react";

import { TextInput, Button } from "../../shared/ui-components";

export const PaymentForm = (props) => {
  const cardHolder = createRef();
  const cardNumber = createRef();
  const cardExpire = createRef();
  const cardCVV = createRef();

  const { amount, onPayment = () => null, note = "" } = props;

  async function handlePayment(evt) {
    evt.preventDefault();
  }

  return (
    <form onSubmit={handlePayment}>
      <div className="flex justify-between items-center mb-2">
        <div className="w-1/2">
          <TextInput label="Card holder" ref={cardHolder} />
          <TextInput label="Card number" ref={cardNumber} />
          <div className="flex">
            <div className="w-1/2 pr-1">
              <TextInput label="Expiration" ref={cardExpire} />
            </div>
            <div className="w-1/2 pl-1">
              <TextInput label="CVV" ref={cardCVV} />
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
          <Button label="Submit" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;
