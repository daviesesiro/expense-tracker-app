import { components, SingleValueProps } from "react-select";

export const Option = (props: any) => {
  return (
    <components.Option {...props}>
      <div className="flex">
        <img
          src={props.data.icon}
          className="w-6 h-6 mr-2 rounded-full"
          alt="logo"
        />
        <span>{props.data.label}</span>
      </div>
    </components.Option>
  );
};
export const SingleValue = ({
  children,
  ...props
}: SingleValueProps<{ [key: string]: any }>) => {
  return (
    <components.SingleValue className="flex" {...props}>
      <img
        src={props.data.icon}
        className="w-6 h-6 mr-2 rounded-full"
        alt="logo"
      />
      {children}
    </components.SingleValue>
  );
};
