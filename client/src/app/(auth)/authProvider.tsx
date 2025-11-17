import React, { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { View } from '@aws-amplify/ui-react';
import { RadioGroupField, Radio } from '@aws-amplify/ui-react';
import { useRouter, usePathname } from 'next/navigation';


Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
            userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
        },
    },
});

const components = {
    Header() {
        return (
            <View className='mt-4 mb-7'>
                <Heading level={3} className='text-center'>
                    Welcome to <span className='text-green-600 font-light hover:text-primary'>RentAlg</span>
                </Heading>

                <p className='text-muted-foreground mt-2 '>
                    <span className='font-bold'>Please Sign In to continue</span>
                </p>

            </View>
        );
    },
    SignIn: {
        Footer() {
            const { toSignUp } = useAuthenticator();
            return (
                <View className='text-center mt-4'>
                    <p className='text-muted-foregrouned'>
                        Don&apos;t have an account?{' '}
                    
                        <button onClick={toSignUp} className='text-primary hover:underline bg-transparent border-0 p-0'>Sign Up</button>
                    </p>
                </View>
        );
        },
    },
    SignUp: {
        FormFields() {
            const { validationErrors, isValid } = useAuthenticator();
            
            return (
                <>
                    <Authenticator.SignUp.FormFields />
                    <RadioGroupField 
                        legend="Role" 
                        name="custom:role" 
                        errorMessage={validationErrors["custom:role"]} 
                        hasError={!!validationErrors["custom:role"]} 
                        isRequired>

                            <Radio value="Particulier">Particulier</Radio>
                            <Radio value="Pro">Professionel</Radio>
                    </RadioGroupField>
                </>
            );
        },

        Footer() {
            const { toSignIn } = useAuthenticator();
            return (
                <View className='text-center mt-4'>
                    <p className='text-muted-foregrouned'>
                        Already have an account?{' '}
                    
                        <button onClick={toSignIn} className='text-primary hover:underline bg-transparent border-0 p-0'>Sign In</button>
                    </p>
                </View>
        );
        },
    },
};

const formFields = {
    signIn: {
        username: {
            placeholder: 'Enter your email',
            isRequired: true,
            label: 'Email',
        },
        password: {
            placeholder: 'Enter your password',
            isRequired: true,
            label: 'Password',
        },
    },
    signUp: {
        username: {
            order: 1,
            placeholder: 'Choose a username',
            isRequired: true,
            label: 'Email',
        },
        email: {
            order: 2,
            placeholder: 'Enter your email address',
            isRequired: true,
            label: 'Email',
        },
        password: {
            order: 4,
            placeholder: 'Create a password',
            isRequired: true,
            label: 'Password',
        },
        confirm_password: {
            order: 5,
            placeholder: 'Confirm your password',
            isRequired: true,
            label: 'Confirm Password',
        },
    },
};


const Auth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();
  const pathname = usePathname();
  
  const isAuthPage = pathname.match('/^\/(signin|singup)$/');
  const isDashboardPage = pathname.startsWith('/manager') || pathname.startsWith('/pro');

  useEffect(() => {
    if (user && isAuthPage) {
        // Redirect authenticated users away from auth pages
        router.push('/');
    }
  }, [user, isAuthPage, router]);

  // Allow access to auth pages if not authenticated
    if (!user && !isDashboardPage) {
        return <>{children}</>;
    }

  return (
    <div className='h-full'>
        <Authenticator initialState={pathname.includes('signup') ? 'signUp' : 'signIn'} components={components} formFields={formFields}>

            {() => <>{children}</>}

        </Authenticator>
    </div>
  );
}

export default Auth;