import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AppContext, DispatchContext } from "../context/StateContext";
function SideNav() {
  const { state } = useContext(AppContext);
  const [open, menuOpen] = useState(false);
  const { dispatch } = useContext(DispatchContext);
  const router = useRouter();
  const toggleMenu = () => {
    const menu = document.getElementById("sideMenu");
    const burger1 = document.getElementById("burger1");
    const burger2 = document.getElementById("burger2");
    const burger3 = document.getElementById("burger3");
    if (menu && burger1 && burger2 && burger3) {
      burger1.style.transform = `rotate(${!open ? "-45deg" : "0deg"})`;

      /*       burger1.style.transform = `translateY(${!open ? "10px" : "0px"})`; */
      burger2.style.opacity = `${!open ? 0 : 1}`;
      burger3.style.transform = `rotate(${
        !open ? "45deg" : "0deg"
      }) translateY(${!open ? "0px" : "20px"})`;
      menu.style.transform = `translateX(${open ? "-250px" : "0px"})`;

      /*      menu.style.animation = `${
        open ? "menuOpen 0.5s ease-in-out" : "menuOpen 0.5s ease-in-out reverse"
      })`; */
    }
    menuOpen(!open);
    console.log(open);
  };
  const goTo = async (path: string) => {
    dispatch({
      type: "setLoader",
      payload: true,
    });
    toggleMenu();
    router.push({
      pathname: path,
    });
  };

  return (
    <>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className="burger-container">
          <span id="burger1" />
          <span id="burger2" />
          <span id="burger3" />
        </div>
      </div>
      <div className="menu-container" id="sideMenu">
        <div className="menu-item" onClick={() => goTo("/")}>
          Home
        </div>
        <div className="menu-item" onClick={() => goTo("/admin")}>
          Promoter Access
        </div>
        <div className="menu-item" onClick={() => goTo("/Contact")}>
          Contact Us
        </div>
        <div className="menu-item" onClick={() => goTo("/Terms")}>
          Terms
        </div>
      </div>
    </>
  );
}

export default SideNav;
