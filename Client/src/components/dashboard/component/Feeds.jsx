import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";

const Feeds = () => {
  const [currentTasks, setCurrentTask] = useState([]);
  const [operation, setOperation] = useState(false);
  useEffect(() => {
    console.log(operation);
    const fetchTask = async () => {
      try {
        const response = await axios.get("http://localhost:5000/task", {
          headers: "Content-Type: application/json",
        });
        console.log(response.data);
        if (response.data) {
          setCurrentTask(response.data.tasks);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTask();
  }, [operation]);

  const deleteTaskHandler = (id) => {
    const deleteTask = async (id) => {
      try {
        const response = await axios.delete(
          `http://localhost:5000/task/${id}`,
          {
            headers: "Content-Type: application/json",
          }
        );
        console.log(response.data);
        setOperation((prevState) => !prevState);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };
    deleteTask(id);
  };
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Reminders</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Task left
        </CardSubtitle>
        <ListGroup className="mt-4">
          {currentTasks.map((task) => (
            <ListGroupItem
              key={task._id}
              className="d-flex align-items-center p-3 border-0"
            >
              {task.roomNumber}
              <small className="ms-auto text-muted text-small px-4">
                {task.taskDescription}
              </small>
              <button
                className="bg-red"
                onClick={() => {
                  deleteTaskHandler(task._id);
                }}
              >
                Delete
              </button>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;
