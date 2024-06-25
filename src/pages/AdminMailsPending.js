import './Blogs.css'
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
  const [approved, setapproved] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
        const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(`http://172.235.21.99:9591/blog/retrievependingmails/nothing`,{
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
  }, [approved]);

  const handleapprovePost = async (value) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      await axios.post(`http://172.235.21.99:9591/blog/approvemail/${value}`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setapproved(!approved);
    } catch (error) {
      console.error('Error approving post:', error);
    }
  };

  const handlePreview = (content) => {
    setSelectedBlogContent(content);
  };

  const handleClose = () => {
    setSelectedBlogContent(null);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "calc(100vw - 260px)" }}>
      <div style={{ width: "100%" }}>
        <div style={{ width: "100%", display: "flex", justifyContent: "center", fontSize: '28px', marginBottom: "20px" }}>Pending Mails</div>
        {blogs.map((blog, index) => (
          <Card className={styles.card} key={index}>
            <CardHeader
              header={<Body1 style={{ width: "100%" }}>
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                  <b>{blog.postId}</b>
                  <b>User: {blog.username}</b>
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
                  <Button icon={<EditFilled fontSize={16} />} onClick={() => handleapprovePost(blog.postId)}>approve</Button>
                  {/* <Button icon={<DeleteFilled fontSize={16} />}>Delete</Button> */}
                </div>
                <div style={{ display: "flex", width: "17%", justifyContent: "end" }}>
                  {/* <Button icon={<ShareFilled fontSize={16} />}>Publish</Button> */}
                  <DialogTrigger>
                    <Button icon={<EyeTrackingFilled fontSize={16} />} onClick={() => handlePreview(blog.content)}>Preview</Button>
                  </DialogTrigger>
                  {selectedBlogContent !== null && (
                    <Dialog  open={true} onDismiss={handleClose}>
                      <DialogSurface className={styles.rhzkxut}>
                        <DialogBody  >
                          <DialogTitle>Blog Preview</DialogTitle>
                          {/* <div style={{marginTop:"20px"}} className={styles.modaldiv}> */}
                          <DialogContent style={{marginTop:"20px", display:'flex', justifyContent:"center"}} className={styles.modalContent}>
                            <div dangerouslySetInnerHTML={{ __html: selectedBlogContent }} />
                          </DialogContent>
                          {/* </div> */}
                          <DialogActions >
                            <Button appearance="primary" onClick={handleClose}>Close</Button>
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



