import {
    BookOpen,
    RefreshCw,
    UsersRound,
} from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const fetchDashboardData = async () => {
    const courseRes = await axios.get("http://localhost:3000/courses")
    const userRes = await axios.get("http://localhost:3000/users")
    return { courses: courseRes.data, users: userRes.data }
}

const AdminDashboard = () => {

    const [courseCount, setCourseCount] = useState(0);
    const [userCount, setUserCount] = useState(0)
    const [coursesData, setCoursesData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { loginContext } = useAuthContext();

    const refreshData = async() => {
        try {
            setIsLoading(true)
            const { courses, users } = await fetchDashboardData()
            setCourseCount(courses.length)
            setCoursesData(courses)
            setUserCount(users.length)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const { courses, users } = await fetchDashboardData()
                setCourseCount(courses.length)
                setCoursesData(courses)
                setUserCount(users.length)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        loadDashboardData()
    }, [])

return (
    <main className="min-h-screen bg-slate-950 font-mono text-slate-100">
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-800/70 via-slate-950 to-slate-950" />
        <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] flex-col gap-5 p-4 sm:p-6 lg:flex-row lg:gap-6 lg:p-8">
            <Sidebar />
            <section className="min-w-0 flex-1">
                <header className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900 px-5 py-5 shadow-xl shadow-black/20 sm:px-7">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                            Admin workspace
                        </p>
                        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Dashboard<span className="text-emerald-400">_</span>
                        </h1>
                        <p className="mt-1 text-sm text-slate-400">
                            Overview of your learning platform.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={refreshData}
                            disabled={isLoading}
                            aria-label={isLoading ? 'Refreshing dashboard data' : 'Refresh dashboard data'}
                            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:border-emerald-400 hover:bg-emerald-500/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <RefreshCw aria-hidden="true" className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                            {isLoading ? 'Refreshing...' : 'Refresh data'}
                        </button>
                        <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5">
                       
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-sm font-bold text-emerald-300">
                            {loginContext?.userName.charAt(0).toUpperCase()}
                        </span>
                        <span>
                            <span className="block text-sm font-semibold text-slate-100">{loginContext?.userName}</span>
                            <span className="block text-xs text-slate-500">Platform admin</span>
                        </span>
                        </div>
                    </div>
                </header>

                {isLoading ? (
                    <div role="status" aria-live="polite" className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-12 text-center text-sm text-emerald-300 shadow-lg">
                        <span className="mr-2 text-slate-500">&gt;</span> Loading dashboard data...
                    </div>
                ) : (
                    <>
                        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                            <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-black/10">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-400">Total courses</span>
                                    <BookOpen aria-hidden="true" className="h-5 w-5 text-emerald-400" />
                                </div>
                                <p className="mt-4 text-3xl font-bold text-white">{courseCount}</p>
                                <p className="mt-1 text-xs text-slate-500">Available in the catalog</p>
                            </article>
                            <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-black/10">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-400">Active students</span>
                                    <UsersRound aria-hidden="true" className="h-5 w-5 text-sky-400" />
                                </div>
                                <p className="mt-4 text-3xl font-bold text-white">{userCount}</p>
                                <p className="mt-1 text-xs text-slate-500">Learning on the platform</p>
                            </article>
                        </div>

                        <div className="grid gap-6 xl:grid-cols-1">
                            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/10 sm:p-6">
                                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <h2 className="text-lg font-bold text-white">Recent courses</h2>
                                        <p className="mt-1 text-sm text-slate-500">A snapshot of your course catalog.</p>
                                    </div>
                                    <Link className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-semibold text-emerald-300" to='/admin/manage-courses' >View and Manage Courses</Link>
                                </div>
                                <div className="overflow-x-auto">
                                    {coursesData.length > 0 ? (
                                        <table className="w-full min-w-120 text-left text-sm">
                                            <thead>
                                                <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500">
                                                    <th className="pb-3 font-medium">Course</th>

                                                    {/* <th className="pb-3 font-medium">Status</th> */}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-800/80">
                                                {coursesData.slice(0, 3).map((e) => {
                                                    return <tr key={e.id}>
                                                        <td className="py-4 font-medium text-slate-200">{e.title}</td>
                                                    </tr>
                                                })}
                                            </tbody>
                                        </table>) : <p>No courses Available</p>}

                                </div>
                            </section>

                            {/* <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/10 sm:p-6">
                            <h2 className="text-lg font-bold text-white">Quick overview</h2>
                            <p className="mt-1 text-sm text-slate-500">Platform activity at a glance.</p>
                            <div className="mt-6 space-y-5">
                                <div>
                                    <div className="mb-2 flex justify-between text-sm">
                                        <span className="text-slate-300">Course capacity</span>
                                        <span className="text-emerald-300">72%</span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                                        <div className="h-full w-[72%] rounded-full bg-emerald-400" />
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 flex justify-between text-sm">
                                        <span className="text-slate-300">Student engagement</span>
                                        <span className="text-sky-300">86%</span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                                        <div className="h-full w-[86%] rounded-full bg-sky-400" />
                                    </div>
                                </div>
                                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                                    <p className="text-xs uppercase tracking-wider text-slate-500">Next step</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-300">
                                        Keep your catalog up to date to help learners find their next course.
                                    </p>
                                </div>
                            </div>
                        </section> */}
                        </div>
                    </>
                )}
            </section>
        </div>
    </main>
)
}

export default AdminDashboard