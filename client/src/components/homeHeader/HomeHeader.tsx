import React from "react";
import styles from "./homeHeader.module.scss";
import IUser from "../../interfaces/userInterface";
import { Avatar } from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import AvatarImage from "../../assets/OIG.jpeg";

interface IUserData {
  userData: IUser;
}

const HomeHeader: React.FC<IUserData> = ({ userData }) => {
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
