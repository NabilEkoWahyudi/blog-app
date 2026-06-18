"use client"

import { addToReadingList } from "../../actions/blogs"
import { useState } from "react"

export default function AddToReadingListButton({ blogId }: { blogId: number }) {
  const [added, setAdded] = useState(false)

  const handleClick = async () => {
    await addToReadingList(blogId)
    setAdded(true)
  }

  if (added) {
    return (
      <p className="text-emerald-600 text-sm font-medium">
        ✅ Added to reading list!
      </p>
    )
  }

  return (
    <button
      onClick={handleClick}
      className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
    >
      📚 Add to reading list
    </button>
  )
}
