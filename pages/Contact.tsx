import { useContext, useEffect } from "react";

import ContactForm from "../components/ContactForm";
import { DispatchContext } from "../context/StateContext";

function Contact() {
  const { dispatch } = useContext(DispatchContext);

  useEffect(() => {
    dispatch({
      type: "setLoader",
      payload: false,
    });
  }, []);

  return (
    <div className="centerColumnContent">
      <h1 className="mainTitle">Get in touch!</h1>

      <ContactForm />
    </div>
  );
}

export default Contact;
