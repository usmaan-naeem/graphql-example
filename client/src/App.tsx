import { Route, Routes } from "react-router-dom";
import "./App.css";
import PostsPage from "./pages/Posts";
import UsersPage from "./pages/Users";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <div className="App">
      <h1>My GraphQl Blog</h1>
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/user" element={<UsersPage />} />
      </Routes>
    </div>
  );
}

export default App;
