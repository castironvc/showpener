import React, { FunctionComponent /* useState */ } from "react";
import { adminUserProps } from "../types/globals";
import Image from "next/image";
import { normalizePhone } from "../utils/validation";
import { useState, useEffect, useContext } from "react";
import { newUserAdminEmail } from "../utils/adminemail";
import { useRouter } from "next/router";
import { AppContext, DispatchContext } from "../context/StateContext";

type BroadcasterProps = {};

const ContactForm: FunctionComponent<BroadcasterProps> = ({}) => {
  /*  const [logoChoice, logoSet] = useState(logo); */

  const router = useRouter();
  const { state } = useContext(AppContext);
  const { dispatch } = useContext(DispatchContext);
  const errorRedirect = (message: string) => {
    router.push({
      pathname: "/Oops/",
      search: `?message=${encodeURIComponent(message)}`,
    });
  };
  const goTo = async (path: string) => {
    router.push({
      pathname: path,
    });
  };
  const setName = (name: string) => {
    dispatch({
      type: "SET_CONTACT_NAME",
      payload: name,
    });
    console.log(state);
  };
  const setPhone = (phone: string) => {
    dispatch({
      type: "SET_CONTACT_PHONE",
      payload: phone,
    });
  };
  const setEmail = (email: string) => {
    dispatch({
      type: "SET_CONTACT_EMAIL",
      payload: email,
    });
  };
  const setMessage = (message: string) => {
    dispatch({
      type: "SET_CONTACT_MESSAGE",
      payload: message,
    });
  };
  const submitContactForm = async () => {
    dispatch({
      type: "setLoader",
      payload: true,
    });

    const postData = {
      name: state.contact.contactName,
      email: state.contact.contactEmail,
      phone: state.contact.contactPhone,
      message: state.contact.contactMessage,
    };

    const contactEmail = await newUserAdminEmail("contact", postData);

    console.log(contactEmail);

    if (contactEmail.error) {
      errorRedirect(contactEmail.details.message);
    } else {
      console.log(contactEmail);
      dispatch({
        type: "SET_CONTACT_STATUS",
        payload: true,
      });
    }
    dispatch({
      type: "setLoader",
      payload: false,
    });
  };
  /*   useEffect(() => {

  }); */
  return (
    <div>
      {!state.contact.contactStatus ? (
        <>
          <p className="center-text para">Tell us what is on your mind.</p>
          <div className="statePhoneFieldContainer">
            <div className="fieldContainer">
              <div className="hint">Enter your Name:</div>
              <input
                id="contactName"
                name="contactName"
                type="text"
                value={
                  (state && state.contact && state.contact.contactName) || ""
                }
                onChange={(e) => setName(e.target.value)}
                className="input"
              />
            </div>
            <div className="fieldContainer">
              <div className="hint">Enter your email</div>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={
                  (state && state.contact && state.contact.contactEmail) || ""
                }
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
            </div>
          </div>
          <div className="fieldContainer">
            <div className="hint">Phone:</div>
            <input
              id="contactPhone"
              name="contactPhone"
              type="tel"
              autoComplete="tel"
              value={
                (state && state.contact && state.contact.contactPhone) || ""
              }
              onChange={(e) => setPhone(normalizePhone(e.target.value))}
              className="input"
              placeholder="(000) 000-0000"
            />
          </div>
          <div className="fieldContainer">
            <div className="hint">Message:</div>
            <textarea
              id="contactMessage"
              name="contactMessage"
              autoComplete="off"
              value={
                (state && state.contact && state.contact.contactMessage) || ""
              }
              onChange={(e) => setMessage(e.target.value)}
              className="input"
              placeholder="Start typing message"
            />
          </div>
          <div className="fieldContainer" style={{ margin: "40px 0 0px 0" }}>
            <button className="submitButton" onClick={submitContactForm}>
              <span>Submit</span>
            </button>
          </div>
        </>
      ) : (
        <div>
          <div className="thanksMessage">Thank you for submitting the form</div>
          <div className="fieldContainer" style={{ margin: "40px 0 0px 0" }}>
            <button className="submitButton" onClick={() => goTo("/")}>
              <span>Back to home</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
/* .resultsHeader {
}
.resultsFigure {
}
 */
export default ContactForm;
