import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN,
} from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const userid = useInput("");
  const username = useInput("");
  const passwd = useInput("");
  const passwdCheck = useInput("");
  const secret = useInput("");
  const email = useInput("");

  const logIn = useMutation(LOG_IN, {
    variables: { email: email.value, passwd: passwd.value },
  });

  const requestSecretMutation = useMutation(LOG_IN, {
    variables: { email: email.value },
  });
  const createAccountMutation = useMutation(CREATE_ACCOUNT, {
    variables: {
      userid: userid.value,
      email: email.value,
      username: username.value,
      passwd: passwd.value,
    },
  });
  const confirmSecretMutation = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value,
    },
  });
  const localLogInMutation = useMutation(LOCAL_LOG_IN);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "" && passwd.value !== "") {
        try {
          const {
            data: { login: token },
          } = await logIn();
          if (token !== "" && token !== undefined) {
            localLogInMutation({ variables: { token } });
          } else {
            throw Error();
          }
        } catch {
          toast.error("Cant LogIn, try again");
        }
      } else if (email.value === "") {
        toast.error("Email is required");
      } else if (passwd.value === "") {
        toast.error("password is required");
      }
    } else if (action === "signUp") {
      if (
        userid.value !== "" &&
        email.value !== "" &&
        passwd.value !== "" &&
        username.value !== ""
      ) {
        try {
          const {
            data: { createAccount },
          } = await createAccountMutation();
          if (!createAccount) {
            toast.error("Can't create account");
          } else {
            toast.success("Account created! Log In now");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("All field are required");
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const {
            data: { confirmSecret: token },
          } = await confirmSecretMutation();
          if (token !== "" && token !== undefined) {
            localLogInMutation({ variables: { token } });
          } else {
            throw Error();
          }
        } catch {
          toast.error("Cant confirm secret,check again");
        }
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      userid={userid}
      email={email}
      username={username}
      passwd={passwd}
      passwdCheck={passwdCheck}
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};
