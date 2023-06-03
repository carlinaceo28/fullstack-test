import { useEffect, useState } from "react";
import styles from "./home.module.scss";
import IUser from "../../interfaces/userInterface";
import HomeHeader from "../../components/homeHeader/HomeHeader";
import Chart from "../../components/chart/Chart";

const Home = () => {
  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    const getUserFromStorage = () => {
      const user = localStorage.getItem("userData");
      setUserData(JSON.parse(user!));
    };
    getUserFromStorage();
  }, []);

  return (
    <main className={styles.homeContainerMain}>
      <HomeHeader userData={userData!} />
      <Chart />
    </main>
  );
};

export default Home;
