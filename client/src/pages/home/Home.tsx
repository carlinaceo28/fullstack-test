import { useEffect, useState } from "react";
import styles from "./home.module.scss";
import IUser from "../../interfaces/userInterface";
import HomeHeader from "../../components/homeHeader/HomeHeader";
import Chart from "../../components/chart/Chart";
import { HomeBoxs } from "../../const/HomeBoxs";
import HomeBoxsComponent from "../../components/homeBoxs/HomeBoxsComponent";

const Home = () => {
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
    <main className={styles.homeContainerMain}>
      <HomeHeader userData={userData!} />
      <Chart />
      <HomeBoxsComponent />
    </main>
  );
};

export default Home;
