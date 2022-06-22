import styles from "../styles/thanks.module.css";
import { useRouter } from "next/router";
function Custom404() {
  const router = useRouter();
  const goHome = async (e: any) => {
    e.preventDefault();
    router.push({
      pathname: `/`,
    });
  };
  return (
    <div className="centerColumnContent">
      <h1 className="mainTitle">Oops!</h1>
      <div className="messageContainer"></div>
      <div className="notice">This page does not exist.</div>
      <button className="submitButton" onClick={goHome}>
        <span>Back to home page</span>
      </button>
    </div>
  );
}

export default Custom404;
