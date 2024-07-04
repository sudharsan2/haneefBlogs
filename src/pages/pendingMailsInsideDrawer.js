// import './Blogs.css'
// import React, { useEffect, useState } from "react";
// import {
//   makeStyles,
//   Body1,
//   Caption1,
//   Button,
//   Dialog,
//   DialogTrigger,
//   DialogSurface,
//   DialogBody,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@fluentui/react-components";
// import { EditFilled, ShareFilled, DeleteFilled, EyeTrackingFilled } from "@fluentui/react-icons";
// import {
//   Card,
//   CardFooter,
//   CardHeader,
//   CardPreview,
// } from "@fluentui/react-components";
// import axios from 'axios';

// const useStyles = makeStyles({
//     card: {
//       margin: "auto",
//       width: "100%",
//       maxWidth: "100%",
//       display: "flex",
//       justifyContent: "center",
//       marginTop: "20px",
//       backgroundColor: "rgb(245,245,245)"
//     },
//     modaldiv: {
//       width: "90%",
//       maxWidth: "calc(100vw - 260px)",
//       padding: "20px",
//       overflowY: "auto",
//       backgroundColor: "#fff",
//       borderRadius: "8px",
//       // border: "1px solid gray"
  
//     },
//     modalContent: {
//       width: "100%",
//       maxWidth: "calc(100vw - 260px)",
//       padding: "20px",
//       overflowY: "auto",
//       backgroundColor: "#fff",
//       borderRadius: "8px",
//       border: "1px solid gray"
  
//     },
//     rhzkxut:{
//       inset: "0px",
//       padding: "24px",
//       margin: "auto",
//       overflow: "unset",
//       border: "1px solid var(--colorTransparentStroke)",
//       borderRadius: "var(--borderRadiusXLarge)",
//       display: "block",
//       userSelect: "unset",
//       visibility: "unset",
//       position: "fixed",
//       height: "fit-content",
//       maxWidth: "calc(100vw - 260px)",
//       maxHeight: "100vh",
//       boxSizing: "border-box",
//       backgroundColor: "var(--colorNeutralBackground1)",
//       color: "var(--colorNeutralForeground1)"
//     }
//   });

// export const Blogs = ({empId}) => {
  
