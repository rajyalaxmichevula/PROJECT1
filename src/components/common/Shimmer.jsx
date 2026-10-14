const Shimmer = ({ className = "" }) => {
  return (
    <div className={`shimmer rounded-lg ${className}`} aria-hidden="true" />
  );
};

export default Shimmer;
