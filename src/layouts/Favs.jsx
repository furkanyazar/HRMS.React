import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dropdown, Label } from "semantic-ui-react";
import JobPostingService from "../services/jobPostingService";
import { removeFromFav } from "../store/actions/favActions";

export default function Favs() {
  const { userItems } = useSelector((state) => state.user);
  const { favItems } = useSelector((state) => state.fav);
  let jobPostingService = new JobPostingService();
  const dispatch = useDispatch();

  const handleRemoveFromFav = (jobAd, jobPostingId, userId) => {
    dispatch(removeFromFav(jobAd));
    jobPostingService.removeFromFav(jobPostingId, userId).then((result) => {
      alert(result.data.message);
    });
  };

  return (
    <div>
      <Dropdown item text="Favorileriniz">
        <Dropdown.Menu>
          {favItems.map((favItem) => (
            <Dropdown.Item
              as={Link}
              to={"/jobdetail/" + favItem.fav.id}
              key={favItem.fav.id}
            >
              {favItem.fav.job.name + " in " + favItem.fav.user.companyName}{" "}
              <Label
                onClick={() =>
                  handleRemoveFromFav(
                    favItem.fav,
                    favItem.fav.id,
                    userItems.user.id
                  )
                }
              >
                X
              </Label>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
