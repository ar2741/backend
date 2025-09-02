import React, { useEffect, useState } from "react";

const AddFilesNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const parseDate = (dateStr) => {
    if (!dateStr) return new Date();
    // Ensure it's in ISO format (replace space with T if needed)
    let normalized = dateStr.replace(" ", "T");
    return new Date(normalized);
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/reports/recent");
      const data = await res.json();

      let notif = [];
      Object.entries(data).forEach(([cat, files]) => {
        files?.forEach((file) => {
          notif.push({
            category: cat.toUpperCase(),
            fileName: file.fileName,
            uploadedBy: file.uploadedBy,
            uploadedAt: file.createdAt || file.uploadedAt,
          });
        });
      });

      // ✅ Sort by createdAt (latest first)
      notif.sort(
        (a, b) => parseDate(b.uploadedAt) - parseDate(a.uploadedAt)
      );
      notif = notif.slice(0, 5);

      setNotifications(notif);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications(); // initial
    const interval = setInterval(fetchNotifications, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const handleClear = () => setNotifications([]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Recent Uploads</h2>
        {notifications.length > 0 && (
          <button
            onClick={handleClear}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Clear All
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No new uploads yet.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((n, i) => (
            <li key={i} className="p-3 border rounded shadow-sm">
              <strong>{n.fileName}</strong> ({n.category}) uploaded for{" "}
              <em>{n.uploadedBy}</em> at{" "}
              {parseDate(n.uploadedAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddFilesNotifications;
