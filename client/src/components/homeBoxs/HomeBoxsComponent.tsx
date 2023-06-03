import styles from "./homeBox.module.scss";
import { HomeBoxs } from "../../const/HomeBoxs";
import {
  MdGroupAdd,
  MdGroupRemove,
  MdOutlineEditNote,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

const HomeBoxsComponent = () => {
  const navigate = useNavigate();
  let { _id } = useParams();

  return (
    <div className={styles.homeBoxsComponentContainer}>
      {HomeBoxs.map((info) => (
        <div
          key={info.id}
          onClick={() => navigate(`/${info.slug}/${_id}`)}
          className={styles.homeBoxsComponentBox}
        >
          {info.id == 1 && (
            <MdGroupAdd
              className={styles.homeBoxsComponentIcon}
              size={32}
              color={"#ffffff"}
            />
          )}
          {info.id == 2 && (
            <MdGroupRemove
              className={styles.homeBoxsComponentIcon}
              size={32}
              color={"#ffffff"}
            />
          )}
          {info.id == 3 && (
            <MdOutlineEditNote
              className={styles.homeBoxsComponentIcon}
              size={32}
              color={"#ffffff"}
            />
          )}
          {info.id == 4 && (
            <MdOutlineManageAccounts
              className={styles.homeBoxsComponentIcon}
              size={32}
              color={"#ffffff"}
            />
          )}
          <p className={styles.homeBoxsComponentP}>{info.label}</p>
        </div>
      ))}
    </div>
  );
};

export default HomeBoxsComponent;
