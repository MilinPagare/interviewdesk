import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./user.css";

const User = () => {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [idx, setIdx] = useState(0);

  const getUser = async () => {
    try {
      const result = await fetch("http://jsonplaceholder.typicode.com/users/1");
      const data = await result.json();
      setUser(data);
    } catch (err) {
      console.log(`Not able to fetch user - ${err}`);
    }
  };

  const getData = async () => {
    try {
      const result = await fetch("http://jsonplaceholder.typicode.com/photos");
      const finalResult = await result.json();
      setData(finalResult);
      setPosts(finalResult.slice(idx, idx + 12));
      setIdx(idx + 12);
    } catch (err) {
      console.log(`Not able to fetch posts - ${err}`);
    }
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      setPosts([...posts, ...data.slice(idx, idx + 12)]);
      setIdx(idx + 12);
    }, 1000);
  };

  useEffect(() => {
    getUser();
    getData();
  }, []);

  return (
    <>
      <nav className="navBar">
        <img
          src="data:image/png;base64,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"
          alt="CompanyLogo"
          className="navImage"
        />
      </nav>
      <div className="userDetailContainer">
        <div className="imgDiv">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt={user.name}
            className="userImage"
          />
        </div>
        <div className="contentBox">
          <div className="firstInnerBox">
            <p className="name">{user.username}</p>
            <div className="parentBtns">
              <button id="followBtn" className="btns">
                Follow
              </button>
              <button className="btns">Message</button>
              <button
                className="btns"
                title={`email: ${user.email} and contact: ${user.phone}`}
              >
                Contact
              </button>
            </div>
          </div>
          <div className="detailClass">
            <p>
              {data.length} <span>posts</span>
            </p>
            <p>
              105M <span>followers</span>
            </p>
            <p>
              289 <span>following</span>
            </p>
          </div>
          <div>
            <p className="name">{user.name}</p>
            <p>{user.website}</p>
          </div>
        </div>
      </div>
      <hr />

      <InfiniteScroll
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={data.length !== posts.length}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        <div className="container">
          {posts.map((item) => (
            <div key={item.id}>
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="postImg"
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default User;
