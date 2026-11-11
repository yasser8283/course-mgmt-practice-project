import { useEffect, useState } from 'react'
import axios from 'axios'
import { Pencil, Save, Trash2, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { toast } from 'react-toastify'


const ManageCourse = () => {
    const [courses, setCourses] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [formData, setformData] = useState({ title: "", price: "", category: "" })

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get('http://localhost:3000/courses')
                setCourses(res.data)
            } catch (requestError) {
                console.error('Failed to fetch courses:', requestError)
                setError('Unable to load courses. Please try again later.')
            } finally {
                setIsLoading(false)
            }
        }

        getData()
    }, [])

    const handleDelete = async (id) => {
        let userConfirm = window.confirm("Are you sure you want to delete the course");
        try {
            if (userConfirm) {
                await axios.delete(`http://localhost:3000/courses/${id}`)
                setCourses(prev =>
                    prev.filter(e => e.id !== id)
                )
                toast.success("Course deleted successfully")
            }
        }
        catch (err) {
            console.error(err);
            toast.error("An error occured!")
        }
    }

    const handleEdit = (course) => {
        setSelectedCourse(course)
        setformData({
            title: course.title,
            price: course.price,
            category: course.category
        })
    }

    const handleSubmit = async () => {
        try {
            let putData = { ...selectedCourse, ...formData }
            await axios.put(`http://localhost:3000/courses/${selectedCourse.id}`, putData)
            toast.success("Edited Successfully");
            setCourses(prevData => {
                prevData.map((course) => {
                    return course.id === selectedCourse.id ? { ...course, ...formData } : course
                })
            })
            setSelectedCourse(null)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <main className="min-h-screen bg-slate-950 font-mono text-slate-100">
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-800/70 via-slate-950 to-slate-950" />
            <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] flex-col gap-5 p-4 sm:p-6 lg:flex-row lg:gap-6 lg:p-8">
                <Sidebar />
                <section className="min-w-0 flex-1">
                    <header className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 px-5 py-5 shadow-xl shadow-black/20 sm:px-7">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                            Admin workspace
                        </p>
                        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Manage Courses<span className="text-emerald-400">_</span>
                        </h1>
                        <p className="mt-1 text-sm text-slate-400">
                            View and manage courses in your catalog.
                        </p>
                    </header>

                    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-xl shadow-black/10 sm:p-6">
                        {isLoading ? (
                            <p role="status" aria-live="polite" className="py-10 text-center text-sm text-emerald-300">
                                Loading courses...
                            </p>
                        ) : error ? (
                            <p role="alert" className="py-10 text-center text-sm text-rose-300">
                                {error}
                            </p>
                        ) : courses.length === 0 ? (
                            <p className="py-10 text-center text-sm text-slate-400">
                                No courses available.
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-160 text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500">
                                            <th scope="col" className="px-4 pb-3 font-medium">Course name</th>
                                            <th scope="col" className="px-4 pb-3 font-medium">Price</th>
                                            <th scope="col" className="px-4 pb-3 font-medium">Category</th>
                                            <th scope="col" className="px-4 pb-3 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/80">
                                        {courses.map((course) => (
                                            <tr key={course.id}>
                                                <td className="px-4 py-4 font-medium text-slate-200">{course.title}</td>
                                                <td className="px-4 py-4 text-emerald-300">₹{course.price}</td>
                                                <td className="px-4 py-4 text-slate-400">{course.category}</td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleEdit(course)}
                                                            type="button"
                                                            aria-label={`Edit ${course.title}`}
                                                            className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-emerald-500/50 hover:text-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                                                        >
                                                            <Pencil aria-hidden="true" className="h-3.5 w-3.5" />
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(course.id)}
                                                            aria-label={`Delete ${course.title}`}
                                                            className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/5 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:border-rose-400/50 hover:bg-rose-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
                                                        >
                                                            <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </section>
                {selectedCourse && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-sm sm:p-6">
                        <section
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="edit-course-title"
                            className="my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/50"
                        >
                            <div className="flex items-start gap-4 border-b border-slate-800 bg-slate-900/90 px-5 py-5 sm:px-7">
                                <button
                                    type="button"
                                    onClick={() => setSelectedCourse(null)}
                                    aria-label="Close edit course dialog"
                                    className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-950 text-slate-400 transition hover:border-rose-400/50 hover:bg-rose-500/10 hover:text-rose-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                                >
                                    <X aria-hidden="true" className="h-4 w-4" />
                                </button>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                                        Course catalog
                                    </p>
                                    <h2 id="edit-course-title" className="mt-2 text-xl font-bold text-white sm:text-2xl">
                                        Edit course<span className="text-emerald-400">_</span>
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-400">
                                        Update the course information below.
                                    </p>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-5 px-5 py-6 sm:px-7">
                                <div>
                                    <label htmlFor="course-title" className="mb-2 block text-sm font-medium text-slate-300">
                                        Course Title
                                    </label>
                                    <input
                                        id="course-title"
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) =>
                                            setformData((prev) => ({
                                                ...prev,
                                                title: e.target.value
                                            }))
                                        }
                                        className="min-h-11 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="course-price" className="mb-2 block text-sm font-medium text-slate-300">
                                        Course Price
                                    </label>
                                    <input
                                        id="course-price"
                                        type="text"
                                        value={formData.price}
                                        onChange={(e) =>
                                            setformData((prev) => ({
                                                ...prev,
                                                price: Number(e.target.value)
                                            }))
                                        }
                                        className="min-h-11 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="course-category" className="mb-2 block text-sm font-medium text-slate-300">
                                        Course Category
                                    </label>
                                    <input
                                        id="course-category"
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) =>
                                            setformData((prev) => ({
                                                ...prev,
                                                category: e.target.value
                                            }))
                                        }
                                        className="min-h-11 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                    />
                                </div>
                                <div className="flex justify-end border-t border-slate-800 pt-5">
                                    <button
                                        type="submit"
                                        className="inline-flex min-h-12 min-w-40 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-400 to-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-950/40 transition duration-200 hover:-translate-y-0.5 hover:from-emerald-300 hover:to-emerald-400 hover:shadow-xl hover:shadow-emerald-950/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 active:translate-y-0 active:scale-[0.98]"
                                    >
                                        <Save aria-hidden="true" className="h-4 w-4" />
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                )}
            </div>
        </main>
    )
}

export default ManageCourse
