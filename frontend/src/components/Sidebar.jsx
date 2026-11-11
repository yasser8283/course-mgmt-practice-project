import { BookOpen, Globe, GraduationCap, LayoutDashboard, UsersRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    const navLinkClassName = ({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${isActive
            ? 'border border-emerald-500/20 bg-emerald-500/10 font-semibold text-emerald-300'
            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
        }`

    return (
        <div>
            <aside className="flex shrink-0 flex-col rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-xl shadow-black/20 lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:w-64">
                <div className="flex items-center gap-3 px-2 py-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
                        <GraduationCap aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-bold tracking-wide text-slate-100">
                        Course<span className="text-emerald-400">Platform</span>
                    </span>
                </div>

                <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Workspace
                </p>
                <nav aria-label="Admin navigation" className="space-y-1">
                    <NavLink to="/admin" end className={navLinkClassName}>
                        <LayoutDashboard aria-hidden="true" className="h-4 w-4" />
                        Dashboard
                    </NavLink>
                    <NavLink to="/admin/manage-courses" className={navLinkClassName}>
                        <BookOpen aria-hidden="true" className="h-4 w-4" />
                        Manage Courses
                    </NavLink>
                    <NavLink to="/admin/add-course" className={navLinkClassName}>
                        <UsersRound aria-hidden="true" className="h-4 w-4" />
                        Add a Course
                    </NavLink>
                    <NavLink to="/courses" className={navLinkClassName}>
                        <Globe aria-hidden="true" className="h-4 w-4" />
                        Back to Courses
                    </NavLink>
                </nav>
            </aside>
        </div>
    )
}

export default Sidebar