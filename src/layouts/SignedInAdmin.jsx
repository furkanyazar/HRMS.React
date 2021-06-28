import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store/actions/userActions";
import UserService from "../services/userService";

export default function SignedInAdmin() {
  let userService = new UserService();
  const history = useHistory();

  const [photos, setPhotos] = useState({});
  const { userItems } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
    history.push("/");
  };

  useEffect(() => {
    userService
      .getPhotosByUser(userItems.user.id)
      .then((result) => setPhotos(result.data.data));
  }, [userItems.user.id]);

  return (
    <div>
      <Menu.Item>
        <Image
          avatar
          spaced="right"
          src={photos.photoLink}
          circular
          key={photos.id}
        />
        <Dropdown pointing="top right" text={userItems.user.name}>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={"/admindetail/" + userItems.user.id} text="Bilgilerim" icon="info" />
            <Dropdown.Item
              onClick={() => handleLogOut()}
              text="Çıkış Yap"
              icon="sign-out"
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </div>
  );
}
