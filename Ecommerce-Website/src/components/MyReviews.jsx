import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("REVIEWS")) != null ? JSON.parse(localStorage.getItem("REVIEWS")) : [
      {
        id: 1,
        productName: "Wireless Headphones",
        productImage:
          "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6533/6533161cv12d.jpg",
        rating: 5,
        review:
          "Amazing sound quality and comfortable to wear for long hours!",
        date: "2025-10-10",
      },
      {
        id: 2,
        productName: "Smart Watch",
        productImage:
          "https://www.bhphotovideo.com/images/images2500x2500/apple_mj3t2ll_a_watch_sport_smartwatch_42mm_1187199.jpg",
        rating: 4,
        review: "Very useful for fitness tracking, but battery could be better.",
        date: "2025-09-28",
      },
    ];

    setReviews(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("REVIEWS", JSON.stringify(reviews));
  }, []);


  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    toast.error("Review deleted!");
  };


  const handleEdit = (id, currentText) => {
    setEditingId(id);
    setEditedText(currentText);
  };


  const handleSave = (id) => {
    const updated = reviews.map((r) =>
      r.id === id ? { ...r, review: editedText, date: new Date().toISOString() } : r
    );
    setReviews(updated);
    setEditingId(null);
    setEditedText("");
    toast.success("Review updated!");
  };

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-500 font-[Poppins]">
        <h2 className="text-2xl font-semibold text-[#DB4444] mb-4">My Reviews</h2>
        <p>No reviews yet. Add reviews after purchasing products!</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-20 p-6 bg-[#F5F5F5] rounded-lg shadow-md font-[Poppins]">
      <h2 className="text-2xl font-semibold text-[#DB4444] mb-6">My Reviews</h2>

      <div className="flex flex-col gap-y-5">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row md:items-center justify-between"
          >
     
            <div className="flex items-center gap-4 w-full md:w-1/2">
              <img
                src={r.productImage}
                alt={r.productName}
                className="h-20 object-cover rounded-md border"
              />
              <div>
                <h3 className="font-semibold text-lg">{r.productName}</h3>
                <p className="text-yellow-500 text-sm">
                  {"⭐".repeat(r.rating)}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(r.date).toLocaleDateString()}
                </p>
              </div>
            </div>

      
            <div className="mt-3 md:mt-0 flex flex-col w-full md:w-1/2">
              {editingId === r.id ? (
                <textarea
                  className="border rounded-md p-2 text-sm w-full resize-none"
                  rows={3}
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
              ) : (
                <p className="text-gray-700 text-sm">{r.review}</p>
              )}

              <div className="flex justify-end gap-3 mt-3">
                {editingId === r.id ? (
                  <>
                    <button
                      onClick={() => handleSave(r.id)}
                      className="bg-[#DB4444] text-white px-3 py-1 text-xs rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-500 text-xs"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(r.id, r.review)}
                      className="text-blue-600 text-xs hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-red-600 text-xs hover:underline"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
