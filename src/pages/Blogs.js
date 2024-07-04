import './Blogs.css'
import {notification} from 'antd'
import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Body1,
  Caption1,
  Button,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@fluentui/react-components";
import { EditFilled, ShareFilled, DeleteFilled, EyeTrackingFilled } from "@fluentui/react-icons";
import {
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
} from "@fluentui/react-components";
import axios from 'axios';
import Edit from './Edipost'

const useStyles = makeStyles({
  card: {
    margin: "auto",
    width: "90%",
    maxWidth: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    backgroundColor: "rgb(245,245,245)"
  },
  modaldiv: {
    width: "90%",
    maxWidth: "calc(100vw - 260px)",
    padding: "20px",
    overflowY: "auto",
    backgroundColor: "#fff",
    borderRadius: "8px",
    // border: "1px solid gray"

  },
  modalContent: {
    width: "100%",
    maxWidth: "calc(100vw - 260px)",
    padding: "20px",
    overflowY: "auto",
    backgroundColor: "#fff",
    borderRadius: "8px",
    border: "1px solid gray"

  },
  rhzkxut:{
    inset: "0px",
    padding: "24px",
    margin: "auto",
    overflow: "unset",
    border: "1px solid var(--colorTransparentStroke)",
    borderRadius: "var(--borderRadiusXLarge)",
    display: "block",
    userSelect: "unset",
    visibility: "unset",
    position: "fixed",
    height: "fit-content",
    maxWidth: "calc(100vw - 260px)",
    maxHeight: "100vh",
    boxSizing: "border-box",
    backgroundColor: "var(--colorNeutralBackground1)",
    color: "var(--colorNeutralForeground1)"
  }
});

export const Blogs = () => {
  const styles = useStyles();
  const [blogs, setBlogs] = useState([]);
  const [selectedBlogContent, setSelectedBlogContent] = useState(null);
  const [selectedBlogContentForEdit, setSelectedBlogContentForEdit] = useState(null);
  const [edit, setEdit] = useState(false);
  const [deletes, setDeletes] = useState(false);
  const [publish, setPublish] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
        const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await axios.get('http://172.235.21.99:9591/blog/retrieveposts',{
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [deletes, publish]);

  const handlePreview = async (postId) => {
    
    try {
      const response = await axios.get(`http://172.235.21.99:9591/blog/retrieveparticularpost/${postId}`);
      const content = response.data.content;  // Assuming 'content' is part of the response data
      setSelectedBlogContent(content);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const handleDelete = async (value) => {
    const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await axios.post('http://172.235.21.99:9591/blog/deletepost',{"postId":value},{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    setDeletes(!deletes);
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
};

const handlePublish = async (value) => {
    const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await axios.post('http://172.235.21.99:9591/blog/publishpost',{"postId":value},{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    setPublish(!publish);
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
};


  const handleEdit = (content) => {
    setSelectedBlogContentForEdit(content);
  };

  const handleClose = () => {
    setSelectedBlogContent(null);
  };

  const handleCloseEdit = () => {
    setSelectedBlogContentForEdit(null);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "calc(100vw - 260px)" }}>
      <div style={{ width: "100%" }}>
        <div style={{ width: "90%", display: "flex", justifyContent: "center", fontSize: '28px', marginBottom: "20px" }}>Posted Blogs</div>
        {blogs.map((blog, index) => (
          <Card className={styles.card} key={index}>
            <CardHeader
              header={<Body1 style={{ width: "100%" }}>
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                  <b>{blog.postId}</b>
                  <b>Status: 
                    {blog.acceptedByAdmin === true && !blog.published && (
                        "Approved by Admin"
                    )}
                    {blog.acceptedByAdmin === true && blog.published && (
                        "Published"
                    )}
                    {blog.acceptedByAdmin === false && !blog.published && (
                        "Not Approved"
                    )}
                    </b>
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  <h3>{blog.title}</h3>
                </div>
              </Body1>}
            />
            <CardPreview style={{ display: "flex", justifyContent: 'center' }}>
            {blog.thumbnail&&(
              <img
                src={blog.thumbnail} // Use a default image if thumbnail is missing
                alt="Thumbnail"
                style={{ width: "40%", height: "40%" }}
              />
                )
                }
            </CardPreview>
            <CardFooter >
              <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                <div style={{ display: "flex", width: "16%", justifyContent: "space-between" }}>
                  <Button icon={<EditFilled fontSize={16} />} onClick={() => handleEdit(blog)}>Edit</Button>
                  {blog.acceptedByAdmin ? null : (
                    <Button icon={<DeleteFilled fontSize={16} />} onClick={() => handleDelete(blog.postId)}>
                        Delete
                    </Button>
                    )}
                </div>
                <div style={blog.acceptedByAdmin === true && !blog.published ?{ display: "flex", width: "17%", justifyContent: "space-between" }:{}}>
                {/* {blog.acceptedByAdmin ? (
                  <Button icon={<ShareFilled fontSize={16} />} onClick={() => handlePublish(blog.postId)}>Publish</Button>
                  ): null } */}
                  {blog.acceptedByAdmin === true && !blog.published && (
                        <Button icon={<ShareFilled fontSize={16} />} onClick={() => handlePublish(blog.postId)}>Publish</Button>
                    )}
                    {blog.acceptedByAdmin === true && blog.published && (
                        null
                    )}
                  <DialogTrigger>
                    <Button icon={<EyeTrackingFilled fontSize={16} />} onClick={() => handlePreview(blog.postId)}>Preview</Button>
                  </DialogTrigger>
                  {selectedBlogContent !== null && (
                    <Dialog  open={true} onDismiss={handleClose}>
                      <DialogSurface className={styles.rhzkxut}>
                        <DialogBody  >
                          <DialogTitle>Blog Preview</DialogTitle>
                          {/* <div style={{marginTop:"20px"}} className={styles.modaldiv}> */}
                          <DialogContent style={{marginTop:"20px", display:'flex', justifyContent:"center"}} className={styles.modalContent}>
                            <div dangerouslySetInnerHTML={{ __html: selectedBlogContent }} />
                            {/* <Edit/> */}
                          </DialogContent>
                          {/* </div> */}
                          <DialogActions >
                            <Button appearance="primary" onClick={handleClose}>Close</Button>
                          </DialogActions>
                        </DialogBody>
                      </DialogSurface>
                    </Dialog>
                  )}
                  {selectedBlogContentForEdit !== null && (
                    <Dialog  open={true} onDismiss={handleCloseEdit}>
                      <DialogSurface className={styles.rhzkxut}>
                        <DialogBody  >
                          <DialogTitle>Edit Blog</DialogTitle>
                          {/* <div style={{marginTop:"20px"}} className={styles.modaldiv}> */}
                          <DialogContent style={{marginTop:"20px", display:'flex', justifyContent:"center"}} className={styles.modalContent}>
                            {/* <div dangerouslySetInnerHTML={{ __html: selectedBlogContent }} /> */}
                            <Edit contents={selectedBlogContentForEdit}/>
                          </DialogContent>
                          {/* </div> */}
                          <DialogActions >
                            <Button appearance="primary" onClick={handleCloseEdit}>Close</Button>
                          </DialogActions>
                        </DialogBody>
                      </DialogSurface>
                    </Dialog>
                  )}
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blogs;



