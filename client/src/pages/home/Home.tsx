import styles from "./home.module.scss";
import HomeHeader from "../../components/homeHeader/HomeHeader";
import Chart from "../../components/chart/Chart";
import HomeBoxsComponent from "../../components/homeBoxs/HomeBoxsComponent";

const Home = () => {
  return (
    <main className={styles.homeContainerMain}>
      <HomeHeader />
      <Chart />
      <HomeBoxsComponent />
    </main>
  );
};

export default Home;
