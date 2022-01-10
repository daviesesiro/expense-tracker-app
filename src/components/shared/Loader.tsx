import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Loader: React.FC<{ size?: number; className?: string }> = (
  props
) => {
  return (
    <AiOutlineLoading3Quarters
      {...props}
      className={`${props.className || ""} animate-spin`}
    />
  );
};
