import moment from "moment/moment";
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { users } from "../../Mock-data.js";
import "./TaskPage.css";
import TextEditor from "./TextEditor.js";

function TaskPage() {
  const { state } = useLocation();
  const { id, pid, tid } = useParams();
  const [newcomment, setNewcomment] = useState("");
  const [comments, setComments] = useState([]);

  const [user, setUser] = useState(null);
  const userName = user?.name;
  const [projectName, setProjectName] = useState("");
  const [task, setTask] = useState(null);
  const [taskListName, setTaskListName] = useState("");
  const [newTasks, setNewTasks] = useState([]);
  const [newComment, setNewComment] = useState("");

  console.log(newTasks);

  useEffect(() => {
    let user = users.filter((item) => item.id === id)[0];
    setUser(user);
    let project = user.projects.filter((item) => item.id === pid)[0];
    setProjectName(project.project_name);
    let data = project.task_lists.filter((item) => {
      return item.tasks.filter((task) => task.id === tid)[0];
    })[0];
    setTaskListName(data.task_list_name);
    setTask(data.tasks.filter((task) => task.id === tid)[0]);
  }, [pid, tid]);

  const addComment = (e) => {
    e.preventDefault();
    setComments([
      ...comments,
      { userName, comment: newcomment, time: moment(new Date()).fromNow() },
    ]);
    setNewcomment("");
  };

  return (
    <div className="py-3 px-3 text-sm">
      <div className="font-bold text-base">
        {projectName} - {taskListName}
      </div>
      <div className="bg-gray-100 shadow-sm rounded-md w-full py-2 px-2 mt-2">
        <div className="flex justify-between ">
          <div
            className={`w-fit mb-2 py-0.5 px-2 text-white rounded-md ${
              task?.status === "uncompleted" ? "bg-rose-400" : "bg-green-400"
            }`}
          >
            {task?.status}
          </div>
        </div>

        <div className="font-semibold my-3">{task?.title}</div>

        <div>Description:</div>
        {task?.description.length > 1 ? (
          <ul>
            {task?.description.map((x, index) => {
              return (
                <div>
                  {index + 1}. {x}
                </div>
              );
            })}
          </ul>
        ) : (
          <div className="resize-none new-class">{task?.description}</div>
        )}

        {/* comments */}
        <div className="mt-20">
          <div className="mb-4">
            Comments ({task?.comments ? task?.comments?.length : 0})
          </div>
          <div>
            {task?.comments?.length !== 0 &&
              task?.comments?.map((item) => {
                return (
                  <div className="flex gap-2 mb-6">
                    <img
                      src={item.image}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{item.userName}</div>
                      <div>{item.comment}</div>
                    </div>
                  </div>
                );
              })}
          </div>
          {newTasks?.map((item) => {
            return (
              <div className="flex gap-2 mb-6">
                <img
                  src="https://pbs.twimg.com/profile_images/981311875643195393/dS0t6BQ8_400x400.jpg"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">{userName}</div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.newComment,
                    }}
                  />
                </div>
              </div>
            );
          })}
          <TextEditor newComment={newComment} setNewComment={setNewComment} />
          <div
            onClick={() => {
              setNewTasks([...newTasks, newComment]);
            }}
            className="bg-blue-500 text-white w-fit p-1 rounded-md mt-2 cursor-pointer"
          >
            Add comment
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
