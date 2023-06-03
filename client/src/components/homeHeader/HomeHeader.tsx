import React, { useEffect, useState } from "react";
import styles from "./homeHeader.module.scss";
import IUser from "../../interfaces/userInterface";
import { Avatar } from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import AvatarImage from "../../assets/OIG.jpeg";

const HomeHeader = () => {
  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    const getUserFromStorage = () => {
      new Promise((resolve) => {
        resolve(localStorage.getItem("userData"));
      })
        .then((res: any) => {
          setUserData(JSON.parse(res));
          console.log("res da promise", JSON.parse(res));
        })
        .catch((error) => {
          console.error("error", error);
        });
    };

    getUserFromStorage();
  }, []);

  return (
    <header className={styles.homeContainerHeader}>
      <div className={styles.homeHeaderDiv}>
        <Avatar name={userData?.userName} src={AvatarImage} />
        <MdLogout size={24} />
      </div>
      <p className={styles.homeHeaderP}>Olá, {userData?.userName}!</p>
    </header>
  );
};

export default HomeHeader;
