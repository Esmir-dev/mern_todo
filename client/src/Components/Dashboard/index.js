import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Members from "./Members/Members";
import "./style.css";
import "@lourenci/react-kanban/dist/styles.css";
import axios from "axios";
import MainBoard from "./Board/Board";

let data = {
  lanes: [
    {
      id: "lane1",
      title: "TO DO",
      cards: [],
    },
    {
      id: "lane2",
      title: "IN PROGRESS",
      cards: [],
    },
    {
      id: "lane3",
      title: "IN REVIEW",
      cards: [],
    },
    {
      id: "lane4",
      title: "DONE",
      cards: [],
    },
  ],
};

const Dashboard = () => {
  const [boardData, setBoardData] = useState(data);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState(false);

  const fetchData = async () => {
    let token = sessionStorage.getItem("data");
    let card = {};

    let data = {
      lanes: [
        {
          id: "lane1",
          title: "TO DO",
          cards: [],
        },
        {
          id: "lane2",
          title: "IN PROGRESS",
          cards: [],
        },
        {
          id: "lane3",
          title: "IN REVIEW",
          cards: [],
        },
        {
          id: "lane4",
          title: "DONE",
          cards: [],
        },
      ],
    };

    await axios
      .get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (!res.errors) {
          res.data.map((task) => {
            switch (task.status) {
              case "TO_DO":
                card = {
                  id: task._id,
                  title: task.name,
                  description: task.userID.email,
                };
                data.lanes[0].cards.push(card);
                break;
              case "IN_PROGRESS":
                card = {
                  id: task._id,
                  title: task.name,
                  description: task.userID.email,
                };
                data.lanes[1].cards.push(card);
                break;
              case "IN_REVIEW":
                card = {
                  id: task._id,
                  title: task.name,
                  description: task.userID.email,
                };
                data.lanes[2].cards.push(card);
                break;
              case "DONE":
                card = {
                  id: task._id,
                  title: task.name,
                  description: task.userID.email,
                };
                data.lanes[3].cards.push(card);
                break;
            }
          });
        }
      });
    setBoardData(data);
    setLoaded(true);
  };

  const fetchSerchedData = async (q) => {
    let token = sessionStorage.getItem("data");
    let card = {};

    let data = {
      lanes: [
        {
          id: "lane1",
          title: "TO DO",
          cards: [],
        },
        {
          id: "lane2",
          title: "IN PROGRESS",
          cards: [],
        },
        {
          id: "lane3",
          title: "IN REVIEW",
          cards: [],
        },
        {
          id: "lane4",
          title: "DONE",
          cards: [],
        },
      ],
    };

    await axios
      .get(`http://localhost:5000/api/tasks/${q}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        if (!res.errors) {
          res.data.map((task) => {
            switch (task.status) {
              case "TO_DO":
                card = {
                  id: task._id,
                  title: task.name,
                  description: task.userID.email,
                };
                data.lanes[0].cards.push(card);
                break;
              case "IN_PROGRESS":
                card = {
                  id: task._id,
                  title: task.name,
                  description: task.userID.email,
                };
                data.lanes[1].cards.push(card);
                break;
              case "IN_REVIEW":
                card = {
                  id: task._id,
                  title: task.name,
                  description: task.userID.email,
                };
                data.lanes[2].cards.push(card);
                break;
              case "DONE":
                card = {
                  id: task._id,
                  title: task.name,
                  description: task.userID.email,
                };
                data.lanes[3].cards.push(card);
                break;
            }
          });
        }
      });
    setBoardData(data);
    setLoaded(true);
  };

  const searchHandler = async (q) => {
    if (q.length < 3) await fetchData();

    if (q.length >= 3) {
      await fetchSerchedData(q);
      console.log(boardData);
    }
  };

  useEffect(async () => {
    await fetchData();
  }, []);

  useEffect(() => {
    console.log(boardData);
  }, [boardData]);

  return (
    <div>
      <Header />
      <Members refreshData={fetchData} />
      <div className="board">{loaded && <MainBoard data={boardData} />}</div>
    </div>
  );
};

export default Dashboard;
