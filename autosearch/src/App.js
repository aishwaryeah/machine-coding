import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [result, setResult] = useState([]);
  const [input, setInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [cache, setCache] = useState({});

  useEffect(() => {
    const timer = setTimeout(fetchData, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  const fetchData = async () => {
    if (cache[input]) {
      console.log("CACHE", input);
      setResult(cache[input]);
      return;
    }
    console.log("API CALL", input);
    const apiData = await fetch(
        
    );
    const json = await apiData.json();
    setResult(json?.recipes);
    setCache((prev) => ({ ...prev, [input]: json?.recipes }));
  };

  return (
    <div className="App">
      <h1>Auto Search</h1>
      <input
        type="text"
        className="search-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setShowResult(true)}
        onBlur={() => setShowResult(false)}
      />
      {showResult && (
        <div className="result-container">
          {result.map((r) => (
            <span className="result" key={r.id}>
              {r.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
