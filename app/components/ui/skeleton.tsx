import NativeSkeleton, {
  type SkeletonProps as SkeletonPropsNative
} from "react-loading-skeleton"

type SkeletonProps = SkeletonPropsNative

export const Skeleton = (props: SkeletonProps) => {
  return <NativeSkeleton borderRadius="15px" {...props} />
}
