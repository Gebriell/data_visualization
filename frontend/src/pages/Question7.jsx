import React, { useEffect, useState } from "react";

function Question7() {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/q7")
      .then((resp) => {
        // console.log(resp);
        return resp.json();
      })
      .then((data) => {
        console.log(data.dataForDisplay);
        setData(data.dataForDisplay);
        setPending(false);
      });
  }, []);

  return (
    <div>
      <h1>Which Parts of the World Made the Most with YT?</h1>
    </div>
  );
}

export default Question7;
