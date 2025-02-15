import React, { useEffect, useState } from "react";
import { fetchLives, deleteLive } from "../services/api";
import LiveItem from "../components/LiveItem";

const LiveList = () => {
  const [lives, setLives] = useState([]);

  const loadLives = async () => {
    const data = await fetchLives();
    const sortedLives = data.sort(
      (a, b) => new Date(a.schedule) - new Date(b.schedule)
    );
    setLives(sortedLives);
  };

  useEffect(() => {
    loadLives();
  }, []);

  const handleDelete = async (id) => {
    await deleteLive(id);
    loadLives();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">ライブ一覧</h2>
      <ul className="list-group">
        {lives.map((live) => (
          <LiveItem key={live.id} live={live} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};

export default LiveList;

