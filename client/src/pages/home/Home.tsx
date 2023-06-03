import styles from "./home.module.scss";
import HomeHeader from "../../components/homeHeader/HomeHeader";
import HomeBoxsComponent from "../../components/homeBoxs/HomeBoxsComponent";

const Home = () => {
  return (
    <main className={styles.homeContainerMain}>
      <HomeHeader />
      <HomeBoxsComponent />
    </main>
  );
};

export default Home;
