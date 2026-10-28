import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const SignupPage = () => {
    const [userName, setuserName] = useState("")
    const [userEmail, setuserEmail] = useState("")
    const [userPassword, setuserPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [showPassword, setshowPassword] = useState(false)
    const [showConfirmPassword, setshowConfirmPassword] = useState(false)

    const navigate = useNavigate();



    const handleSignup = async (e) => {
        e.preventDefault();
        if (userName.trim() === "" || userEmail.trim() === "" || userPassword === "" || confirmPassword === "") {
            toast.error("Please fill all the fields");
            return;
        }
        else {
            if (userPassword === confirmPassword) toast.success("Validated")
            else {
                toast.error("Passwords do not match");
                return;
            }
        }
        const res = await axios.get(`http://localhost:3000/users?email=${userEmail}`)
        if (res.data.length > 0) {
            toast.error("Email already exists")
            return;
        }

        axios.post("http://localhost:3000/users",
            {
                name: userName,
                email: userEmail,
                password: userPassword
            })
        toast.success("User registered. Welcome!")
        navigate("/login")


    }
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-8 font-mono text-slate-100 sm:px-6 sm:py-12">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-800/70 via-slate-950 to-slate-950"
            />
            <div className="relative grid w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/30 lg:grid-cols-[1fr_1.05fr]">
                <section className="relative hidden flex-col justify-between overflow-hidden border-r border-slate-800 bg-slate-900/70 p-10 lg:flex xl:p-14">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"
                    />
                    <div className="relative">
                        <div className="mb-12 flex items-center gap-2 border-b border-slate-800 pb-4">
                            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                            <span className="ml-3 text-xs text-slate-500">your-learning-journey.jsx</span>
                        </div>
                        <p className="text-sm text-emerald-400">
                            <span className="text-slate-500">const</span> nextStep ={' '}
                            <span className="text-amber-300">"start here"</span>;
                        </p>
                        <h1 className="mt-5 max-w-lg text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
                            Make room for
                            <br />
                            what’s next<span className="text-emerald-400">_</span>
                        </h1>
                        <p className="mt-5 max-w-md text-sm leading-7 text-slate-400 xl:text-base">
                            Build new skills, explore fresh ideas, and keep moving toward the things you want to create.
                        </p>
                    </div>

                    <div className="relative mt-12 space-y-4">
                        <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
                                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2L12 3Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19 16 .9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16Z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-200">Learn at your own pace</p>
                                <p className="mt-1 text-xs leading-5 text-slate-500">Find courses that fit your goals and schedule.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-pink-500/20 bg-pink-500/10 text-pink-300">
                                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25s-7.5-4.35-7.5-10.05a4.2 4.2 0 0 1 7.5-2.58 4.2 4.2 0 0 1 7.5 2.58c0 5.7-7.5 10.05-7.5 10.05Z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-200">Keep your favorites close</p>
                                <p className="mt-1 text-xs leading-5 text-slate-500">Save courses and come back whenever you’re ready.</p>
                            </div>
                        </div>
                    </div>
                    <p className="relative mt-10 text-xs text-slate-600">LEARN · BUILD · REPEAT</p>
                </section>

                <section className="p-6 sm:p-9 lg:p-10 xl:p-14">
                    <div className="mb-8 flex items-center gap-2 border-b border-slate-800 pb-4 lg:hidden">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        <span className="ml-3 text-xs text-slate-500">signup.jsx</span>
                    </div>

                    <div className="mx-auto w-full max-w-md">
                        <p className="text-sm text-emerald-400">
                            <span className="text-slate-500">function</span> createAccount()
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Start learning<span className="text-emerald-400">.</span>
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-slate-400">
                            Create your account and take the first step toward your next skill.
                        </p>

                        <form onSubmit={handleSignup} className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/40 p-5 shadow-xl shadow-black/10 sm:p-6">
                            <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
                                <div>
                                    <p className="text-sm font-semibold text-slate-200">Account details</p>
                                    <p className="mt-1 text-xs text-slate-500">A few details to get you started</p>
                                </div>

                            </div>

                            <div className="flex flex-col gap-5">
                                <div>
                                    <label htmlFor="full-name" className="mt-5 block text-sm font-medium text-slate-300">
                                        Full name
                                    </label>
                                    <div className="group flex min-h-12 items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 transition hover:border-slate-600 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-400/30">
                                        <UserRound aria-hidden="true" className="h-4 w-4 shrink-0 text-slate-500 transition-colors group-focus-within:text-emerald-400" />
                                        <input
                                            value={userName}
                                            onChange={(e) => setuserName(e.target.value)}
                                            id="full-name"
                                            name="fullName"
                                            type="text"
                                            autoComplete="name"
                                            placeholder="Your name"
                                            className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                                        Email address
                                    </label>
                                    <div className="group flex min-h-12 items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 transition hover:border-slate-600 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-400/30">
                                        <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-slate-500 transition-colors group-focus-within:text-emerald-400" />
                                        <input
                                            value={userEmail}
                                            onChange={(e) => setuserEmail(e.target.value)}
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            placeholder="you@example.com"
                                            className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                                        Password
                                    </label>
                                    <div className="group flex min-h-12 items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 transition hover:border-slate-600 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-400/30">
                                        <LockKeyhole aria-hidden="true" className="h-4 w-4 shrink-0 text-slate-500 transition-colors group-focus-within:text-emerald-400" />
                                        <input
                                            value={userPassword}
                                            onChange={(e) => setuserPassword(e.target.value)}
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            aria-describedby="password-hint"
                                            placeholder="Create a password"
                                            className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                                        />
                                        <button type='button' onClick={() => setshowPassword(prev => !prev)}>{showPassword ? "Hide" : "Show"}</button>
                                    </div>
                                    <p id="password-hint" className="text-xs text-slate-500">Choose a password you’ll remember.</p>
                                </div>

                                <div>
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-300">
                                        Confirm password
                                    </label>
                                    <div className="group flex min-h-12 items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 transition hover:border-slate-600 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-400/30">
                                        <LockKeyhole aria-hidden="true" className="h-4 w-4 shrink-0 text-slate-500 transition-colors group-focus-within:text-emerald-400" />
                                        <input
                                            value={confirmPassword}
                                            onChange={(e) => setconfirmPassword(e.target.value)}
                                            id="confirm-password"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Enter your password again"
                                            className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                                        />
                                        <button type="button" onClick={() => setshowConfirmPassword(prev => !prev)}>{showConfirmPassword ? "Hide" : "Show"}</button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="inline-flex min-h-12 w-full items-center justify-center gap-2  border-emerald-500/30 bg-emerald-500/10 px-6 py-3 text-xs font-semibold text-emerald-300 transition hover:border-emerald-400 hover:bg-emerald-500 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 rounded-xl "
                                >
                                    Create account
                                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-400">
                            <span>Already have an account?</span>
                            <Link
                                to='/login'
                                type="button"
                                className="rounded-md px-2 py-1 font-semibold text-emerald-300 transition hover:text-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                            >
                                Log in
                            </Link>
                        </div>

                        <p className="mt-6 text-center text-xs leading-5 text-slate-500">
                            By creating an account, you’re ready to begin your learning journey.
                        </p>

                    </div>
                </section>
            </div >
        </main >
    )
}

export default SignupPage
