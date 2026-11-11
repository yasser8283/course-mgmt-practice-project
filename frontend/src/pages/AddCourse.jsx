import { BookOpen, ImagePlus, LoaderCircle, Plus } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddCourse = () => {

  const [courseName, setcourseName] = useState("")
  const [courseInstructor, setcourseInstructor] = useState("")
  const [coursePrice, setcoursePrice] = useState(null)
  const [courseCategory, setcourseCategory] = useState("")
  const [courseImg, setcourseImg] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    const courseData = {
      title: courseName.trim(),
      instructor: courseInstructor.trim(),
      category: courseCategory,
      price: coursePrice,
      image: courseImg
    }
    try {
      await axios.post("http://localhost:3000/courses", courseData)
      toast.success("Course Added Successfully")
      navigate("/admin")
    }
    catch(error){
      console.error(error);
      toast.error("An error occured")
    } finally {
      setIsSubmitting(false)
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
              Add a Course<span className="text-emerald-400">_</span>
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Add a new learning experience to your catalog.
            </p>
          </header>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/10">
            <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-5 sm:px-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
                <BookOpen aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-semibold text-slate-100">Course details</h2>
                <p className="mt-1 text-xs text-slate-500">Enter the information shown to learners.</p>
              </div>
            </div>

            <form className="space-y-6 p-5 sm:p-7" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="course-title" className="mb-2 block text-sm font-medium text-slate-300">
                    Course title <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    id="course-title"
                    value={courseName}
                    onChange={(e) => setcourseName(e.target.value)}
                    name="title"
                    type="text"
                    required
                    placeholder="e.g. Complete Web Development Bootcamp"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label htmlFor="course-instructor" className="mb-2 block text-sm font-medium text-slate-300">
                    Instructor <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    id="course-instructor"
                    name="instructor"
                    value={courseInstructor}
                    onChange={(e) => setcourseInstructor(e.target.value)}
                    type="text"
                    required
                    placeholder="Instructor name"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label htmlFor="course-category" className="mb-2 block text-sm font-medium text-slate-300">
                    Category <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    id="course-category"
                    value={courseCategory}
                    onChange={(e) => setcourseCategory(e.target.value)}
                    name="category"
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="" disabled>Select a category</option>
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
                </div>

                <div>
                  <label htmlFor="course-price" className="mb-2 block text-sm font-medium text-slate-300">
                    Price <span className="text-emerald-400">*</span>
                  </label>
                  <div className="flex overflow-hidden rounded-xl border border-slate-700 bg-slate-950/70 transition focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
                    <span className="flex items-center border-r border-slate-700 px-4 text-sm text-slate-500">₹</span>
                    <input
                      id="course-price"
                      value={coursePrice}
                      onChange={(e) => setcoursePrice(Number(e.target.value))}
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      placeholder="0.00"
                      className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="course-image" className="mb-2 block text-sm font-medium text-slate-300">
                    Image URL <span className="text-emerald-400">*</span>
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/70 px-4 transition focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
                    <ImagePlus aria-hidden="true" className="h-5 w-5 shrink-0 text-slate-500" />
                    <input
                      id="course-image"
                      name="imageUrl"
                      value={courseImg}
                      onChange={(e) => setcourseImg(e.target.value)}
                      type="url"
                      required
                      placeholder="https://example.com/course-image.jpg"
                      className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-100 outline-none placeholder:text-slate-600"
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Paste a publicly accessible image link.</p>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:justify-end">
                <Link
                  to='/admin'
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-950 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-emerald-300/50 bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-950/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 disabled:cursor-not-allowed disabled:border-slate-700 disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />
                      Adding course...
                    </>
                  ) : (
                    <>
                      <Plus aria-hidden="true" className="h-4 w-4" />
                      Add course
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AddCourse
