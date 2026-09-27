import "./styles.css";
import Accordion from "./Accordion";
import items from "./utils/list";

export default function App() {
  return (
    <div className="App">
      <Accordion items={items} />
    </div>
  );
}
