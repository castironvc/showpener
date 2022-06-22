import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import ContactForm from "../components/ContactForm";
import { AppContext } from "../context/StateContext";

function Contact() {
  const { state } = useContext(AppContext);
  const { status, data: session } = useSession();
  const router = useRouter();
  const logOut = async (e: any) => {
    e.preventDefault();
    signOut();
  };
  const goHome = async (e: any) => {
    e.preventDefault();
    router.push({
      pathname: `/`,
    });
  };
  /*   useEffect(() => {
    if (status && status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]); */

  return (
    <div className="centerColumnContent">
      <h1 className="mainTitle">Get in touch!</h1>

      <ContactForm />
    </div>
  );
}

export default Contact;
