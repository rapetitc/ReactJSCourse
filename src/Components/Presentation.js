import React, { useEffect, useState } from "react";

import presentation1 from "../media/presentation1.jpeg";
import presentation2 from "../media/presentation2.jpeg";
import presentation3 from "../media/presentation3.jpeg";
import presentation4 from "../media/presentation4.jpeg";

const presentations = [
  { title: "presentation 1", url: presentation1 },
  { title: "presentation 2", url: presentation2 },
  { title: "presentation 3", url: presentation3 },
  { title: "presentation 4", url: presentation4 },
];

const Presentation = () => {
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setCurrent(current < presentations.length - 1 ? current + 1 : 0);
    }, 5000);
  }, [current]);

  return (
    <div className="w-full mb-10 overflow-hidden">
      <div
        className="flex"
        style={{
          width: `${presentations.length * 100}%`,
          marginLeft: `-${current * 100}%`,
          transition: "margin-left 2s ease-in-out",
        }}
      >
        {presentations.map(({ title, url }, i) => {
          return (
            <div className="w-full h-[300px]" key={i+title}>
              <img src={url} className="h-full mx-auto" alt={title} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Presentation;
