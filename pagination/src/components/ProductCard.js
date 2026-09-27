import "../styles.css";

export default Pagination = ({ image, title }) => {
  return (
    <div className="card-container">
      <img src={image} alt={title} />
      <span>{title}</span>
    </div>
  );
};
