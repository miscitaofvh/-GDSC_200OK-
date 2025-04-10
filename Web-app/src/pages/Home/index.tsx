import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useModal } from "../../contexts/ModalContext";
import axios from "axios";

interface Topic {
  title: string;
  description: string;
  views: number;
  keywords: string[];
}

const Home = () => {
  const { user, loading } = useAuth();
  const { openModal } = useModal();

  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      openModal("login");
    }
  }, [loading, user]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/topics");
        setTopics(response.data);
      } catch (err) {
        console.error("Failed to load topics:", err);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-1/5 bg-white p-4 shadow">
        <h1 className="text-xl font-bold mb-6">AI SOCIAL LISTENER</h1>
        <nav className="space-y-4">
          <button className="flex items-center gap-2 font-semibold text-black bg-gray-200 rounded px-3 py-2">Tổng quan</button>
          <button className="flex items-center gap-2 hover:text-blue-600">Kết quả</button>
          <button className="flex items-center gap-2 hover:text-blue-600">So sánh</button>
          <button className="flex items-center gap-2 hover:text-blue-600">Nội dung</button>
          <button className="flex items-center gap-2 hover:text-blue-600">Hiệu quả</button>
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Giày thể thao"
            className="border px-4 py-2 w-1/3 rounded shadow-sm"
          />
          <div className="text-sm text-gray-600">04/07/2025</div>
          <div className="flex items-center gap-2">
            <span className="text-600 font-semibold cursor-pointer">{user || ""}</span>
            <i className="fa-regular fa-user text-2xl" />
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-md space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-filter" />
              <span className="font-semibold">Chủ đề</span>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-gray-100 rounded">Hôm nay</button>
              <button className="px-3 py-1 bg-gray-100 rounded">Tuần này</button>
            </div>
          </div>

          {topics.length > 0 && (
            <div className="flex gap-4">
              <div className="w-1/2">
                <div className="text-red-600 font-semibold">{topics[0].title || "Nike"}</div>
                <p className="text-sm text-gray-600">
                  {topics[0].description || "Mô tả đang cập nhật..."}
                </p>
                <p className="text-red-500 font-bold">{topics[0].views?.toLocaleString() || "100.000"}</p>
                <div className="text-yellow-500">★★★☆☆</div>
                <div className="flex gap-2 mt-2">
                  {(topics[0].keywords || ["Từ khoá"]).map((kw: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-blue-200 text-sm rounded">{kw}</span>
                  ))}
                </div>
              </div>
              <div className="w-1/2">
                <div className="h-32 border rounded flex items-center justify-center text-gray-400">
                  Biểu đồ (chart)
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 bg-white p-4 rounded shadow">
          <div className="grid grid-cols-4 font-semibold border-b pb-2">
            <span>Chủ đề</span>
            <span>Mô tả</span>
            <span>Lượt xem</span>
            <span>Độ tích cực</span>
          </div>
          {topics.slice(1).map((topic: Topic, i: number) => (
            <div key={i} className="grid grid-cols-4 items-center py-2 border-b">
              <div className="flex items-center gap-2">
                <i className="fa-brands fa-reddit text-orange-600" />
                <span>{topic.title || "Chủ đề"}</span>
              </div>
              <span>{topic.description || "Mô tả"}</span>
              <span>{topic.views?.toLocaleString() || "100.000"}</span>
              <span className="text-yellow-500">★★★☆☆</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;