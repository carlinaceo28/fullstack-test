import React, { useEffect, useState } from "react";
import { Avatar, Button, Input, useDisclosure } from "@chakra-ui/react";
import AvatarImage from "../../assets/OIG.jpeg";
import styles from "./pagesHeader.module.scss";
import IUser from "../../interfaces/userInterface";
import { MdMenu } from "react-icons/md";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { PagesHeaderConst } from "../../const/PagesHeaderNav";

const PagesHeader = () => {
  const [userData, setUserData] = useState<IUser>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: any = React.useRef();

  const navigate = useNavigate();
  let { _id } = useParams();

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

  const logout = () => {
    localStorage.clear();
  };

  return (
    <header className={styles.pagescontainerHeader}>
      <div className={styles.pagesHeaderDiv}>
        <Avatar name={userData?.userName} src={AvatarImage} />
        <MdMenu size={24} onClick={onOpen} />
      </div>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <nav className={styles.pagesHeaderNav}>
              <ul className={styles.pagesHeaderUl}>
                {PagesHeaderConst.map((item) => (
                  <li
                    onClick={() => navigate(`/${item.slug}/${_id}`)}
                    key={item?.id}
                    className={styles.pagesHeaderLi}
                  >
                    {item?.label}
                  </li>
                ))}
              </ul>
            </nav>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={logout}>
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default PagesHeader;
