import "./App.css";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import PostDetailPage from "./pages/post/PostDetailPage";
import PostPage from "./pages/post/PostPage";
import LandingPage from "./pages/main/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import { history } from "./core/helpers/history";
import { useSelector } from "react-redux";
import VideosPage from "./pages/video/VideosPage";
import VideoDetailsPage from "./pages/video/VideoDetailsPage";
import ShellLayout from "./core/layouts/ShellLayout";
import AuthLayout from "./core/layouts/AuthLayout";
import RegisterPage from "./pages/auth/RegisterPage";
import PostEditPage from "./pages/post/PostEditPage";
import VideoEditPage from "./pages/video/VideoEditPage";
import VideoSearchPage from "./pages/video/VideoSearchPage";
import PostSearchPage from "./pages/post/PostSearchPage";
import BookPage from "./pages/book/BookPage";
import BookEditPage from "./pages/book/BookEditPage";
import BookDetailsPage from "./pages/book/BookDetailsPage";
import MusicPage from "./pages/music/MusicPage";
import MusicEditPage from "./pages/music/MusicEditPage";
import ProfilePage from "./pages/main/ProfilePage";
import EditProfilePage from "./pages/main/EditProfilePage";
import EditAvatarPage from "./pages/main/EditAvatarPage";
import MyPostPage from "./pages/post/MyPostPage";
import UsersPage from "./pages/users/UsersPage";
import UserEditPage from "./pages/users/UserEditPage";

function App() {
  history.navigate = useNavigate();
  history.location = useLocation();
  return (
    <>
      <Routes>
        <Route path="/" element={<ShellLayout />}>
          <Route path="" element={<LandingPage />} />
        </Route>
        <Route path="/posts" element={<ShellLayout />}>
          <Route path="" element={<PostPage />} />
          <Route path="search" element={<PostSearchPage />} />
          <Route path=":slug" element={<PostDetailPage />} />
        </Route>

        <Route path="/videos" element={<ShellLayout />}>
          <Route path="" element={<VideosPage />} />
          <Route path="search" element={<VideoSearchPage />} />
          <Route path=":id" element={<VideoDetailsPage />} />
          <Route path="edit/:id" element={<VideoEditPage />} />
          <Route path="new" element={<VideoEditPage />} />
        </Route>
        <Route path="/books" element={<ShellLayout />}>
          <Route path="" element={<BookPage />} />
          <Route path="new" element={<BookEditPage />} />
          <Route path="edit/:id" element={<BookEditPage />} />
          <Route path=":id" element={<BookDetailsPage />} />
        </Route>
        <Route path="/musics" element={<ShellLayout />}>
          <Route path="" element={<MusicPage />} />
          <Route path="new" element={<MusicEditPage />} />
          <Route path="edit/:id" element={<MusicEditPage />} />
        </Route>
        <Route path="/profile" element={<ShellLayout />}>
          <Route path="" element={<ProfilePage />} />
          <Route path="update" element={<EditProfilePage />} />
          <Route path="avatar" element={<EditAvatarPage />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route
          path="/studio"
          element={
            <RequireAuth>
              <ShellLayout />
            </RequireAuth>
          }
        >
          <Route path="posts" element={<MyPostPage />} />
          <Route path="posts/edit/:id" element={<PostEditPage />} />
          <Route path="posts/new" element={<PostEditPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/edit/:id" element={<UserEditPage />} />
          <Route path="users/new" element={<UserEditPage />} />
        </Route>

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </>
  );
}

function RequireAuth({ children }) {
  let auth = useSelector((state) => state.auth);
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}

export default App;
