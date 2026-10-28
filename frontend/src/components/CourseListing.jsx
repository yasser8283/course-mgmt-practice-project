import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import CourseCard from './CourseCard'
import { Link } from 'react-router-dom'

const CourseListing = () => {

    const [courseData, setcourseData] = useState([])
    const [searchText, setsearchText] = useState("")
    const [selectedCategory, setselectedCategory] = useState("All Categories")
    const [sortCourse, setsortCourse] = useState("default")

    //Fetching data from server
    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axios.get('http://localhost:3000/courses')
                setcourseData(res.data)
            }
            catch {
                console.error("Error occured")
            }
        }
        fetchData();
    }, [])

    //Filter based on category and search
    const filteredData = courseData.filter((e) => e.title.toLowerCase().includes(searchText.trim().toLowerCase()) && (selectedCategory === "All Categories" || e.category === selectedCategory))

    //sort data by price
    const copyData = [...filteredData]
    if (sortCourse === "high") {
        copyData.sort((a, b) => b.price - a.price)
    }
    else if (sortCourse === "low") {
        copyData.sort((a, b) => a.price - b.price)
    }
    const sortedData = copyData








    return (
        <main className="min-h-screen bg-slate-950 px-4 py-8 font-mono text-slate-100 sm:px-6 sm:py-12 lg:px-8">
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-800/70 via-slate-950 to-slate-950" />
            <div className="relative mx-auto w-full max-w-7xl">
                <header className="mb-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/20 sm:mb-10">
                    <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/90 px-4 py-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        <span className="ml-3 text-xs text-slate-500">course-catalog.jsx</span>
                    </div>
                    <div className="flex flex-col gap-6 px-5 py-7 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-9">
                        <div>
                            <p className="text-sm text-emerald-400"><span className="text-slate-500">const</span> catalog = <span className="text-amber-300">"learn, build, repeat"</span>;</p>
                            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Explore courses<span className="text-emerald-400">_</span>
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                                Find your next skill, one line of code at a time.
                            </p>
                        </div>
                        <Link
                            to="/wishlist"
                            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-pink-500/30 bg-pink-500/10 px-4 py-2 text-sm font-semibold text-pink-300 transition hover:border-pink-400 hover:bg-pink-500 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
                        >
                            Wishlist
                        </Link>
                    </div>
                </header>

                <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-3 shadow-xl shadow-black/20 sm:p-4">
                    <div className="flex w-full flex-col gap-3 lg:flex-row">
                        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 transition focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="h-5 w-5 shrink-0 text-emerald-400"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m21 21-5.2-5.2m1.7-5.3a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                />
                            </svg>
                            <input
                                type="text"
                                value={searchText}
                                onChange={((e) => setsearchText(e.target.value))}
                                placeholder="Search courses..."
                                className="w-full min-w-0 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500 sm:text-base"
                            />
                            <span className="hidden rounded border border-slate-700 px-1.5 py-0.5 text-[10px] text-slate-500 sm:inline">/</span>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:w-auto">
                            <div className="relative">
                                <select
                                    aria-label="Filter courses by category"
                                    value={selectedCategory}
                                    onChange={(cat) => setselectedCategory(cat.target.value)}
                                    className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 py-3 pl-4 pr-10 text-sm font-medium text-slate-200 outline-none transition hover:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 sm:w-48"
                                >
                                    <option value="All Categories">All Categories</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="App Development">App Development</option>
                                    <option value="Programming">Programming</option>
                                    <option value="Design">Design</option>
                                    <option value="Backend Development">Backend Development</option>
                                    <option value="Database">Database</option>
                                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                                    <option value="Cybersecurity">Cybersecurity</option>
                                    <option value="Cloud Computing">Cloud Computing</option>
                                    <option value="DevOps">DevOps</option>
                                </select>
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                                </svg>
                            </div>

                            <div className="relative">
                                <select
                                    aria-label="Sort by Price"
                                    value={sortCourse}
                                    onChange={(price) => setsortCourse(price.target.value)}
                                    className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 py-3 pl-4 pr-10 text-sm font-medium text-slate-200 outline-none transition hover:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 sm:w-48"
                                >
                                    <option value="default">Default order</option>
                                    <option value="low">Price: Low to High</option>
                                    <option value="high">Price: High to Low</option>
                                </select>
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
                    <span><span className="text-emerald-400">&gt;</span> available_courses</span>
                    <span>{sortedData.length.toString().padStart(2, '0')} results</span>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* Search Card conditional rendering */}
                {
                    sortedData.length > 0
                        ? sortedData.map((e) => <CourseCard data={e} key={e.id} />)
                        : <div className="col-span-full flex min-h-87.5 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900 px-6 py-12 text-center">


                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-8 w-8 text-emerald-400"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m21 21-4.34-4.34m1.84-5.16a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m9.5 9.5 5 5m0-5-5 5"
                                    />
                                </svg>
                            </div>

                            <h2 className="text-xl font-bold text-slate-100 sm:text-2xl">
                                No Courses Found
                            </h2>

                            <p className="mt-2 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
                                We couldn't find any courses matching your search.
                                Try a different keyword or explore another category.
                            </p>

                        </div>
                }

                </div>
            </div>
        </main>
    )
}

export default CourseListing