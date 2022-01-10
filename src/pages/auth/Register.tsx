import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/shared/Button";
import { ReactComponent as MonoLogo } from "../../assets/mono-logo.svg";
import { useRegister } from "../../hooks/mutations/auth";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      if (auth.user?.accounts === 0) {
        navigate("/connect");
        return;
      }
      navigate("/");
    }
  }, [auth, navigate]);

  const mutation = useRegister({
    onSuccess: (res) => {
      localStorage.setItem("token", res.data?.token);
      toast.success("Welcome to expense tracker");
      auth.signin(res.data?.user);

      if (res?.data?.user.accounts === 0) {
        return navigate("/connect", { replace: true });
      }

      // navigate("/", { replace: true });
    },
  });

  return (
    <div className="min-h-screen bg-black flex px-4 xs:px-6 sm:px-0 items-center justify-center">
      <div className="bg-white w-full max-w-xl rounded-2xl py-12">
        <div className="max-w-sm mx-auto px-4 xs:px-0">
          <MonoLogo className="block mx-auto mb-6" />
          <p className="font-light text-center mb-11">
            Track all your bank expenses in one place
          </p>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            onSubmit={async ({ firstName, lastName, ...data }) => {
              await mutation.mutateAsync({
                ...data,
                name: `${firstName} ${lastName}`,
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form className="w-full">
                <div className="flex space-x-4 mb-4">
                  <Field
                    required
                    className="input w-1/2"
                    name="firstName"
                    placeholder="First Name"
                  />
                  <Field
                    required
                    className="input w-1/2"
                    name="lastName"
                    placeholder="Last Name"
                  />
                </div>
                <Field
                  required
                  name="email"
                  className="input w-full mb-4"
                  placeholder="Email"
                  type="email"
                />
                <Field
                  required
                  name="password"
                  className="input w-full mb-6"
                  placeholder="Password"
                  type="password"
                />

                <Button loading={isSubmitting} className="w-full btn-blue">
                  GET STARTED
                </Button>
              </Form>
            )}
          </Formik>
          <p className="text-sm text-center mt-8 text-blue-600">
            Already have an account?{" "}
            <Link className=" decoration-solid underline " to={"/auth/login"}>
              Sign in
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
