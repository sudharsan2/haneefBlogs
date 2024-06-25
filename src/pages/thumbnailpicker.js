// import React from 'react';
// import { UploadOutlined } from '@ant-design/icons';
// import { Button, Upload } from 'antd';
// import './thumbnailpicker.css'
// const fileList = [
//   {
//     uid: '0',
//     name: 'xxx.png',
//     status: 'uploading',
//     percent: 33,
//   },
//   {
//     uid: '-1',
//     name: 'yyy.png',
//     status: 'done',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   },
//   {
//     uid: '-2',
//     name: 'zzz.png',
//     status: 'error',
//   },
// ];
// const App = () => (
//   <>
   
//     <Upload
//     //   action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
//       listType="picture"
//     //   defaultFileList={[...fileList]}
//       className="upload-list-inline"
//     >
//       <Button icon={<UploadOutlined />}>Upload</Button>
//     </Upload>
//   </>
// );
// export default App;


import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import './thumbnailpicker.css';
import axios from 'axios';

const App = () => {
  const [fileList, setFileList] = useState([]);

  const handleChange = (info) => {
    // Update the file list state without uploading
    setFileList([...info.fileList]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files', file.originFileObj);
    });

    try {
      const response = await axios.post('https://your-upload-api-endpoint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      message.success('Upload successful!');
      console.log('Response:', response.data);
      setFileList([]); // Clear the file list after successful upload
    } catch (error) {
      message.error('Upload failed.');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Upload
        listType="picture"
        fileList={fileList}
        onChange={handleChange}
        beforeUpload={() => false} // Prevent automatic upload
        className="upload-list-inline"
      >
        <Button icon={<UploadOutlined />}>Select Files</Button>
      </Upload>
      {/* <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        style={{ marginTop: 16 }}
      >
        Upload to API
      </Button> */}
    </>
  );
};

export default App;
