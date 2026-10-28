import React from 'react'
import { Link } from 'react-router-dom'
import { useWishList } from '../context/WishListContext';
import { Heart } from 'lucide-react'
import { toast } from 'react-toastify';


const CourseCard = ({ data }) => {
    let { id, title, instructor, category, price, image } = data;
    // console.log(data);
    // console.log(id);
    const { WishList, setWishList } = useWishList();
    // console.log("CourseCard state:", WishList);
    const isWishListed = WishList.includes(id)



    const handleWishList = () => {
        const isSaved = WishList.includes(id);
        setWishList((prevWishList)=>{
            if(isSaved){
                return prevWishList.filter((idx)=>idx!=id)
            }
            else{
                return [...WishList,id]
            }
        })
        isSaved ? toast.success("Course removed from Wishlist") : toast.success("Course added to Wishlist")
    };

    return (
        <div className="w-full max-w-sm overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-emerald-950/30">

            {/* Course Image */}
            <img
                src={image}
                alt={title}
                className="h-48 w-full object-cover"
            />

            {/* Card Content */}
            <div className="p-5">

                {/* Category */}
                <span className="inline-block max-w-full rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    {category}
                </span>

                {/* Title */}
                <h2 className="mt-3 line-clamp-2 min-h-14 text-lg font-bold leading-7 text-slate-100">
                    {title}
                </h2>

                {/* Instructor */}
                <p className="mt-3 truncate text-xs text-slate-500">
                    <span className="text-slate-600">Instructor:</span>{' '}
                    <span className="font-medium text-slate-300">{instructor}</span>
                </p>

                {/* Price and Button */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
                    <p className="text-xl font-bold text-emerald-400">
                        ₹{price}
                    </p>
                    {
                        isWishListed ? (
                            <button
                                onClick={handleWishList}
                                type="button"
                                className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-pink-500/30 bg-pink-500/10 px-3 py-2 text-xs font-semibold text-pink-300 transition hover:border-pink-400 hover:bg-pink-500/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
                            >
                                <Heart aria-hidden="true" className="h-4 w-4 fill-current" />
                                Saved
                            </button>
                        ) : (
                            <button
                                onClick={handleWishList}
                                type="button"
                                className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-pink-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
                            >
                                <Heart aria-hidden="true" className="h-4 w-4" />
                                Wishlist
                            </button>
                        )
                    }
                    <Link className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-300 transition hover:border-emerald-400 hover:bg-emerald-500 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400" to={`/courses/${id}`}>View course <span aria-hidden="true">-&gt;</span></Link>
                </div>

            </div>
        </div>
    );
}

export default CourseCard