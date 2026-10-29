import { BookOpen, Heart, LogIn, LogOut, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'


const Navbar = () => {

    const { loginContext } = useAuthContext();

    return (
        <nav
            aria-label="Main navigation"
            className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 shadow-xl shadow-black/20 backdrop-blur sm:px-5"
        >
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Link
                    to="/courses"
                    className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
                        <BookOpen aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span>
                        <span className="block text-sm font-bold tracking-wide text-slate-100">Course<span className="text-emerald-400">Platform</span></span>
                        <span className="block text-[10px] text-slate-500">LEARN · BUILD · REPEAT</span>
                    </span>
                </Link>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {loginContext ? (
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <span className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-xs text-slate-300 sm:text-sm">
                                <UserRound aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald-400" />
                                <span>
                                    <span className="text-slate-500">Welcome, </span>
                                    <span className="font-semibold text-slate-100">{loginContext.userName}</span>
                                </span>
                            </span>
                            <Link
                                to="/login"
                                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-rose-400/40 hover:bg-rose-500/10 hover:text-rose-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 sm:text-sm"
                            >
                                <LogOut aria-hidden="true" className="h-4 w-4" />
                                Logout
                            </Link>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300 transition hover:border-emerald-400 hover:bg-emerald-500 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 sm:text-sm"
                        >
                            <LogIn aria-hidden="true" className="h-4 w-4" />
                            Login
                        </Link>
                    )}
                    <Link
                        to="/courses"
                        className="rounded-lg px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 sm:text-sm"
                    >
                        Courses
                    </Link>
                    <Link
                        to="/wishlist"
                        className="inline-flex items-center gap-2 rounded-lg border border-pink-500/20 bg-pink-500/5 px-3 py-2 text-xs font-semibold text-pink-300 transition hover:border-pink-400/50 hover:bg-pink-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400 sm:text-sm"
                    >
                        <Heart aria-hidden="true" className="h-4 w-4" />
                        Wishlist
                    </Link>

                </div>
            </div>
        </nav>
    )
}

export default Navbar
