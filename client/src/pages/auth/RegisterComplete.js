import React, { useState, useEffect } from "react";

import { auth } from "../../firebase";
import { toast } from "react-toastify";

import { MDBInput } from "mdb-react-ui-kit";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation
    if (!email || !password) {
      toast.error("Email and Password is Required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be atleast 6 Characters Long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href,
      );

      // console.log("RESULT -->", result);
      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem("emailForRegistration");

        // get userId token
        let user = auth.currentUser;

        await user.updatePassword(password);

        const idTokenResult = await user.getIdTokenResult();

        // redux store
        console.log("user", user, "idTokenResult", idTokenResult);

        // redirect
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>

          <form onSubmit={handleSubmit}>
            <MDBInput
              label="Confirm Email Address"
              type="email"
              id="typeEmail"
              className="form-control my-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />

            <MDBInput
              label="Enter Your Password"
              id="typePassword"
              className="form-control my-4"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoFocus
            />

            <button type="submit" className="btn btn-raised">
              Complete Registeration
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