//   const styles = useStyles();
//   const [blogs, setBlogs] = useState([]);
//   const [approved, setapproved] = useState(false);
//   const [selectedBlogContent, setSelectedBlogContent] = useState(null);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//         const accessToken = localStorage.getItem("accessToken");
//       try {
//         const response = await axios.get(`http://172.235.21.99:9591/blog/retrievependingposts/${empId}`,{
//             headers: {
//               Authorization: `Bearer ${accessToken}`
//             }
//           });
//         setBlogs(response.data);
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   const handlePreview = (content) => {
//     setSelectedBlogContent(content);
//   };

//   const handleClose = () => {
//     setSelectedBlogContent(null);
//   };

//   const handleapprovePost = async (postId) => {
//     const accessToken = localStorage.getItem("accessToken");
//       try {
//         const response = await axios.post(`http://172.235.21.99:9591/blog/approvepost/${postId}`, {}, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`
//           }
//         });

//         // setBlogs(response.data);
//         setapproved(!approved);
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//       }
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
//         <div><div style={{ width: "100%", display: "flex", justifyContent: "center", fontSize: '28px', marginBottom: "20px" }}>Pending Blogs</div>
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", padding: "20px" }}>
        
//         {blogs.map((blog, index) => (
//           <Card className={styles.card} key={index}>
//             <CardHeader
//               header={<Body1 style={{ width: "100%" }}>
//                 <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
//                   <b>{blog.postId}</b>
//                   {/* <b>Status: Still not Approved</b> */}
//                 </div>
//                 <div style={{ width: "100%", display:"flex", justifyContent:"center" }}>
//                 <h3 style={{  textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "300px" }}>
//                   {blog.title}
//                 </h3>
//               </div>

//               </Body1>}
//             />
//             <CardPreview style={{ display: "flex", justifyContent: 'center' }}>
//               <img
//                 src={blog.thumbnail || "/ai.png"} // Use a default image if thumbnail is missing
//                 alt="Thumbnail"
//                 style={{ width: "40%", height: "40%" }}
//               />
//             </CardPreview>
//             <CardFooter >
//               <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
//                 <div style={{ display: "flex", width: "16%", justifyContent: "space-between" }}>
//                 <Button icon={<EyeTrackingFilled fontSize={16} />} onClick={() => handlePreview(blog.content)}>Preview</Button>
                  
//                 </div>
                
                  
//                   <DialogTrigger>
                    
//                   </DialogTrigger>
//                   {selectedBlogContent !== null && (
//                     <Dialog  open={true} onDismiss={handleClose}>
//                       <DialogSurface className={styles.rhzkxut}>
//                         <DialogBody  >
//                           <DialogTitle>
//                             <div style={{display:"flex"}}>
//                               <div>
//                             Blog Preview
//                             </div>
//                             <Button style={{marginLeft:"30px"}} appearance="primary" onClick={()=>handleapprovePost(blog.postId)}>Approve</Button>
//                             </div>
//                             </DialogTitle>
//                           {/* <div style={{marginTop:"20px"}} className={styles().modaldiv}> */}
//                           <DialogContent style={{marginTop:"20px", display:'flex', justifyContent:"center"}} className={styles.modalContent}>
//                             <div dangerouslySetInnerHTML={{ __html: selectedBlogContent }} />
//                           </DialogContent>
//                           {/* </div> */}
//                           <DialogActions >
//                             {/* <div style={{width:"100%",display:"flex",justifyContent:"space-between"}}> */}
                            
//                             <Button appearance="primary" onClick={handleClose}>Close</Button>
//                             {/* </div> */}
//                           </DialogActions>
//                         </DialogBody>
//                       </DialogSurface>
//                     </Dialog>
//                   )}
                
//               </div>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Blogs;


import './Blogs.css';
import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Body1,
  Button,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@fluentui/react-components";
import { EyeTrackingFilled,EditFilled } from "@fluentui/react-icons";
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
    width: "100%",
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
  rhzkxut: {
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

export const Blogs = ({ empId }) => {
  const styles = useStyles();
  const [blogs, setBlogs] = useState([]);
  const [approved, setapproved] = useState(false);
  const [selectedBlogContent, setSelectedBlogContent] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null); // Add state for selected post ID

  useEffect(() => {
    const fetchBlogs = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(`http://172.235.21.99:9591/blog/retrievependingmails/${empId}`, {
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
  }, [empId, approved]); // Add empId to dependency array

  const handlePreview = async (postId) => {
    setSelectedPostId(postId);
    try {
      const response = await axios.get(`http://172.235.21.99:9591/blog/retrieveparticularmail/${postId}`);
      const content = response.data.content;  // Assuming 'content' is part of the response data
      setSelectedBlogContent(content);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const handleClose = () => {
    setSelectedBlogContent(null);
    setSelectedPostId(null); // Reset the selected post ID
  };

  const handleapprovePost = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      await axios.post(`http://172.235.21.99:9591/blog/approvemail/${selectedPostId}`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setapproved(!approved);
    } catch (error) {
      console.error('Error approving post:', error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div>
        <div style={{ width: "100%", display: "flex", justifyContent: "center", fontSize: '28px', marginBottom: "20px" }}>Pending Blogs</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", padding: "20px" }}>
          {blogs.map((blog, index) => (
            <Card className={styles.card} key={index}>
              <CardHeader
                header={<Body1 style={{ width: "100%" }}>
                  <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <b>{blog.postId}</b>
                  </div>
                  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <h3 style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "300px", overflow: "hidden" ,minHeight:"30px"}}>
                      {blog.title}
                    </h3>
                  </div>
                </Body1>}
              />
              <CardPreview style={{ marginTop:"-15px",display: "flex", justifyContent: 'center' }}>
              {blog.thumbnail&&(
              <img
                src={blog.thumbnail} // Use a default image if thumbnail is missing
                alt="Thumbnail"
                style={{ width: "40%", height: "40%" }}
              />
                )
                }
              </CardPreview>
              <CardFooter>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                  <Button icon={<EyeTrackingFilled fontSize={16} />} onClick={() => handlePreview(blog.postId)}>Preview</Button>
                  <DialogTrigger>
                    {selectedBlogContent !== null && (
                      <Dialog open={true} onDismiss={handleClose}>
                        <DialogSurface className={styles.rhzkxut}>
                          <DialogBody>
                            <DialogTitle>
                              <div style={{ display: "flex" }}>
                                <div>Blog Preview</div>
                                <Button style={{ marginLeft: "30px" }} icon={<EditFilled fontSize={16} />} onClick={handleapprovePost}>Approve</Button>
                              </div>
                            </DialogTitle>
                            <DialogContent style={{ marginTop: "20px", display: 'flex', justifyContent: "center" }} className={styles.modalContent}>
                              <div dangerouslySetInnerHTML={{ __html: selectedBlogContent }} />
                            </DialogContent>
                            <DialogActions>
                              <Button appearance="primary" onClick={handleClose}>Close</Button>
                            </DialogActions>
                          </DialogBody>
                        </DialogSurface>
                      </Dialog>
                    )}
                  </DialogTrigger>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
