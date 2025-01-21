'use client';
import { useRouter } from 'next/navigation';
import { login } from '../action/auth';
import { useActionState, useEffect } from 'react';

export default function LoginForm() {
    const router = useRouter();

    // Manage the login action state
    const [state, action, pending] = useActionState(login, undefined)
    const errors = state?.errors;

    // Redirect to the profile page after successful login
    useEffect(() => {
        if (state?.success) {
            router.push('/profile');
        }
    }, [state?.success, router]);

    return (
        <form action={action}>
            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                />
                {errors?.email && <p className="error">{errors.email[0]}</p>}
            </div>
            <div>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                />
                {errors?.password && <p className="error">{errors.password[0]}</p>}
            </div>
            <button type="submit" disabled={pending}>
                {pending ? 'Logging in...' : 'Login'}
            </button>
            {state?.success && <p className="success">{state.message}</p>}
        </form>
    );
}
