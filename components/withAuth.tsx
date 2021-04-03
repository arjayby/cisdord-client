import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "./Loading";
import { useAuthContext } from "contexts/AuthContext";

/**
 * This is only checking the client side authentication, not in server.
   Hence, using the `useAuthContext` custom react hook for checking authenticated user.
 * @param Component - React Component (Page)
 * @param options - Options
 * @returns 
 */
const withAuth = (
  Component: React.FC,
  options: { isReverse?: boolean } = {}
) => {
  const Auth: React.FC = (props) => {
    const router = useRouter();
    const { user, isLoading } = useAuthContext();

    /*
      Normally, `withAuth` will make a component(page) as private.
      
      Means:
      if authenticated, user is allow to access the page.
      if not authenticated, redirect to /sign-in with redirect query.

      e.g.
      from "/private/page" will redirect to "/sign-in?redirect=/private/page"

      `isReverse` option will do exact opposite.

      Means:
      if authenticated, will redirect to /channels/me (default) or to a redirect query (if there is any).
      if not authenticated, will stay on the page.

      e.g.
      with redirect query: from "/sign-in?redirect=/private/page" will redirect to "/private/page"
      without redirect query: from "/sign-in" will redirect to "/channels/me"
    */
    const { isReverse = false } = options;

    const redirect = router.query.redirect as string;

    useEffect(() => {
      if (!isLoading) {
        if (isReverse && user) {
          router.replace(redirect || "/channels/me");
        }
        if (!isReverse && !user) {
          router.replace(`/sign-in?redirect=${router.asPath}`);
        }
      }
    }, [isLoading, user]);

    if (isLoading || (isReverse && user) || (!isReverse && !user)) {
      return <Loading />;
    }

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
