import { useState, useEffect } from "react";
import { api } from "../service/api";
import axios from "axios";

const Images = () => {
  const [images, setImages] = useState([]);
  const IMAGES = api + "/images";

  axios
    .get(IMAGES)
    .then((response) => {
      setImages(response.data.images);
      console.log(response.data.images);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div>
      {Object.values(images).map((item) => {
        return(
        <img src={item.base_url + "w342"} alt="photo" />
        )
      })}
    </div>
  );
};

export default Images;
