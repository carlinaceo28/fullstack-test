import React, { useEffect, useState } from "react";
import styles from "./homeHeader.module.scss";
import IUser from "../../interfaces/userInterface";
import { Avatar } from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import AvatarImage from "../../assets/OIG.jpeg";
import { useNavigate } from "react-router-dom";

const HomeHeader = () => {
  const [userData, setUserData] = useState<IUser>();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserFromStorage = () => {
      new Promise((resolve) => {
        resolve(localStorage.getItem("userData"));
      })
        .then((res: any) => {
          setUserData(JSON.parse(res));
        })
        .catch((error) => {
          console.error("error", error);
        });
    };

    getUserFromStorage();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className={styles.homeContainerHeader}>
      <div className={styles.homeHeaderDiv}>
        <Avatar name={userData?.userName} src={AvatarImage} />
        <MdLogout size={24} onClick={logout} />
      </div>
      <p className={styles.homeHeaderP}>Olá, {userData?.userName}!</p>
    </header>
  );
};

export default HomeHeader;
