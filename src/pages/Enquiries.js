import React, {  useEffect, useState } from 'react';
import {Stack, Nav } from '@fluentui/react';
import {useSelector, useDispatch} from 'react-redux';
import
{ format, parseISO }
from
'date-fns'
;
import axios from 'axios';
import PendingBlogsInsideDrawer from './pendingBlogInsideDrawer';
import ApprovedBlogsInsideDrawer from './ApprovedBlogsInsideDrawer'
import PublishedBlogsInsideDrawer from './PublishedBlogsInsideDrawer'

import PendingMailsInsideDrawer from './pendingMailsInsideDrawer';
import ApprovedMailsInsideDrawer from './ApprovedMailsInsideDrawer';
import PublishedMailsInsideDrawer from './PublishedMailsInsideDrawer';

import {
  makeStyles,
  Field,
  Textarea,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableSelectionCell,
  
  SearchBox,
  // Field,
  // Textarea,
  // Rating,
  Checkbox,
  DrawerProps,
  Avatar,
  Text,
  Link,
  createTableColumn,
  useTableFeatures,
  useTableSort,
  Option,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbProps,
  useId,
  Breadcrumb,
  Tab,
  TabList,
  Dropdown,
  
} from "@fluentui/react-components";
import { OverlayDrawer, DrawerHeader, DrawerHeaderTitle, DrawerBody } from '@fluentui/react-drawer';
// import {
//   Button,
//   Checkbox,
//   SearchBox,
//   Text,
// } from "@fluentui/react-components";
import {AddRegular, PersonDeleteRegular , EditRegular, SearchRegular, FilterRegular, FilterDismissRegular, FilterAddRegular, ChartMultipleFilled,ChartMultipleRegular,Dismiss24Regular ,Timer20Regular,Calendar20Regular, ArrowDownRegular, ArrowClockwiseRegular,ShareMultiple24Filled ,Add24Filled,ShareIos24Filled,CheckmarkCircleFilled  } from "@fluentui/react-icons"; // Import the icons
import './page.css';
import zIndex from "@mui/material/styles/zIndex";


import {Modal, Form, Input, DatePicker, Select,  Row, Col, message, notification ,Descriptions,Button,Card, List} from 'antd';
 
const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '50px 20px',
    rowGap: '20px',
  },
  controls: {
    display: 'flex',
    // gap: '20px',
    marginBottom: '20px',
  },
  searchInputContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  searchInput: {
    flexGrow: 1,
  },
  iconLarge: {
    fontSize: '24px',
    paddingRight: '10px',
    color: 'rgb(1, 105, 185)',
  },
  container: {
    display: 'grid',
    gap: '15px',
    marginTop: '3vh',
    fontFamily: 'Arial, sans-serif',
    marginLeft: '3vw',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  gridrow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  row: {
    display: 'flex',
    width: '100%',
  },
  editDetails: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#0078d4',
  },
  formDetails: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#0078d4',
  },
  formLink: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      color: '#0169b9'
  },
  editIcon: {
    marginRight: '5px',
  },
  reviewerLink: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color:'#0169b9'
  },
  reviewerDetails: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#0078d4',
  },
  shareLink: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color:'rgb(1,105,185)'
  },
  shareDetails: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#0078d4',
  },
  uploadIcon: {
    marginRight: '5px',
  },
  filterPanel: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridTemplate1: {
    gridTemplateColumns: '1fr 1fr',
    gridTemplateAreas: `
      "nameAndId managerInfo"
      "name empid"
      "email doj"
      "status dos"
      "role appraisal"
      "dept totalExperience"
      "editDetails focusRExperience"
    `,
  },
  // gridTemplate2: {
  //   gridTemplateColumns: '1fr 1fr',
  //   gridTemplateAreas: `
  //     "nameAndId formLink"
  //     "email doj"
  //     "status dos"
  //     "role appraisal"
  //     "dept reviewer"
  //     "editDetails share"
  //   `,
  // },
  content: {
    fontSize: '13px',
    marginLeft: '10px'
  },
  uploadIcon: {
    marginRight: '5px'
  },

  filterPanel:{
    display:'flex',
    flexDirection:'column',
  }
});



const labels = {
  'Attendance & Punctuality':'attendance_and_punctuality',
  'Technical Skills (Effectiveness with which you apply job knowledge and skill to tasks)':'technical_skills',
  'Quality of work (Comprehensive, accurate, thorough, professional, timely etc)':"quality_of_work",
  "New Knowledge (Seek new knowledge, apply it to your job and share it with others)":"new_knowledge",
  "Utilization and Productivity (Make full use of time.  Seek additional work if underutilized)":"utilization_and_productivity",
  "Time Management & Organizational Skills (Organize, plan, and forecast work skillfully and accurately.  Effective prioritization.  Meet deadlines or communicate early if will not be met.)":"organize_plans",
  "Interpersonal Skills (Positive attitude, work and communicate well with others)":"interpersonal_skills",
  "Communication - Verbal & Written (Communicate knowledge clearly, accurately and thoroughly.  Document work effectively and create procedures)":"communication",
  "Initiative, Innovation & Creativity (Actively seek improvements & challenge status quo in appropriate ways.  Contribute new ideas.  Analyze problems and present solutions)":"initiative_innovative_creativity",
  "Teamwork (Co-ordinate own work with others, seek opinions from team members, share information willingly)":"teamwork",
  "Client Focused (Actively seek to understand clients business issues, provide quality service to achieve client satisfaction)":"client_focused",
  "Planning and Organizational Skills (Organizing, planning and monitoring of work skillfully and accurately; able to effectively prioritize tasks; meets deadlines or communicates need to revise schedule ahead of time)":"planning_and_organizing",
  // Add more labels as needed
};

