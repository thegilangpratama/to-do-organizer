import React from "react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Formik } from "formik";
import Loading from "react-spinners/ScaleLoader";
import * as Yup from "yup";
import toast from "react-hot-toast";
import cookie from "cookie";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { withAuthGuard } from "../../helpers/server";
import supabase from "../../helpers/supabase";
import useUpdateUserMutation from "../../hooks/user/use-update-user-mutation";

export const getServerSideProps: GetServerSideProps = withAuthGuard(
  async ({ req }) => {
    const cookies = cookie.parse(req.headers?.cookie || "");

    const { user, error } = await supabase.auth.api.getUser(
      cookies.access_token
    );

    if (!user || error) {
      throw error;
    }

    const newUser = {
      fullname:
        user.user_metadata.fullname || user.user_metadata.full_name || "",
      username: user.user_metadata.username || "",
      email: user.email || "",
      is_confirmed: !!user.email_confirmed_at,
    };

    if (newUser.username && newUser.fullname) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return {
      props: {
        user: newUser,
      },
    };
  }
);

const validationSchema = Yup.object({
  fullname: Yup.string()
    .min(5, "Full Name should have at least 5 characters.")
    .max(50, "Full Name should no more than 50 characters.")
    .required("Full Name is required"),
  username: Yup.string()
    .min(8, "Username should have at least 8 characters.")
    .max(15, "Username should no more than 15 characters.")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should have at least 8 characters.")
    .max(25, "Password should no more than 25 characters.")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Confirm Password is mismatch")
    .required("Confirm Password is required"),
});

type Props = NextPage & {
  user: {
    fullname: string;
    username: string;
    email: string;
  };
};

const AccountDetailsPage: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const updateUserMutation = useUpdateUserMutation();

  const { fullname, username, email } = user;

  return (
    <div className="min-h-screen md:bg-slate-50">
      <Head>
        <title>Account Details | To Do</title>
      </Head>

      <main className="py-12">
        <div className="w-80 mx-auto md:w-96">
          <div className="md:rounded md:bg-white md:shadow-lg md:p-8">
            <h1 className="font-semibold text-center text-slate-600 mb-6">
              Fill up your account details
            </h1>
            <Formik
              initialValues={{
                fullname: fullname,
                username: username,
                email: email,
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              validateOnChange={false}
              validateOnBlur
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  setSubmitting(true);

                  const { fullname, username, password, confirmPassword } =
                    values;

                  await updateUserMutation.mutateAsync({
                    body: {
                      fullname,
                      username,
                      password,
                      confirm_password: confirmPassword,
                    },
                  });

                  await router.replace("/dashboard");
                } catch (error) {
                  console.error(error);
                  toast.error("Failed to submit account details.");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({
                values,
                errors,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => (
                <>
                  {isSubmitting ? (
                    <div className="flex justify-center py-4">
                      <Loading
                        height={36}
                        width={4}
                        radius={8}
                        margin={2}
                        color="rgb(245 158 11)"
                      />
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <Input
                          className="w-full"
                          name="fullname"
                          value={values.fullname}
                          placeholder="Enter full name"
                          onChange={handleChange}
                          errorMessage={errors.fullname}
                          isError={!!errors.fullname}
                        />
                      </div>
                      <div className="mb-4">
                        <Input
                          className="w-full"
                          name="username"
                          value={values.username}
                          placeholder="Enter username"
                          onChange={handleChange}
                          errorMessage={errors.username}
                          isError={!!errors.username}
                        />
                      </div>
                      <div className="mb-4">
                        <Input
                          className="w-full"
                          type="email"
                          name="email"
                          value={values.email}
                          placeholder="Enter email"
                          onChange={handleChange}
                          errorMessage={errors.email}
                          isError={!!errors.email}
                          disabled
                        />
                      </div>
                      <div className="mb-4">
                        <Input
                          className="w-full"
                          type="password"
                          name="password"
                          value={values.password}
                          placeholder="Enter password"
                          onChange={handleChange}
                          errorMessage={errors.password}
                          isError={!!errors.password}
                        />
                      </div>
                      <div className="mb-8">
                        <Input
                          className="w-full"
                          type="password"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          placeholder="Enter password again"
                          onChange={handleChange}
                          errorMessage={errors.confirmPassword}
                          isError={!!errors.confirmPassword}
                        />
                      </div>
                      <p className="text-xs text-slate-500 leading-normal mb-8 px-2">
                        By signing up, I accept the{" "}
                        <Link href="/">
                          <a className="text-slate-700">
                            To Do Terms of Service
                          </a>
                        </Link>{" "}
                        and acknowledge the{" "}
                        <Link href="/">
                          <a className="text-slate-700">Privacy Policy</a>
                        </Link>
                        .
                      </p>
                      <Button className="w-full">Submit</Button>
                    </form>
                  )}
                </>
              )}
            </Formik>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountDetailsPage;
