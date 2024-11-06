import { Box } from "@mui/material";
import logo from "../../assests/logo.png";
import styles from "./index.module.css";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link } from "react-router-dom";

// ! hasAuthButtons= to know whether we are present on login or signup page or not as it does not contain logout or userpage link
// ! no_user= to know whether we are present on userpage or not as it does not contain link for userpage itself

const Header = ({ hasAuthButtons,no_user }) => {
  let child = null;
  const username = localStorage.getItem("username");
  if(username){
    child = (
      <div className={styles.authbtn}>
        {!no_user && <Link to="../userPage" className={styles.link}>
          <PersonOutlineOutlinedIcon
            sx={{
              fontSize: "5rem",
            }}
          />
          <span>{username}</span>
        </Link>}
        <Link to="/" onClick={()=>localStorage.clear()} className={styles.link}>LogOut</Link>
      </div>
    );
  }
  else{
    child=(
      <div className={styles.authbtn}>
        {hasAuthButtons ? (<Link to="/login" className={styles.link}>Login</Link>) : (null)}
      </div>
    )
  }

  return (
    <Box component="div" className={styles.head} backgroundColor="primary.main" >
      <img src={logo} className={styles.img} />
      {child}
    </Box>
  );
};

export default Header;
