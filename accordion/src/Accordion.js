import "./styles.css";
import DownArrow from "./components/DownArrow";
import UpArrow from "./components/UpArrow";
import { useState } from "react";
const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  if (!items || items.length === 0) {
    return <p>No items available</p>;
  }
  return (
    <div>
      {items.map((item, index) => (
        <div className="accordion-container">
          <button className="title" onClick={() => handleToggle(index)}>
            {item.title}
            {activeIndex === index ? <DownArrow /> : <UpArrow />}
          </button>
          {activeIndex === index && (
            <div className="content">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
