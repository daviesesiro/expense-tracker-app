import toast from "react-hot-toast";

export const handleOnError = (err: any) => {
  console.log(err?.response?.data?.message);
  if (err?.response?.data?.message) toast.error(err?.response?.data?.message);
  else toast.error(err?.message);
};
