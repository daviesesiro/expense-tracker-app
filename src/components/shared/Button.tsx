import { ReactComponent as SpinIcon } from "../../assets/loader.svg";

interface Props {
  [key: string]: any;
  loading?: boolean;
  className?: string;
}

export const Button: React.FC<Props> = ({
  children,
  className,
  type,
  loading,
  ...props
}) => {
  return (
    <button
      disabled={loading}
      className={`flex justify-center items-center rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed p-4 text-base duration-100 ${className}`}
      {...props}
    >
      {loading ? <SpinIcon className="animate-spin" /> : children}
    </button>
  );
};