const Enquiries = (props) => {
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = React.useState("tab1");
  // const [selectedTab1, setSelectedTab1] = React.useState("tab1")
  const [selectedItems, setSelectedItems] = React.useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const lighttheme = useSelector((state) => state.theme.light);
  const darktheme = useSelector((state) => state.theme.dark);
  const themestate = useSelector((state) => state.theme.theme);
  const newSelectedFilters = [];
  const [open, setOpen] = React.useState(false);
  const [selectedTab1, setSelectedTab1] = React.useState('tab1');
  const [selectedTab2, setSelectedTab2] = React.useState('tab1');

  const [inputValue, setInputValue] = useState('');

  // const [value, setValue] = useState(4);
  
  // const [selectedOptions, setSelectedOptions] = useState(Array(labels.length).fill(0));

  // const [selectedNavKey, setSelectedNavKey] = useState('option1');

  const [addedDetails, setaddedDetails] = React.useState([]);
 
  const [filteredData, setFilteredData] = useState([]);
  
  const [copied, setCopied] = React.useState(false);

  const [isModalVisible,setIsModalVisible] = useState(false);
  


  const [areFieldsFilled1, setAreFieldsFilled1] = useState(false);
  const [areFieldsFilled3, setAreFieldsFilled3] = useState(false);
  const [areFieldsFilled4, setAreFieldsFilled4] = useState(false);
  const [filledStatus, setFilledStatus] = useState(Array(labels.length).fill(false));
  const [submitted1, setSubmitted1] = useState(false);
  const [submitted2, setSubmitted2] = useState(false);
  const [submitted3, setSubmitted3] = useState(false);
  const [submitted4, setSubmitted4] = useState(false);

  const [sortState, setSortState] = useState({
    sortDirection: 'ascending',
    sortColumn: 'empid',
  });
 const [data, setData] = useState([])
 
 const [currentMonthEmployees, setCurrentMonthEmployees] = useState([]);
  const [nextMonthEmployees, setNextMonthEmployees] = useState([]);
  const [itemSelected, setItemSelected] = useState([]);
  const [edit,setEdit] = useState(false);
 
  const [modalVisible, setModalVisible] = useState(false);
  const [editmodalVisible, setEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [options, setOptions] = useState([]);
  const [options1, setOptions1] = useState([{"id":1,"username":"Admin"},{"id":2,"username":"blogger"}]);

  const [options2, setOptions2] = useState([]);

  const [DeleteUsers,SetDeleteUsers] = useState([]);


  const [activeOptionId, setActiveOptionId] = useState("");
  const [activeOptionId1, setActiveOptionId1] = useState("");
  const [activeOptionId2, setActiveOptionId2] = useState("");
  const [activeOptionId3, setActiveOptionId3] = useState("");
  const [selectedNavKey, setSelectedNavKey] = useState('option1');
  const [value, setValue] = useState(4);
  const [originalempId, setoriginalempId] = useState("");

  const [counter, setcounter] = useState(0);
  const [refreshfromdelete, setrefreshfromdelete]= useState(false)

  const [formdataemployee,setformdataemployee] = useState({});
  const [initialValues, setInitialValues] = useState({});


//   useEffect(() => {
//     if (selectedItems.length > 0) {
//       const selectedEmpId = selectedItems[0];
//       const selectedEmployee = data.find(emp => emp.empId === selectedEmpId);
//       if (selectedEmployee) {
//         const newInitialValues = {
//           empId: selectedEmployee.empId,
//           name: selectedEmployee.name,
//           email: selectedEmployee.email,
//           username: selectedEmployee.username,
//           reviewer: selectedEmployee.roles,
//           password: selectedEmployee.password,
//         };
        
//         setInitialValues(newInitialValues);
//         form.setFieldsValue(newInitialValues);
//         console.log("Selected Employee:", selectedEmployee); // Debugging step
//         console.log("Initial Values Set:", newInitialValues); // Debugging step
//       }
//     }
//   }, [selectedItems, data, form]);

  const handleCheckboxChange = (event, empId) => {
    event.stopPropagation();
    handleItemsChange(empId);
    SetDeleteUsers(prevDeleteUsers => [...prevDeleteUsers, empId]); 
    // if (counter ===0){
    //     setoriginalempId(empId)
    // };
    console.log("clicked")
    setOpen(false);
    setcounter(counter+1)
  };

  const userInfo = selectedEmployee ? [
    { label: 'ID', value: selectedEmployee.id },
    { label: 'Full Name', value: selectedEmployee.full_Name },
    { label: 'Email', value: selectedEmployee.email },
    { label: 'About', value: selectedEmployee.about },
    { label: 'Type', value: selectedEmployee.type }
  ] : [];

  // const navLinkGroups = [
  //   {
  //     links: [
  //       { name: 'Review of KPI', key: 'option1' },
  //       { name: 'Review of other skills', key: 'option2' },
  //       { name: 'Organization Feedback', key: 'option3' },
  //       { name: 'Training Need Analysis', key: 'option4' },
  //     ],
  //   },
  // ];

  // const getNavLinkStyle = (key) => {
  //   let backgroundColor = themestate ? "rgb(51, 51, 51)" : "";
  //   if (key === selectedNavKey) {
  //     backgroundColor = "red";
  //   }
  //   return { backgroundColor };
  // };

  // const handleNavClick = (ev, item) => {
  //   setSelectedNavKey(item.key);
  // };

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedOptions, setSelectedOptions] = useState(Array(labels.length).fill(0));

// Handler function to update selected option for a label

  // useEffect(() => {
  //   const currentDate = new Date();
  //   const currentMonth = currentDate.getMonth(); // 0-based index, January is 0
  //   const nextMonth = (currentMonth + 1) % 12;
 
  //   axios.get('http://172.235.21.99:5051/user/employee/list')
  //     .then(response => {
  //       setData(response.data);
  //     })
  //     .catch(error => {
  //       console.error('There was an error fetching the data!', error);
  //     });
 
  //   const currentMonthList = data.filter(employee => {
  //     const joiningDate = parseISO(employee.date_of_joining);
  //     return joiningDate.getMonth() === currentMonth;
  //   });
   
   
   
  //   const nextMonthList = data.filter(employee => {
  //     const joiningDate = parseISO(employee.date_of_joining);
  //     return joiningDate.getMonth() === nextMonth;
  //   });
 
  //   setCurrentMonthEmployees(currentMonthList);
  //   setNextMonthEmployees(nextMonthList);
 
 
  // }, []);
  const dropdownId = useId("dropdown");


  const navLinkGroups = [
    {
      links: [
        { name: 'Review of KPI', key: 'option1' },
        { name: 'Review of other skills', key: 'option2' },
        { name: 'Organization Feedback', key: 'option3' },
        { name: 'Training Need Analysis', key: 'option4' },
  
      ],
    },
  ];

  const getNavLinkStyle = (key) => {
    let backgroundColor = themestate ? "rgb(51, 51, 51)" : "";
    if (key === selectedNavKey) {
      if (key === 'option1') {
        backgroundColor = submitted1 && !areFieldsFilled1 ? "rgb(51, 51, 51)" : "red";
      } else if (key === 'option2') {
        backgroundColor = submitted2 && !filledStatus ? "rgb(51, 51, 51)" : "red";
      } else if (key === 'option3') {
        backgroundColor = submitted3 && !areFieldsFilled3 ? "rgb(51, 51, 51)" : "red";
      } else if (key === 'option4') {
        backgroundColor = submitted4 && !areFieldsFilled4 ? "rgb(51, 51, 51)" : "red";
      }
    }
    return { backgroundColor };
  };

  const handleNavClick = (ev, item) => {
    setSelectedNavKey(item.key);
  };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://172.235.21.99:5051/user/managerlist");
//         setOptions(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

  const handleChange = (event, data) => {
    props.form.setFieldsValue({ manager: data.optionValue });
  };



  

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://172.235.21.99:5051/user/reviewerlist");
//         setOptions1(response.data);
//         console.log({"response":response.data});
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://172.235.21.99:5051/user/departmentlist");
//         setOptions2(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

  const handleChange1 = (event, data) => {
    props.form.setFieldsValue({ reviewer: data.optionValue });
  };

 
  useEffect(() => {
    fetchEmployeeData();
  }, []);
  
  useEffect(() => {
    // fetchEmployeeData1();
  }, [addedDetails,refreshfromdelete]);

  const fetchEmployeeData = () => {
    const accessToken = localStorage.getItem("accessToken");
    axios.get('https://focusrapi.focusrtech.com:83/retreiveEnquiries',{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        setData(response.data);
        console.log({"data1": response.data})
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  };

  const fetchEmployeeData1 = () => {
    const accessToken = localStorage.getItem("accessToken");
    setTimeout(() => {
      axios.get('http://172.235.21.99:9591/blog/userlist',{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(response => {
          setData(response.data);
          console.log({"data1": response.data})
        })
        .catch(error => {
          console.error('There was an error fetching the data!', error);
        });
    }, 2000); // 2000 milliseconds = 2 seconds
  };
  
 
//   useEffect(() => {
//     if (data.length > 0) {
//       const currentDate = new Date();
//       const currentMonth = currentDate.getMonth(); // 0-based index, January is 0
//       const nextMonth = (currentMonth + 1) % 12;
 
//       const currentMonthList = data.filter(employee => {
//         const joiningDate = parseISO(employee.date_of_joining);
//         return joiningDate.getMonth() === currentMonth;
//       });
 
//       const nextMonthList = data.filter(employee => {
//         const joiningDate = parseISO(employee.date_of_joining);
//         return joiningDate.getMonth() === nextMonth;
//       });
 
//       setCurrentMonthEmployees(currentMonthList);
//       setNextMonthEmployees(nextMonthList);
//     }
//   }, [data]);
 
  // useEffect(() => {
  //   axios.get('http://172.235.21.99:5051/user/employee/list')
  //     .then(response => {
  //       setData(response.data);
  //     })
  //     .catch(error => {
  //       console.error('There wevent, data1as an error fetching the data!', error);
  //     });
  // }, []);
 
 
  const handleTabSelect = (event,data) => {
    setSelectedTab1(data.value);
  };
 
 
 
 
  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleEditModalClose = () => {
    setIsModalVisible(false);
  };
 
 
  const handleTabSelect2 = (event,data) => {
    console.log({"currentmonth":currentMonthEmployees})
    setSelectedTab2(data.value);
  };
  const handleTabSelect1 = (value) => {
    setSelectedTab1(value);
  };
 
  const handleTabChange = (event, data) => {
    setSelectedTab(data.value);
    setSelectedItems({});
   
   
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
 
 
  const handleItemsChange = (id) => {
    setSelectedItems((prev) => {
      const newSelectedItems = {
        ...prev,
        [id]: !prev[id],
      };
 
      // Update the array of true selected IDs based on the new selectedItems state
      const newTrueSelectedIds = Object.keys(newSelectedItems).filter(
        (key) => newSelectedItems[key] === true
      );
 
      // Update the itemSelected state with the new array of true selected IDs
      setItemSelected(newTrueSelectedIds);

      if (newTrueSelectedIds.length > 0) {
        const selectedEmpId = newTrueSelectedIds[0];
        const selectedEmployee = data.find(emp => emp.empId === selectedEmpId);
        console.log("change", selectedEmployee)
        if (selectedEmployee) {
          const newInitialValues = {
            empId: selectedEmployee.empId,
            name: selectedEmployee.name,
            email: selectedEmployee.email,
            username: selectedEmployee.username,
            // reviewer: selectedEmployee.roles,
            password: selectedEmployee.password,
          };

          setoriginalempId(selectedEmployee.empId)
          setInitialValues(newInitialValues);
          formEdit.setFieldsValue(newInitialValues);
          console.log("Selected Employee:", selectedEmployee); // Debugging step
          console.log("Initial Values Set:", newInitialValues); // Debugging step
        }
      }

      console.log({"selectedItems":newTrueSelectedIds})
 
      return newSelectedItems;
    });
  };
 
 
 
 
  const handleItemSelect = (id) => {
    {setItemSelected((prev) => ([...prev], [id]));}
  }
 
  const handleRowClick = async (employee) => {
    
    // setformdataemployee({ "question_1": "blahhhhh" });
    setSelectedEmployee(employee);
    setIsModalVisible(true)
   
  };
 
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value || '');
  };
 
 
  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };
 
  const handleRemoveFilters = () => {
    setSearchQuery("");
    // Handle resetting other filter options as needed
  };
 
 
  const handleApplyFilters = () => {
    setSelectedFilters(newSelectedFilters); // Update selected filters state
  };

  const onActiveOptionChange = React.useCallback(
    (_, data) => {
      setActiveOptionId(data?.nextOption?.value); 
      // Assuming optionValue is the id
      console.log({"active":data?.nextOption?.value})
    },
    [setActiveOptionId]
  );

  const onActiveOptionChange1 = React.useCallback(
    (_, data) => {
      setActiveOptionId1(data?.nextOption?.value); 
      // Assuming optionValue is the id
      console.log({"active":data?.nextOption?.value})
    },
    [setActiveOptionId1]
  );

  const onActiveOptionChange2 = React.useCallback(
    (_, data) => {
      setActiveOptionId2(data?.nextOption?.value); 
      // Assuming optionValue is the id
      console.log({"active":data?.nextOption?.value})
    },
    [setActiveOptionId2]
  );

  // const onActiveOptionChange3 = React.useCallback(
  //   (_, data) => {
  //     setActiveOptionId3(data?.nextOption?.value); 
  //     // Assuming optionValue is the id
  //     console.log({"active":data?.nextOption?.value})
  //     try {
  //       const result = await axios.post(`http://172.235.21.99:5051/user/employee/changeFormStatus/${parameter}`, {
  //         "status":"sharedtomanager"
  //       });
  //        // Extract and set the token from the response
  //     } catch (error) {
  //       console.error('Error sending data to the API', error);
  //     }
  //   },
  //   [setActiveOptionId1]
  // );
  
  const onActiveOptionChange3 = React.useCallback(
    async (_, data) => {
      const optionValue = data?.nextOption?.value;
      setActiveOptionId3(optionValue); // Assuming optionValue is the id
      console.log({ "active": optionValue });
  
      try {
        const result = await axios.post(`http://172.235.21.99:5051/user/employee/changeFormStatus/${optionValue}`, {
          "empId" : formdataemployee.employee_id,
          "status": "sharedtomanager"
        });
        // Handle result if needed
        console.log('API response:', result);
      } catch (error) {
        console.error('Error sending data to the API', error);
      }
    },
    [setActiveOptionId3] // Make sure to include `parameter` in the dependency array if it's from props or state
  );
  

  const handlesharetoManager = async (parameter) => {
    try {
      const result = await axios.post(`http://172.235.21.99:5051/user/employee/changeFormStatus/${parameter}`, {
        "status":"sharedtomanager"
      });
       // Extract and set the token from the response
    } catch (error) {
      console.error('Error sending data to the API', error);
    }
  };

  const handleShareLinkClick = async (parameter) => {
    try {
      const result = await axios.post('http://172.235.21.99:5051/user/form-links', {
        "empId": parameter, // Include the parameter in the request data
      });
      const token = result.data.token; // Extract the token from the response

      // Copy the token to the clipboard
      navigator.clipboard.writeText(`http://localhost:3000/form/${token}`).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 5000); // Reset copied state after 2 seconds
      }).catch((error) => {
        console.error('Error copying text to clipboard', error);
      });
    } catch (error) {
      console.error('Error sending data to the API', error);
    }
  };

  const columns = [
    createTableColumn({
      columnId: 'employee_id',
      compare: (a, b) => a.employee_id - b.employee_id,
    }),
    createTableColumn({
      columnId: 'employee_name',
      compare: (a, b) => a.employee_name.localeCompare(b.employee_name),
    }),
    createTableColumn({
      columnId: 'department',
      compare: (a, b) => a.department.localeCompare(b.department),
    }),
    createTableColumn({
      columnId: 'date_of_joining',
      compare: (a, b) => new Date(a.date_of_joining).getTime() - new Date(b.date_of_joining).getTime(),
    }),
    // createTableColumn({
    //   columnId: 'appraisal',
    //   compare: (a, b) => a.appraisal.localeCompare(b.appraisal),
    // }),
    createTableColumn({
      columnId: 'reporting_manager',
      compare: (a, b) => a.reporting_manager.localeCompare(b.reporting_manager),
    })
  ];
 
  const {
    sort: { getSortDirection, toggleColumnSort },
  } = useTableFeatures(
    {
      columns,
      items: data,
    },
    [
      useTableSort({
        sortState,
        onSortChange: (e, nextSortState) => setSortState(nextSortState),
      }),
    ]
  );
 
  const headerSortProps = (columnId) => ({
    onClick: (e) => toggleColumnSort(e, columnId),
    sortDirection: getSortDirection(columnId),
  });
 
 
  
 
  // const handleDeleteEmployee = () => {
  //   alert("Delete Employee functionality to be implemented");
  // };
 
  const handleDeleteEmployee = async () => {
    console.log(JSON.stringify({ ids: itemSelected }));
    try {
        const response = await axios.post(`http://172.235.21.99:9591/blog/deleteusers`, DeleteUsers, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
 
      if (response.status === 200 || response.status === 201) {
       
        // Clear the selectedItems state
        message.success(
             "You have successfully Delete the User.",
          );
        setSelectedItems({});
        // Optionally clear the itemSelected state
        setrefreshfromdelete(!refreshfromdelete)
        setItemSelected([]);
        fetchEmployeeData();
      } else {
        // alert('Failed to delete employees');
        message.error(
            "An error occurred during Deletion.",
         );
        
      }
    } catch (error) {
        message.error(
            "An error occurred during Deletion.",
         );
      // alert('An error occurred while deleting employees');
    }
  };

  const handleEditEmployee1 = async () => {
    console.log(JSON.stringify({ ids: itemSelected }));
    try {
      const response = await fetch(`http://172.235.21.99:5051/user/employee/${itemSelected}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: itemSelected }),
      });
 
      if (response.ok) {
       
        // Clear the selectedItems state
        setSelectedItems({});
        // Optionally clear the itemSelected state
        setItemSelected([]);
        fetchEmployeeData();
      } else {
        // alert('Failed to delete employees');
      }
    } catch (error) {
      console.error('Error deleting employees:', error);
      // alert('An error occurred while deleting employees');
    }
  };
 
 
 
  const handleAddEmployee = async (values) => {
    console.log('Form values:', values);
  
    // Helper function to extract the date part from an ISO string
    const getDateOnly = (isoString) => {
      if (typeof isoString === 'string') {
        return isoString.split('T')[0];
      } else if (isoString instanceof Date) {
        return isoString.toISOString().split('T')[0];
      }
      console.log(isoString)
      return isoString; // Return as is if it's neither a string nor a Date
    };
  
    // Update the date fields with the date-only part
    // values.appraisal_date = getDateOnly(values.appraisal_date);
    // values.date_of_joining = getDateOnly(values.date_of_joining);
    // values.date_of_reporting = getDateOnly(values.date_of_reporting);
    values.dob = getDateOnly(values.dob);

    

    const empdetails = {...values,"roles":activeOptionId1}
    setaddedDetails(empdetails)
    try {
      const response = await axios.post('http://172.235.21.99:9591/blog/register', empdetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        message.success('Employee added successfully');
        setModalVisible(false); // Close modal after submission
        form.resetFields(); // Reset form fields
      } else {
        message.error('Failed to add employee');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      message.error('An error occurred');
    }
  };


  const handleEditEmployee = async (values) => {
    console.log('Form values:', values);
  
    // Helper function to extract the date part from an ISO string
    const getDateOnly = (isoString) => {
      if (typeof isoString === 'string') {
        return isoString.split('T')[0];
      } else if (isoString instanceof Date) {
        return isoString.toISOString().split('T')[0];
      }
      console.log(isoString)
      return isoString; // Return as is if it's neither a string nor a Date
    };
  
    // Update the date fields with the date-only part
    // values.appraisal_date = getDateOnly(values.appraisal_date);
    // values.date_of_joining = getDateOnly(values.date_of_joining);
    // values.date_of_reporting = getDateOnly(values.date_of_reporting);
    values.dob = getDateOnly(values.dob);

    

    const empdetails = {...values,"roles":activeOptionId1}
    setaddedDetails(empdetails)
    try {
      const response = await axios.post(`http://172.235.21.99:9591/blog/updateuser/${originalempId}`, empdetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        message.success('User updated successfully');
        setModalVisible(false); // Close modal after submission
        form.resetFields(); // Reset form fields
        setEditModalVisible(false);
      } else {
        message.error('Failed to update user');
        
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      message.error('An error occurred');
      
    }
  };
  
  
  
    

   
 
 
 
 
 
  const handleFilterToggle = () => {
    setShowFilters((prev) => !prev);
  };
 
 
  // const filteredData = searchQuery
  // ? (data || []).filter((item) =>
  //     (item.employee_name && item.employee_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
  //     (item.employee_id && item.employee_id.toString().includes(searchQuery)) ||
  //     (item.department && item.department.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
  //     (item.date_of_joining && item.date_of_joining.includes(searchQuery)) ||
  //     // Uncomment if 'appraisal' is part of the dataset and needs to be searched
  //     // (item.appraisal && item.appraisal.toLowerCase().includes(searchQuery.toLowerCase())) ||
  //     (item.reporting_manager && item.reporting_manager.toLowerCase().includes(searchQuery.toLowerCase()))
  //   )
  // : (data || []);


  useEffect(() => {
    const filterData = () => {
      if (searchQuery) {
        const filtered = (data || []).filter((item) =>
          (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.empId && item.empId.toString().includes(searchQuery)) ||
          (item.email && item.email.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.username && item.username.includes(searchQuery)) 
        //   (item.reporting_manager && item.reporting_manager.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(data || []);
        console.log({"data":data})
      }
      
    };

    filterData();
  }, [data]);
 
const sortedData = [...filteredData].sort((a, b) => {
  const aValue = a[sortState.sortColumn];
  const bValue = b[sortState.sortColumn];
 
  // Check if the values are strings and perform locale comparison
  if (typeof aValue === 'string' && typeof bValue === 'string') {
    return sortState.sortDirection === 'ascending'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  }
 
  // If the values are not strings, compare them directly
  return sortState.sortDirection === 'ascending' ? aValue - bValue : bValue - aValue;
});
 
const filteredcmData = searchQuery
  ? (data || []).filter((item) =>
      (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.empId && item.empId.toString().includes(searchQuery)) ||
      (item.email && item.email.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.username && item.username.includes(searchQuery)) 
      // Uncomment if 'appraisal' is part of the dataset and needs to be searched
      // (item.appraisal && item.appraisal.toLowerCase().includes(searchQuery.toLowerCase())) ||
    //   (item.reporting_manager && item.reporting_manager.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  : (data || []);
 
const sortedcmData = [...filteredcmData].sort((a, b) => {
  const aValue = a[sortState.sortColumn];
  const bValue = b[sortState.sortColumn];
 
  // Check if the values are strings and perform locale comparison
  if (typeof aValue === 'string' && typeof bValue === 'string') {
    return sortState.sortDirection === 'ascending'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  }
 
  // If the values are not strings, compare them directly
  return sortState.sortDirection === 'ascending' ? aValue - bValue : bValue - aValue;
});
 
const filterednmData = searchQuery
  ? (nextMonthEmployees || []).filter((item) =>
      (item.employee_name && item.employee_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.employee_id && item.employee_id.toString().includes(searchQuery)) ||
      (item.department && item.department.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.date_of_joining && item.date_of_joining.includes(searchQuery)) ||
      // Uncomment if 'appraisal' is part of the dataset and needs to be searched
      // (item.appraisal && item.appraisal.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.reporting_manager && item.reporting_manager.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  : (nextMonthEmployees || []);
 
const sortednmData = [...filterednmData].sort((a, b) => {
  const aValue = a[sortState.sortColumn];
  const bValue = b[sortState.sortColumn];
 
  // Check if the values are strings and perform locale comparison
  if (typeof aValue === 'string' && typeof bValue === 'string') {
    return sortState.sortDirection === 'ascending'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  }
 
  // If the values are not strings, compare them directly
  return sortState.sortDirection === 'ascending' ? aValue - bValue : bValue - aValue;
});
 
 
 
 
 
   
return (
    <div className={styles.root}>
 
        {/* <div style={{position:'fixed', backgroundColor:'white', zIndex:1000, width:'vw'}}> */}
        {/* <div style={{ position: 'fixed', backgroundColor: 'white', zIndex: 1000, width: '100%' }}> */}
       
        
 
 
        {/* <Breadcrumb aria-label="breadcrumb">
    <BreadcrumbItem>
      <Link href="" className="custom-link">HR</Link>
    </BreadcrumbItem>
    <BreadcrumbDivider />
    <BreadcrumbItem>
      <Link href="/hremployee" className="custom-link">Employee</Link>
    </BreadcrumbItem>
   
   
  </Breadcrumb> */}
        <h2 style={themestate?{color:'white'}:{}}>Enquiries</h2>
      {/* <TabList
        defaultSelectedValue='tab1'
        appearance="subtle"
        onTabSelect={handleTabSelect2}
        style={themestate?{color:'white'}:{}}
      >
        <Tab    className={themestate ? "tab dark" : "tab"} style= {{border:'1px solid transparent'}} value="tab1">This month</Tab>
        <Tab  className={themestate ? "tab dark" : "tab"} style= {{border:'1px solid transparent'}} value="tab2">Next month</Tab>
        <Tab className={themestate ? "tab dark" : "tab"} style= {{border:'1px solid transparent'}} value="tab3">Employee</Tab>
        {/* <Tab value="tab3">Employee</Tab> */}
       
      {/* </TabList> */} 
      <div className={styles.controls}>
      {/* <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={() => setModalVisible(true)}><AddRegular className={styles.iconLarge}/>Add User</Button>
         <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleDeleteEmployee}><PersonDeleteRegular className={styles.iconLarge}/>Delete User</Button>
       <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={() => {
  setEditModalVisible(true);

}}
><EditRegular className={styles.iconLarge}/>Edit user</Button> */}
      <div>
      <Modal
        visible={modalVisible}
        className="modalcon"
        onCancel={handleModalClose}
        footer={null}
        style={{ borderRadius: '0px', paddingTop:20,  }}
        bodyStyle={{ borderRadius: 0 }}
      >
        {/* <Form form={form} onFinish={handleAddEmployee} style={{ borderRadius: 0, paddingTop: 20 }}>
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item label="Employee ID" name="empId">
        <Input
          style={{
            fontWeight: 'bold',
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
        />
      </Form.Item>
    </Col>
    <Col span={12}>
    <Form.Item label="Name" name="name">
        <Input
          style={{
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
        />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item label="Mail Id" name="email">
        <Input
          style={{
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
        />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label="UserName" name="username">
        <Input
          style={{
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
        />
      </Form.Item>
    </Col>
    
  </Row>
  <Row gutter={16}>
    
    
  </Row>
  <Row gutter={16}>
    
    
  </Row>
  <Row gutter={16}>
    
    
  </Row>
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item label="Role" name="reviewer">
        
        <Dropdown
        
          placeholder="select a Role"
          appearance="underline"
          style={{minWidth:"160px"}}
          onActiveOptionChange={onActiveOptionChange1}
          {...props}
        >
          {options1.map((option) => (
            <Option key={option.id} text={option.username} value={option.id}>
              {option.username}
            </Option>
          ))}
        </Dropdown>
      </Form.Item>
    </Col>
    <Col span={12}>
    <Form.Item label="Password" name="password">
        <Input
          style={{
            borderRadius: 0,
            border: 0,
            borderBottom: '1px solid rgb(180,180,180)',
          }}
        />
      </Form.Item>
    </Col>
  </Row>
  <Row>
    <Col span={24}>
      <Form.Item>
      
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Col>
  </Row>
</Form> */}
<Form form={form} onFinish={handleAddEmployee} style={{ borderRadius: 0, paddingTop: 20 }} initialValues={initialValues}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Employee ID" name="empId">
            <Input
              style={{
                fontWeight: 'bold',
                borderRadius: 0,
                border: 0,
                borderBottom: '1px solid rgb(180,180,180)',
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Name" name="name">
            <Input
              style={{
                borderRadius: 0,
                border: 0,
                borderBottom: '1px solid rgb(180,180,180)',
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Mail Id" name="email">
            <Input
              style={{
                borderRadius: 0,
                border: 0,
                borderBottom: '1px solid rgb(180,180,180)',
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="UserName" name="username">
            <Input
              style={{
                borderRadius: 0,
                border: 0,
                borderBottom: '1px solid rgb(180,180,180)',
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Role" name="reviewer">
            <Dropdown
              placeholder="select a Role"
              appearance="underline"
              style={{ minWidth: "160px" }}
              onActiveOptionChange={onActiveOptionChange1}
            >
              {options1.map((option) => (
                <Option key={option.id} text={option.username} value={option.id}>
                  {option.username}
                </Option>
              ))}
            </Dropdown>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Password" name="password">
            <Input
              type="password"
              style={{
                borderRadius: 0,
                border: 0,
                borderBottom: '1px solid rgb(180,180,180)',
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>

      </Modal>
    </div>

    <div>
      <Modal
        visible={editmodalVisible}
        className="modalcon"
        onCancel={handleEditModalClose}
        footer={null}
        style={{ borderRadius: '0px', paddingTop:20,  }}
        bodyStyle={{ borderRadius: 0 }}
      >
        
    <Form form={formEdit} onFinish={handleEditEmployee} style={{ borderRadius: 0, paddingTop: 20 }} initialValues={initialValues}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Employee ID" name="empId">
            <Input
              style={{
                fontWeight: 'bold',
                borderRadius: 0,
                border: 0,
                borderBottom: '1px solid rgb(180,180,180)',
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Name" name="name">
            <Input
              style={{
                borderRadius: 0,
                border: 0,
                borderBottom: '1px solid rgb(180,180,180)',
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Mail Id" name="email">
            <Input
              style={{
                borderRadius: 0,
                border: 0,
                borderBottom: '1px solid rgb(180,180,180)',
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="UserName" name="username">
            <Input
              style={{
                borderRadius: 0,
                border: 0,
                borderBottom: '1px solid rgb(180,180,180)',
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Role" name="reviewer">
            <Dropdown
              placeholder='select a Role'
              appearance="underline"
              style={{ minWidth: "160px" }}
            //   defaultSelectedOptions={formEdit.reviewer === 1 ? 1 : 22}
              onActiveOptionChange={onActiveOptionChange1}
            >
              {options1.map((option) => (
                <Option key={option.id} text={option.username} value={option.id}>
                  {option.username}
                </Option>
              ))}
            </Dropdown>
          </Form.Item>
        </Col>
        
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>

      </Modal>
    </div>

    <div>
    <Modal
        title="Enquiry Information"
        open={isModalVisible}
        onOk={handleEditModalClose}
        onCancel={handleEditModalClose}
        footer={[
            <Button key="back" onClick={handleEditModalClose}>
              Return
            </Button>,
            <Button key="submit" type="primary" onClick={handleEditModalClose}>
              OK
            </Button>,
          ]}
      >
        <Card>
          <List
            itemLayout="horizontal"
            dataSource={userInfo}
            renderItem={item => (
              <List.Item>
                <Row style={{ width: '100%' }}>
                  <Col span={6} style={{ fontWeight: 'bold' }}>
                    {item.label}:
                  </Col>
                  <Col span={18}>
                    {item.value}
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Card>
      </Modal>
    </div>
 
<SearchBox
              placeholder="Search..."
            style={ {backgroundColor: themestate ? "rgb(41,41,41)" : ""}}
            className={themestate && "searchboxicon searchboxinputtext searchboxinputplaceholder"}
            onChange={handleSearchChange}
              value={searchQuery}
              size='medium'
              appearance='filled-darker'
            />
        {/* <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleToggleFilters}><FilterRegular className={styles.iconLarge}/>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button> */}
 
 
      </div>
      {showFilters && (
        // <Modal header="Filters" onClose={handleFilterToggle}>
        <div className={styles.filterPanel}>
        <div style={{display:'flex'}}>
        <Checkbox label="Employee Fill" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
             <Checkbox label="Manager Fill" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
            <Checkbox label="Reviewer Fill" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
             <Checkbox label="Revised Fill" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
             <Checkbox label="Appraisal Done" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
             <Checkbox label="Choose Dept" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
             <Checkbox label="Choose Manager" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
             <Checkbox label="Choose Reviewer" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
             <Checkbox label="Date Cap" style={themestate?{color:'white', }:{}} onChange={()=>newSelectedFilters.push('Employee Fill')}/>
           
        </div>
        <div style={{display:'flex'}}>
        <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}}onClick={handleApplyFilters}> Apply </Button>
       <Button className={themestate ? "button dark" : "button"} style= {{border:'1px solid transparent'}} onClick={handleRemoveFilters}> Remove all</Button>
   </div>
        </div>
 
      )}
     
     <div style={{ maxHeight: '72vh', overflowY: 'auto' }}>
     {/* <Table>
      <TableHeader>
        <TableRow style={themestate ? { color: 'white', borderBottomColor: '#383838' } : {}}>
          <TableHeaderCell />
          <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('employee_id')}>Emp ID</TableHeaderCell>
          <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('employee_name')}>Name</TableHeaderCell>
          <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('department')}>Mail Id</TableHeaderCell>
          <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('date_of_joining')}>User name</TableHeaderCell>
          
          <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('reporting_manager')}>Role</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedcmData.map((item) => (
          <TableRow key={item.empId} style={themestate ? { color: 'white' } : {}} className={themestate ? "hovereffect dark" : "hovereffect"} onClick={() => handleRowClick(item)}>
            <TableSelectionCell
              checked={!!selectedItems[item.empId]}
              style={{ zIndex: 1000 }}
              onChange={(event) => {
                event.stopPropagation();
                handleItemsChange(item.empId);
                setOpen(false);
              }}
            />
            <TableCell>{item.empId}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.roles}</TableCell>
          </TableRow>
        ))}
     
        
      </TableBody>
    </Table> */}
    <Table>
      <TableHeader>
        <TableRow style={themestate ? { color: 'white', borderBottomColor: '#383838' } : {}}>
          <TableHeaderCell />
          <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('employee_id')}>ID</TableHeaderCell>
          <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('employee_name')}>Name</TableHeaderCell>
          <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('department')}>Mail Id</TableHeaderCell>
          <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('date_of_joining')}>About</TableHeaderCell>
          <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('reporting_manager')}>Enquiry Type</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedcmData.map((item) => (
          <TableRow
            key={item.empId}
            style={themestate ? { color: 'white' } : {}}
            className={themestate ? "hovereffect dark" : "hovereffect"}
            onClick={() => handleRowClick(item)}
          >
            <TableSelectionCell
              checked={!!selectedItems[item.empId]}
              style={{ zIndex: 1000 }}
              onClick={(event) => event.stopPropagation()} // Prevent row click
              onChange={(event) => handleCheckboxChange(event, item.empId)} // Handle checkbox change
            />
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.full_Name}</TableCell>
            <TableCell style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.email}</TableCell>
            <TableCell style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.about}</TableCell>
            <TableCell>{item.type}</TableCell>
            {/* {item.roles===1?(<TableCell>Admin</TableCell>):(<TableCell>Blogger</TableCell>)} */}
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
</div>
 
    </div>
  );
};
 
export default Enquiries;
 
