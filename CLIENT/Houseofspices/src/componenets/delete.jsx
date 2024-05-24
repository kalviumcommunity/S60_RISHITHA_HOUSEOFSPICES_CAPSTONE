import axios from "axios";
import { useState, useEffect } from "react";

function FetchData() {
  const [spiceData, setspiceData] = useState([]);

  const DeleteData = async (key) => {
    try {
      const r = await axios.delete(`http://localhost:5000/delete/${key}`);
      location.reload();
      console.log(r);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const gettingData = async () => {
      try {
        const database = await axios.get("http://localhost:5000/get");
        console.log(database.data.a);
        setspiceData(database.data.a);
      } catch (err) {
        console.error("Error :", err);
      }
    };
    gettingData();
  }, []);
  return (
    <div>
      {spiceData.map((data) => {
        return (
          <div key={data._id}>
            <h3>
              <b>Cateory Name: </b> {data.category}
            </h3>
            <img src={data.image} alt="image here" />
            <p>
              {" "}
              <b>Health Tip: </b> {data.health}
            </p>
            <p>
              {" "}
              <b>Beauty Tip: </b> {data.beauty}
            </p>
            <p>
              {" "}
              <b>Dos: </b> {data.dos}
            </p>
            <button onClick={() => {DeleteData(data._id);}}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default FetchData;