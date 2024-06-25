import React, { useState, useCallback } from 'react';
import {
  makeStyles,
  Input,
  Textarea,
  Label,
  Button,
} from "@fluentui/react-components";
import { SaveRegular, DeleteRegular } from "@fluentui/react-icons";
import HtmlEditor, {
  Toolbar,
  MediaResizing,
  ImageUpload,
  Item,
} from 'devextreme-react/html-editor';
import CheckBox from 'devextreme-react/check-box';
import SelectBox from 'devextreme-react/select-box';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import Compressor from 'compressorjs';
import axios from 'axios';
import './thumbnailpicker.css';
import "./Newpost.css";
import {useSelector, useDispatch} from 'react-redux';


const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
    width: "80%",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  scrollableDiv: {
    height: "200px",
    overflowY: "scroll",
    border: "1px solid #ccc",
    padding: "10px",
  }
});

const tabs = [
  { name: 'From This Device', value: ['file'] },
  { name: 'From the Web', value: ['url'] },
  { name: 'Both', value: ['file', 'url'] },
];

const tabLabel = { 'aria-label': 'Tab' };

const fontValues = [
  'Arial',
  'Courier New',
  'Georgia',
  'Impact',
  'Lucida Console',
  'Tahoma',
  'Times New Roman',
  'Verdana',
];
const headerValues = [false, 1, 2, 3, 4, 5];
const fontSizeOptions = {
  inputAttr: {
    'aria-label': 'Font size',
  },
};
const fontFamilyOptions = {
  inputAttr: {
    'aria-label': 'Font family',
  },
};
const headerOptions = {
  inputAttr: {
    'aria-label': 'Font family',
  },
};

export default function App() {
  const styles = useStyles();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [footer, setFooter] = useState("");
  const [fileList, setFileList] = useState([]);
  const [editorValue, setEditorValue] = useState('');
  const [isMultiline, setIsMultiline] = useState(true);
  const [currentTab, setCurrentTab] = useState(tabs[2].value);
  const [base64, setBase64] = useState('');

  const collapsed = useSelector((state) => state.theme.collappse)

  const handleChange = ({ fileList }) => {
    setFileList([...fileList]);
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      new Compressor(file, {
        quality: 0.75, // Adjust the quality as needed
        success(result) {
          const reader = new FileReader();
          reader.readAsDataURL(result);
          reader.onloadend = () => {
            setBase64(reader.result);
          };
        },
        error(err) {
          console.error('Compression error:', err);
        },
      });
    } else {
      setBase64('');
    }
  };

  const beforeUpload = (file) => {
    return false; // Prevent automatic upload
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('content', editorValue);
    formData.append('title', title);
    formData.append('thumbnail', base64 || '');
    formData.append('footer', author);
    formData.append('author',footer)

    const forms = {'content': editorValue,
    'title': title,
    'thumbnail': base64,
    'footer': author,
    'author':footer
}


    console.log('thumbnail', base64);
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.post('http://172.235.21.99:9591/blog/saveblog', forms,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      message.success('Upload successful!');
      console.log('thumbnail', base64);
      setFileList([]);
    } catch (error) {
      message.error('Upload failed.');
      console.error('Error:', error);
    }
  };

  const handleReset = () => {
    setTitle("");
    setContent("");
    setAuthor("");
    setFileList([]);
    setBase64('');
    setFooter("");
  };

  const multilineChanged = useCallback((e) => {
    setIsMultiline(e.value);
  }, []);

  const currentTabChanged = useCallback((e) => {
    setCurrentTab(e.value);
  }, []);

  const onEditorValueChanged = useCallback((e) => {
    setEditorValue(e.value);
  }, []);

  return (
    <div style={collapsed?{ display: "flex", justifyContent: "center", overflowX: "scroll", width: "calc(100vw - 59px)" }:{ display: "flex", justifyContent: "center", overflowX: "scroll", width: "calc(100vw - 260px)" }}>
      <form className={styles.root} onSubmit={handleUpload}>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the blog title"
          required
        />

        <Label htmlFor="content">Content</Label>
        <div className="widget-container">
          <HtmlEditor
            height="725px"
            value={editorValue}
            onValueChanged={onEditorValueChanged}
          >
            <MediaResizing enabled={true} />
            <ImageUpload
              tabs={currentTab}
              fileUploadMode="base64"
            />
            <Toolbar multiline={isMultiline}>
              <Item name="undo" />
              <Item name="redo" />
              <Item name="separator" />
              <Item
                name="size"
                acceptedValues={sizeValues}
                options={fontSizeOptions}
              />
              <Item
                name="font"
                acceptedValues={fontValues}
                options={fontFamilyOptions}
              />
              <Item name="separator" />
              <Item name="bold" />
              <Item name="italic" />
              <Item name="strike" />
              <Item name="underline" />
              <Item name="separator" />
              <Item name="alignLeft" />
              <Item name="alignCenter" />
              <Item name="alignRight" />
              <Item name="alignJustify" />
              <Item name="separator" />
              <Item name="orderedList" />
              <Item name="bulletList" />
              <Item name="separator" />
              <Item
                name="header"
                acceptedValues={headerValues}
                options={headerOptions}
              />
              <Item name="separator" />
              <Item name="color" />
              <Item name="background" />
              <Item name="separator" />
              <Item name="link" />
              <Item name="image" />
              <Item name="separator" />
              <Item name="clear" />
              <Item name="codeBlock" />
              <Item name="blockquote" />
              <Item name="separator" />
              <Item name="insertTable" />
              <Item name="deleteTable" />
              <Item name="insertRowAbove" />
              <Item name="insertRowBelow" />
              <Item name="deleteRow" />
              <Item name="insertColumnLeft" />
              <Item name="insertColumnRight" />
              <Item name="deleteColumn" />
            </Toolbar>
          </HtmlEditor>
          <div className="options">
            <div className="caption">Options</div>
            <div className="option">
              <CheckBox
                text="Multiline toolbar"
                value={isMultiline}
                onValueChanged={multilineChanged}
              />
            </div>
            <div className="option">
              <div className="label">Image upload tabs:</div>
              <SelectBox
                items={tabs}
                value={currentTab}
                valueExpr="value"
                inputAttr={tabLabel}
                displayExpr="name"
                onValueChanged={currentTabChanged}
              />
            </div>
          </div>
        </div>

        <Label htmlFor="author" style={{ marginTop: "10px" }}>Thumbnail Image</Label>
        <div style={{ width: "100%" }}>
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={handleChange}
            beforeUpload={beforeUpload}
            className="upload-list-inline"
          >
            <Button icon={<UploadOutlined />}>Select Files</Button>
          </Upload>
        </div>

        <Label htmlFor="author" style={{ marginTop: "10px" }}>Footer</Label>
        <Input
          id="footer"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter the blog's Footer"
          required
        />

        <Label htmlFor="author" style={{ marginTop: "10px" }}>Author</Label>
        <Input
          id="footer"
          value={footer}
          onChange={(e) => setFooter(e.target.value)}
          placeholder="Enter author's name"
          required
        />

        <div className={styles.buttonGroup}>
          <Button
            type="submit"
            icon={<SaveRegular />}
            appearance="primary"
          >
            Save
          </Button>
          <Button
            type="button"
            icon={<DeleteRegular />}
            onClick={handleReset}
            appearance="secondary"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
