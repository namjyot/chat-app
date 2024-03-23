import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import GroupChat from "./pages/GroupChat";
import Profile from "./pages/Profile";
import ChatState from "./context/ChatState";
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  return (
    <ChatState>
      <Router>
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/groupchat" element={<GroupChat />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </ChatState>
  );
}

export default App;
