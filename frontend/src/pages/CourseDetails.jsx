import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BookOpen, Clock3, Tags, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'


const CourseDetails = () => {
    const [currentCourseDetails, setcurrentCourseDetails] = useState(null)
    const [isError, setisError] = useState(false)
    const { id } = useParams();
    const [isLoading, setisLoading] = useState(true)

    // console.log(currentCourseDetails)
    useEffect(() => {
        let isActive = true;
        const fetchDetails = async () => {
            try {
                setisError(false)
                setisLoading(true)
                const res = await axios.get(`http://localhost:3000/courses/${id}`)
                if (isActive) setcurrentCourseDetails(res.data)
            }
            catch {
                if (isActive) setisError(true)
            }
            finally {
                if (isActive) setisLoading(false)
            }
        }
        fetchDetails();
        return (() => {
            isActive = false;
        })

    }, [id])



    return (
        <main className="min-h-screen bg-slate-950 px-4 py-8 font-mono text-slate-100 sm:px-6 sm:py-10 lg:px-8">
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-800/70 via-slate-950 to-slate-950" />
            <div className="relative mx-auto w-full max-w-6xl">
                <header className="mb-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/20 sm:mb-10">
                    <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        <span className="ml-3 text-xs text-slate-500">course-details.jsx</span>
                    </div>
                    <div className="px-5 py-6 sm:px-7">
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
                        <BookOpen aria-hidden="true" className="h-4 w-4" />
                        <span>Explore our catalog</span>
                    </div>
                    <div className="mt-2 flex w-full flex-wrap items-center justify-between gap-4">
                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Course Details<span className="text-emerald-400">_</span>
                        </h1>
                        <Link
                            to="/courses/"
                            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:border-emerald-500 hover:bg-emerald-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                        >
                            <span aria-hidden="true">&lt;-</span>
                            Back to courses
                        </Link>
                    </div>
                    <p className="mt-2 text-sm text-slate-400 sm:text-base">
                        Find the details you need to choose your next course.
                    </p>
                    </div>
                </header>

                {isLoading ? <div className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-12 text-center text-sm text-emerald-300 shadow-lg">
                    <span className="mr-2 text-slate-500">&gt;</span> Loading your course...
                </div> :
                    isError ? (
                        <div className="rounded-2xl border border-rose-900/70 bg-slate-900 px-6 py-12 text-center shadow-lg">
                            <p className="text-lg font-semibold text-rose-300">Course not found</p>
                            {/* <Link
                                to="/courses/"
                                className="mt-6 inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Back to Course Page
                            </Link> */}
                        </div>
                    ) :
                        currentCourseDetails === null ? (
                            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 px-6 py-16 text-center shadow-lg">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-emerald-400">
                                    <BookOpen aria-hidden="true" className="h-7 w-7" />
                                </div>
                                <h2 className="mt-4 text-xl font-semibold text-slate-100">Nothing to show here</h2>
                                <p className="mt-2 text-sm text-slate-400">Course details are not available right now.</p>
                            </div>
                        ) : (
                            <article className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg shadow-black/20 transition duration-300 hover:border-emerald-500/40 hover:shadow-emerald-950/30">
                                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.55fr)_minmax(0,1.45fr)]">
                                    <div className="border-b border-slate-800 bg-slate-950/60 p-4 sm:p-6 md:border-b-0 md:border-r">
                                        <img
                                            src={currentCourseDetails.image}
                                            alt={currentCourseDetails.title}
                                            className="block h-44 w-full rounded-xl border border-slate-700 object-cover shadow-sm sm:h-52 md:h-64 lg:h-72"
                                        />
                                        <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                                            <Clock3 aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald-400" />
                                            <span>Learn at your own pace</span>
                                        </div>
                                    </div>

                                    <div className="flex min-w-0 flex-col p-6 sm:p-8 lg:p-10">
                                        <span className="inline-flex w-fit max-w-full items-center gap-2 wrap-break-word rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                                            <Tags aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                                            {currentCourseDetails.category}
                                        </span>

                                        <h2 className="mt-5 wrap-break-word text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                                            {currentCourseDetails.title}
                                        </h2>

                                        <div className="mt-8 flex min-w-0 items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-800 text-emerald-400">
                                                <UserRound aria-hidden="true" className="h-5 w-5" />
                                            </span>
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Instructor</p>
                                                <p className="mt-1 wrap-break-word text-sm font-medium text-slate-200">
                                                    {currentCourseDetails.instructor}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex min-w-0 items-center gap-4 rounded-xl border border-slate-800 p-4">
                                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-emerald-400">
                                                <Tags aria-hidden="true" className="h-5 w-5" />
                                            </span>
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Category</p>
                                                <p className="mt-1 wrap-break-word text-sm font-medium text-slate-200">
                                                    {currentCourseDetails.category}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-700 bg-slate-950 p-5 sm:p-6">
                                                <div>
                                                    <p className="text-sm text-slate-400">Course price</p>
                                                    <p className="mt-1 text-2xl font-bold text-emerald-400 sm:text-3xl">
                                                        ₹{Number(currentCourseDetails.price).toLocaleString("en-IN")}
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-sm font-semibold text-emerald-300 transition hover:border-emerald-400 hover:bg-emerald-500 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 active:bg-emerald-600"
                                                >
                                                    Enroll now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </article>
                        )}

            </div>
        </main>
    )

}
export default CourseDetails