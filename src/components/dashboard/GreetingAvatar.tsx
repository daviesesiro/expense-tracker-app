import { useAuth } from "../../context/AuthContext";

export const GreetingAvatar: React.FC<{ className: string }> = ({
  className,
}) => {
  const auth = useAuth();
  var hour = new Date().getHours();

  const greeting =
    "Good " +
    ((hour < 12 && "Morning") || (hour < 18 && "Afternoon") || "Evening");

  const match = (auth.user?.name || "").match(/(\b\S)?/g);
  const initials = (match || []).join("").toUpperCase();
  return (
    <div className={`flex items-center ${className}`}>
      <span className="rounded-full mr-2 bg-black text-white w-8 flex justify-center items-center h-8">
        {initials}
      </span>
      <p>
        {greeting}, {auth.user?.name}
      </p>
    </div>
  );
};
