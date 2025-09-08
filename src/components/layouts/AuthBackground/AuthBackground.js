import React, { useState, useEffect } from "react";

import background from "assets/images/bgLogin-2.png";
// import LanguageSwitcher from "components/elements/LanguageSwitcher/LanguageSwitcher";
import styles from "./AuthBackground.module.css";
import { useTranslation } from "react-i18next";


const AuthBackground = ({ children, showLanguageSwitcher = false }) => {
const [windowHeight, setWindowHeight] = useState(window.innerHeight);

useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);

    // clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.container} style={{
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: windowHeight, // ใช้ความสูงจริงของ window
      width: "100vw",
      margin: 0,
        padding: 0,

    }}>
      {/* {showLanguageSwitcher ? <LanguageSwitcher /> : <React.Fragment />} */}
      <div className={styles.body}
      >{children}</div>
    </div>
  );
};

export default AuthBackground;