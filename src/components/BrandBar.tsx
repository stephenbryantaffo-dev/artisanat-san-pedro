const BrandBar = ({ className = "" }: { className?: string }) => (
  <div className={`brand-bar ${className}`} aria-hidden="true">
    <span />
    <span />
    <span />
  </div>
);

export default BrandBar;
