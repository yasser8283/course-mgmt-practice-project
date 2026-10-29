import { useEffect, useState } from 'react'
import axios from 'axios'
import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import { useWishList } from '../context/WishListProvider'

const WishListPage = () => {
    const [courseData, setCourseData] = useState([])
    const { WishList } = useWishList()

    useEffect(() => {
        const getCourses = async () => {
            try {
                const res = await axios.get('http://localhost:3000/courses')
                setCourseData(res.data)
            } catch (error) {
                console.error('Unable to load courses for the wishlist', error)
            }
        }
        getCourses()
    }, [])

    const savedCourses = courseData.filter((course) => WishList.includes(course.id))

    return (
        <main className="min-h-screen bg-slate-950 px-4 py-8 font-mono text-slate-100 sm:px-6 sm:py-12 lg:px-8">
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-800/70 via-slate-950 to-slate-950" />
            <div className="relative mx-auto w-full max-w-7xl">
                <header className="mb-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/20 sm:mb-10">
                    <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/90 px-4 py-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        <span className="ml-3 text-xs text-slate-500">wishlist.jsx</span>
                    </div>
                    <div className="flex flex-col gap-6 px-5 py-7 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-9">
                        <div>
                            <p className="text-sm text-emerald-400"><span className="text-slate-500">const</span> saved = <span className="text-amber-300">"keep learning"</span>;</p>
                            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Your wishlist<span className="text-emerald-400">_</span>
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                                Courses you’ve saved for your next learning goal.
                            </p>
                        </div>
                        <Link
                            to="/courses"
                            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:border-emerald-400 hover:bg-emerald-500 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                        >
                            Browse courses <span aria-hidden="true" className="ml-2">-&gt;</span>
                        </Link>
                    </div>
                </header>

                <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
                    <span><span className="text-emerald-400">&gt;</span> saved_courses</span>
                    <span>{savedCourses.length.toString().padStart(2, '0')} saved</span>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {savedCourses.length > 0 ? (
                        savedCourses.map((course) => <CourseCard data={course} key={course.id} />)
                    ) : (
                        <div className="col-span-full flex min-h-87.5 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900 px-6 py-12 text-center">
                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">
                                <Heart aria-hidden="true" className="h-8 w-8 text-pink-400" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
                                Your wishlist is empty
                            </h2>
                            <p className="mt-2 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
                                Save courses that interest you and they’ll be waiting here when you’re ready.
                            </p>
                            <Link
                                to="/courses"
                                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:border-emerald-400 hover:bg-emerald-500 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                            >
                                Explore courses <span aria-hidden="true" className="ml-2">-&gt;</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}

export default WishListPage