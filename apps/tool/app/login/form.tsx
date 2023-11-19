"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import type { inferFormattedError } from "zod";
import FieldGroup from "@components/form/field-group";
import TextField from "@components/form/text-field";
import ButtonPrimary from "@components/button/button-primary";
import { confirmUser } from "@lib/actions/general/user";
import Loader from "@components/common/loader";
import FieldCaption from "@components/form/field-caption";
import type { UserSchema } from "@lib/utils/schema";

type FormProps = {
  user?: {
    email: string;
  };
};

export default function Form(props: FormProps) {
  const router = useRouter();

  const [email, setEmail] = useState(props.user?.email || "");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  const [error, setError] = useState<inferFormattedError<typeof UserSchema>>();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      {Boolean(error?._errors.length) && (
        <div className="flex flex-col gap-1 text-rose-500">
          {error?._errors.map((message) => <p key={message}>{message}</p>)}
        </div>
      )}

      <div className="flex flex-col gap-2">
        {props.user && (
          <FieldGroup label="Name">
            <TextField name="name" onChange={setFirstName} value={firstName} />
            {error &&
              error.first_name?._errors.map((message) => (
                <FieldCaption className="text-rose-500" key={message} message={message} />
              ))}
          </FieldGroup>
        )}

        {props.user && (
          <FieldGroup label="Surname">
            <TextField name="surname" onChange={setLastName} value={lastName} />
            {error &&
              error.last_name?._errors.map((message) => (
                <FieldCaption className="text-rose-500" key={message} message={message} />
              ))}
          </FieldGroup>
        )}

        <FieldGroup label="E-mail">
          <TextField name="email" onChange={setEmail} readOnly={Boolean(props.user)} value={email} />
          {error &&
            error.email?._errors.map((message) => (
              <FieldCaption className="text-rose-500" key={message} message={message} />
            ))}
        </FieldGroup>

        <FieldGroup label="Password">
          <TextField name="password" onChange={setPassword} type="password" value={password} />
          {error &&
            error.password?._errors.map((message) => (
              <FieldCaption className="text-rose-500" key={message} message={message} />
            ))}
        </FieldGroup>
      </div>

      <ButtonPrimary onClick={onSignIn} size="lg">
        Sign in
      </ButtonPrimary>

      {isPending && <Loader className="absolute inset-0 bg-slate-950/60" />}
    </>
  );

  function onSignIn() {
    startTransition(async () => {
      setError(void 0);

      if (props.user) {
        const update = await confirmUser({
          email,
          password,
          last_name: lastName,
          first_name: firstName,
        });

        if (update.error) {
          setError(update.error);
          return;
        }
      }

      const authorize = await signIn("credentials", {
        redirect: false,
        password,
        email,
      });

      if (authorize?.error) {
        setError({ _errors: ["Incorrect e-mail or password"] });
        return;
      }

      router.replace("/");
    });
  }
}
