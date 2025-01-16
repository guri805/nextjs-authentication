"use client";
const { useActionState } = require("react");
const { login } = require("../action/auth");

const Login = () => {

    const [state, action, pending] = useActionState(login, undefined);
    const errors = state?.errors;
    console.log(state);


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
                {pending ? "Logging in..." : "Login"}
            </button>
            {state?.success && <p className="success">{state.message}</p>}
        </form>
    );
};

export default Login;
