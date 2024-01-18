"use client";

import ContactInformation from "(pages)/checkout/components/ContactInformation";
import DeliveryAddress from "(pages)/checkout/components/DeliveryAddress";
import Modal from "@shared/Modal";
import SubmitButton from "./SubmitButton";
import { useEffect } from "react";
import { saveUserInfo } from "./actions";
import { useFormState } from "react-dom";

export default function EditUserInfo({
  show,
  onClose,
  user = null,
  focusTo = "",
  modalStyles = "",
}) {
  const [state, formAction] = useFormState(saveUserInfo, {
    infoSaved: false,
  });

  useEffect(() => {
    if (focusTo) {
      const element = document.getElementById(focusTo);

      if (element) {
        element.focus();
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [focusTo]);

  useEffect(() => {
    if (show) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "auto";
  }, [show]);

  useEffect(() => {
    if (state.infoSaved) {
      onClose();

      state.infoSaved = false;
    }
  }, [state.infoSaved]);

  return (
    <Modal className={modalStyles} show={show} onClose={onClose}>
      <header className="mb-10 text-xl font-bold uppercase">
        Edit User Info
      </header>

      <form action={formAction}>
        <ContactInformation user={user} />
        <DeliveryAddress user={user} />

        <SubmitButton />
      </form>
    </Modal>
  );
}
