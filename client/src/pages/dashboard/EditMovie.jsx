import { useState, useEffect } from "react";

function EditMovie() {
  const BASE_URL = "http://localhost:9000";

  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/movie/allmovies`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleEdit = async (id, updatedMovie) => {
    try {
      const response = await fetch(`${BASE_URL}/api/movie/update/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMovie),
      });
      if (!response.ok) throw new Error("Failed to update movie");
      const updatedData = await response.json();
      setMovies((prev) =>
        prev.map((movie) => (movie._id === id ? updatedData : movie))
      );
    } catch (error) {
      console.error("Failed to update movie:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/movie/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to delete movie");
      setMovies((prev) => prev.filter((movie) => movie._id !== id));
    } catch (error) {
      console.error("Failed to delete movie:", error);
    }
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(filter.toLowerCase()) ||
      movie.genre.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <div className="text-xl pb-4 text-center text-black">Now Showing Movies</div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <input
            type="text"
            placeholder="Search by Title or Genre"
            className="input input-bordered border-gray-400 m-2 w-full max-w-xs text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      <table className="table table-xs sm:table-md text-black">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Show Time</th>
            <th>Price</th>
            <th>IMDb URL</th>
            <th>Cover</th>
            <th>Poster</th>
            <th>Save</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie._id}</td>
              <td>
                <input
                  type="text"
                  value={movie.title}
                  onChange={(e) =>
                    setMovies((prev) =>
                      prev.map((m) =>
                        m._id === movie._id ? { ...m, title: e.target.value } : m
                      )
                    )
                  }
                  className="input input-bordered input-sm"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={movie.time}
                  onChange={(e) =>
                    setMovies((prev) =>
                      prev.map((m) =>
                        m._id === movie._id ? { ...m, time: e.target.value } : m
                      )
                    )
                  }
                  className="input input-bordered input-sm"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={movie.price}
                  onChange={(e) =>
                    setMovies((prev) =>
                      prev.map((m) =>
                        m._id === movie._id ? { ...m, price: e.target.value } : m
                      )
                    )
                  }
                  className="input input-bordered input-sm"
                />
              </td>
              <td>
                <input
                  type="url"
                  value={movie.imdb}
                  onChange={(e) =>
                    setMovies((prev) =>
                      prev.map((m) =>
                        m._id === movie._id ? { ...m, imdb: e.target.value } : m
                      )
                    )
                  }
                  className="input input-bordered input-sm"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={movie.cover}
                  onChange={(e) =>
                    setMovies((prev) =>
                      prev.map((m) =>
                        m._id === movie._id ? { ...m, cover: e.target.value } : m
                      )
                    )
                  }
                  className="input input-bordered input-sm"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={movie.poster}
                  onChange={(e) =>
                    setMovies((prev) =>
                      prev.map((m) =>
                        m._id === movie._id ? { ...m, poster: e.target.value } : m
                      )
                    )
                  }
                  className="input input-bordered input-sm"
                />
              </td>
              <td>
                <button
                  onClick={() => handleEdit(movie._id, movie)}
                  className="btn btn-sm btn-primary"
                >
                  Save
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(movie._id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EditMovie;
