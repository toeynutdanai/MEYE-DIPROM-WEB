import SignUpComponent from "../components/SignUp";
import useSignUp from "../hooks/useSignUp";

const SignUp = () => {
  const signUpProps = useSignUp();
  return <SignUpComponent {...signUpProps} />;
};

export default SignUp;
