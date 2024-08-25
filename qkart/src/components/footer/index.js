import { Box } from "@mui/material";
import styles from "./index.module.css";

const Footer = () => {
  return (
    <Box component="div" className={styles.foot} backgroundColor="primary.main" color="support">
      <div className="left">QKart</div>
      <div className="right">@2024</div>
    </Box>
  );
};

export default Footer;
