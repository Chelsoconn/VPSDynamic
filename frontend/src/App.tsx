import { useState, useEffect } from "react";
import { getIntro, getSingleUser } from "./services/requests.ts";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

const Intro = ({ greeting }) => {
  return (
    <>
      {greeting.map((user) => {
        return (
          <p key={user.name}>
            <Link to={`/user/${user.id}`}>
              {user.name}: {user.age}
            </Link>
          </p>
        );
      })}
    </>
  );
};

const SingleUser = () => {
  let { id } = useParams();
  const [singleUser, setSingleUser] = useState(null);

  const getUserInfo = async (id) => {
    try {
      const userInfo = await getSingleUser(id);
      setSingleUser(userInfo[0]);
    } catch {
      throw new Error("nothing fetched");
    }
  };

  useEffect(() => {
    if (id) {
      getUserInfo(id);
    }
  }, [id]);

  return (
    singleUser && (
      <p>
        You've clicked on {singleUser.name}, age {singleUser.age}, email{" "}
        {singleUser.email}
      </p>
    )
  );
};

function App() {
  const [intro, setIntro] = useState([]);

  useEffect(() => {
    const fetchIntro = async () => {
      try {
        const ans = await getIntro();
        setIntro(ans);
      } catch {
        throw new Error("Error fetching intro");
      }
    };

    fetchIntro();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro greeting={intro} />} />
        <Route path="/user/:id" element={<SingleUser />} />
      </Routes>
    </Router>
  );
}

export default App;
