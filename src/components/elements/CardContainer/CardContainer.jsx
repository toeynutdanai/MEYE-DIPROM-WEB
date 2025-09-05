import styles from "./CardContainer.module.css";

function CardContainer({ children = null, width = "780px", color = "", height= "100%"}) {
  const hightAndwidth = {
    width: width,
    height: height,
    backgroundColor: color,
  };

  return (
    <div className={styles.customStyle} style={hightAndwidth}>
      {children}
    </div>
  );
}

export default CardContainer;
