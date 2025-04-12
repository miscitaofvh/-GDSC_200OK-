import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useModal } from "../../contexts/ModalContext";
import { requestAPI } from "../../utils/request";

const BASE_URL = "http://localhost:3000/api/app";

interface Topic {
  name?: string;
  summary?: string;
  comment?: string;
  point?: number;
  strengths?: string[] | string;
  weaknesses?: string[] | string;
  improvement?: string[] | string;
  appearance?: string[] | string;
  quality?: string[] | string;
  comparison?: string[] | string;
  material?: string[] | string;
  price?: number;
  currency?: string;
}

const Home = () => {
  const { user, loading, logout } = useAuth();
  const { openModal } = useModal();

  const [searchTerm, setSearchTerm] = useState("");
  const [topic, setTopic] = useState<Topic | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      openModal("login");
    }
  }, [loading, user, openModal]);

  const handleSearch = async () => {
    try {
      const response = await requestAPI(BASE_URL, "/search", "POST", {
        search: searchTerm,
      });

      const rawData = response.data?.data || [];
      const lastOutput = [...rawData]
        .reverse()
        .find((item: any) => item.output && (item.output.summary || item.output.comment));

      if (lastOutput?.output) {
        setTopic(lastOutput.output);
      } else {
        setTopic(null);
      }
    } catch (err) {
      console.error("Lỗi khi tìm kiếm:", err);
    }
  };

  const handleLogout = async () => {
    try {
      logout();
    } catch (err) {
      console.error("Lỗi khi đăng xuất:", err);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow">
        <button onClick={toggleSidebar} className="text-2xl">☰</button>
        <h1 className="text-xl font-bold">AI SOCIAL LISTENER</h1>
        {user && (
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 border border-red-500 px-3 py-1 rounded hover:bg-red-50"
          >
            Đăng xuất
          </button>
        )}
      </div>

      <aside className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-1/5 bg-white p-4 shadow fixed md:static h-full z-10`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">AI SOCIAL LISTENER</h1>
          <div className="md:hidden">
            <button onClick={toggleSidebar} className="text-2xl">×</button>
          </div>
        </div>
        <nav className="space-y-4">
          <button className="w-full text-left px-3 py-2 bg-gray-200 rounded font-semibold">Tổng quan</button>
          <button className="w-full text-left px-3 py-2 hover:text-blue-600">Kết quả</button>
          <button className="w-full text-left px-3 py-2 hover:text-blue-600">So sánh</button>
          <button className="w-full text-left px-3 py-2 hover:text-blue-600">Nội dung</button>
          <button className="w-full text-left px-3 py-2 hover:text-blue-600">Hiệu quả</button>
        </nav>
      </aside>

      {isSidebarOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"></div>}

      <main className="flex-1 p-4 md:p-6 overflow-y-auto mt-16 md:mt-0">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0">
          <div className="flex items-center gap-2 w-full md:w-1/2">
            <input
              type="text"
              placeholder="Tìm kiếm (VD: RTX 4090)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="border px-4 py-2 flex-1 rounded shadow-sm"
            />
            <button
              onClick={handleSearch}
              className="inline px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap"
            >
              Tìm kiếm
            </button>
          </div>

          <div className="text-sm text-gray-600 hidden md:block">{new Date().toLocaleDateString()}</div>

          <div className="hidden md:flex items-center gap-3">
            {user && (
              <>
                <span className="text-sm font-semibold">{user}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 border border-red-500 px-3 py-1 rounded hover:bg-red-50"
                >
                  Đăng xuất
                </button>
              </>
            )}
            <i className="fa-regular fa-user text-2xl" />
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4 md:hidden">{new Date().toLocaleDateString()}</div>

        {topic ? (
          <div className="bg-white p-4 md:p-6 rounded shadow space-y-4">
            {topic.name && <Section title="Tên sản phẩm" content={topic.name} />}
            {topic.summary && <Section title="Tóm tắt" content={topic.summary} />}
            {topic.comment && <Section title="Bình luận" content={topic.comment} />}
            {topic.point && <Section title="Đánh giá" content={`★ ${topic.point}/5`} isHighlight />}
            {topic.strengths && <ListSection title="Ưu điểm" list={topic.strengths} />}
            {topic.weaknesses && <ListSection title="Nhược điểm" list={topic.weaknesses} />}
            {topic.improvement && <ListSection title="Cải tiến đề xuất" list={topic.improvement} />}
            {topic.appearance && <ListSection title="Thiết kế & Ngoại quan" list={topic.appearance} />}
            {topic.quality && <ListSection title="Chất lượng" list={topic.quality} />}
            {topic.comparison && <ListSection title="So sánh" list={topic.comparison} />}
            {topic.material && <ListSection title="Chất liệu" list={topic.material} />}
            {topic.price && (
              <Section
                title="Giá bán"
                content={`${topic.price.toLocaleString()} ${topic.currency?.toUpperCase() || ""}`}
                isPrice
              />
            )}
          </div>
        ) : (
          <div className="text-gray-500 italic">Không có dữ liệu hiển thị</div>
        )}
      </main>
    </div>
  );
};

export default Home;

const Section = ({
  title,
  content,
  isHighlight = false,
  isPrice = false,
}: {
  title: string;
  content: string;
  isHighlight?: boolean;
  isPrice?: boolean;
}) => (
  <div>
    <h2 className="font-semibold text-lg mb-1">{title}</h2>
    <p className={`${isHighlight ? "text-yellow-500 text-xl" : ""} ${isPrice ? "text-red-600 font-bold text-lg" : "text-gray-700"}`}>
      {content}
    </p>
  </div>
);

const ListSection = ({ title, list }: { title: string; list: string[] | string }) => {
  const items = Array.isArray(list) ? list : typeof list === "string" ? list.split(",") : [];

  return (
    <div>
      <h2 className="font-semibold text-lg mb-1">{title}</h2>
      <ul className="list-disc ml-5 text-gray-700">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};