import "./styles.css";
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { PAGE_SIZE } from "./utils/constants";

export default function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const totalProducts = data.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const apiData = await fetch("https://dummyjson.com/products?limit=500");
      const json = await apiData.json();
      setData(json.products);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageClick = (n) => {
    setCurrentPage(n);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="App">
      <h1>Pagination</h1>
      <div className="pagination-container">
        <button
          className="page-number"
          onClick={() => handlePrevPage()}
          disabled={currentPage === 0}
        >
          ◀
        </button>
        {[
          ...Array(noOfPages)
            .keys()
            .map((n) => (
              <button
                key={n}
                className={`${"page-number"} ${
                  n === currentPage ? "active" : ""
                }`}
                onClick={() => handlePageClick(n)}
              >
                {n + 1}
              </button>
            )),
        ]}
        <button
          className="page-number"
          onClick={() => handleNextPage()}
          disabled={currentPage === noOfPages - 1}
        >
          ▶
        </button>
      </div>
      <div className="products-container">
        {data.slice(start, end).map((prod) => (
          <ProductCard
            key={prod.id}
            image={prod.thumbnail}
            title={prod.title}
          />
        ))}
      </div>
    </div>
  );
}
