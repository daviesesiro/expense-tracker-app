import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as MonoLogo } from "../../assets/mono-logo.svg";
import { Button } from "../../components/shared/Button";
import { useAuth } from "../../context/AuthContext";
import { useLogin } from "../../hooks/mutations/auth";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      if (auth.user?.accounts === 0) return navigate("/connect");

      navigate("/");
    }
  }, [auth, navigate]);

  const mutation = useLogin({
    onSuccess: (res) => {
      localStorage.setItem("token", res.data?.token);
      toast.success("Welcome to expense tracker");
      auth.signin(res.data?.user);

      if (res?.data?.user.accounts === 0) {
        return navigate("/connect", { replace: true });
      }
      navigate("/", { replace: true });
    },
  });
  return (
    <div className="min-h-screen bg-black flex px-5 xs:px-0 items-center justify-center">
      <div className="bg-white w-full max-w-xl rounded-2xl py-12">
        <div className="max-w-sm mx-auto px-4 xs:px-0">
          <MonoLogo className="block mx-auto mb-6" />
          <p className="font-dark text-center mb-11">
            Securely login to your account
          </p>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values) => {
              await mutation.mutateAsync(values);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="w-full">
                <Field
                  required
                  name="email"
                  className="input w-full mb-4 border-[#60A5FA] outline-none placeholder-gray-500 placeholder-opacity-60 hover:animate-pulse"
                  placeholder="Email"
                  type="email"
                />
                <Field
                  required
                  name="password"
                  className="input w-full mb-8 border-[#60A5FA] outline-none placeholder-gray-500 placeholder-opacity-60 hover:animate-pulse"
                  placeholder="Password"
                  type="password"
                />

                {/* <div className="flex justify-between mb-6">
                  <label className="font-light">
                    <input className="mr-2" type="checkbox" />
                    <span>Remember me</span>
                  </label>

                  <Link className="font-light" to="#">
                    I forgot my password
                  </Link>
                </div> */}
                <Button
                  loading={isSubmitting}
                  type="submit"
                  className="w-full btn-blue"
                >
                  LOGIN
                </Button>
              </Form>
            )}
          </Formik>

          <p className="text-sm text-center mt-8 text-blue-600">
            Don't have an account?{" "}
            <Link className="decoration-solid underline" to={"/auth/register"}>
              Sign up
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
