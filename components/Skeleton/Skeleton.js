import skeletonStyles from "./Skeleton.module.css";

export default function Skeleton() {
  return (
    <div className={skeletonStyles.skeleton}>
      <div className={skeletonStyles.sBanner}></div>
      <div className={skeletonStyles.sHeader}></div>
      <div className={skeletonStyles.sContent}></div>
      <div className={skeletonStyles.sContent}></div>
      <div className={skeletonStyles.sContent}></div>
    </div>
  );
}
