import React, { FunctionComponent /* useState */ } from "react";
import classes from "./Loaders.module.css";
/* import { gsap } from "gsap"; */

type LoaderProps = {
  children?: any;
};

export const Loader: FunctionComponent<LoaderProps> = ({ children }) => {
  /*  const [logoChoice, logoSet] = useState(logo); */

  const messageClasses = [classes.Text];

  if (!children) {
    messageClasses.push(classes.Hide);
  }
  return (
    <div className="LoadOverlay">
      <div>
        <div className="logoLoader" />
      </div>

      <div className={messageClasses.join(" ")}>
        <span className={classes.Text}>{children}</span>
      </div>
    </div>
  );
};
