import { useQueryClient } from "react-query";
import { Button } from "../components/shared/Button";
import { withAuthRoute } from "../components/shared/withRoute";
import { useAuth } from "../context/AuthContext";
import { useCloseAccount } from "../hooks/mutations/auth";

const Settings = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();

  const mutation = useCloseAccount({
    onSuccess: () => {
      queryClient.invalidateQueries().then(() => auth.signout());
    },
  });

  const data = [
    { label: "First name", value: auth.user?.name?.split(" ")[0] },
    { label: "Last name", value: auth.user?.name?.split(" ")[1] },
    { label: "Email", value: auth.user?.email },
  ];

  const handleCloseAccount = () => {
    const reply = window.confirm(
      "Are sure you want to close your account with us?"
    );

    if (reply) {
      mutation.mutate({});
    }
  };

  return (
    <div className="px-4 py-6 md:p-12">
      <div className="mb-6 flex border-b pb-2 border-gray-200 items-center">
        <h1 className="text-xl sm:text-2xl w-full">Settings</h1>
      </div>

      <div className="max-w-xl mx-auto rounded-md border border-gray-200">
        <h2 className="bg-gray-50 p-4 font-semibold text-xl">Your Profile</h2>

        <div className="px-4 py-8 flex max-w-md w-full mx-auto flex-col space-y-6">
          {data.map((d) => (
            <div key={d.label} className="flex">
              <p className="text-gray-500 w-1/4">{d.label}</p>
              <p className="w-3/4">{d.value}</p>
            </div>
          ))}
        </div>

        <div className="px-4 py-6 bg-gray-50 flex justify-between">
          <Button onClick={() => auth.signout()} className="btn-blue py-2">
            Logout
          </Button>
          <Button
            className="btn-red py-2"
            onClick={handleCloseAccount}
            loading={mutation.isLoading}
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withAuthRoute(Settings);
