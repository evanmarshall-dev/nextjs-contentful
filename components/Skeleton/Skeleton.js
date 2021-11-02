import skeletonStyles from "./Skeleton.module.css";

export default function Skeleton() {
  return (
    <div className="skeleton">
      <div className="s-banner"></div>
      <div className="s-header"></div>
      <div className="s-content"></div>
      <div className="s-content"></div>
      <div className="s-content"></div>
    </div>
  );
}
