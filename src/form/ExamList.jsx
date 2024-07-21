import React, { useEffect,useState,Fragment } from "react";
import {useNavigate,redirect} from 'react-router-dom';
import {
  Button,Table,
  Spin,
  notification,Popconfirm
} from 'antd';
import TableService from "../util/tableService";

const openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

function ExamList() {
    const navigate = useNavigate();
    const [user, setUser]=useState([]);
    const [xiaofang,setXiaofang]=useState(false);
    const [isLoading, setIsLoading]=useState(false);
    const subject=localStorage.getItem("branchDetail");


    const editRecord = (record)=>{
      localStorage.setItem("examRecord",JSON.stringify(record));
      navigate('/nav/exam/edit');
    }
    const deleteOneRecord = async (id)=>{
      try{
        await TableService.delOneExam(id);
        setXiaofang(x=>!x);
        openNotificationWithIcon("success","删除试卷记录成功");
      }catch(ex){
        openNotificationWithIcon("error","删除试卷记录异常,请联系管理员");
      }
    }
    const columns = [
        {
          title: '何种试卷(可点击)',
          dataIndex: 'title',
          key: 'title',
          // render: (text) => <span style={{color:'red'}}>{text}</span>,
          // 跳转详情页
          render: (text, record) => {
            
            return <a onClick={()=>{
                localStorage.setItem("examRecord",JSON.stringify(record));
                navigate('/nav/exam/detail');
            }}>
                {text}
            </a>
            }
        },
        {
          title: '卷型',
          dataIndex: 'examType',
          key: 'examType',
        },
        {
          title: '分数',
          dataIndex: 'score',
          key: 'score',
        },
        {
          title: '照片',
          // dataIndex: 'mjddyz',
          key: 'photo',
          render: (_,record) => (<span> {record.mjddyz.length>0 ? record.mjddyz.length+'张' : '无图无真相'} </span>),
        },
        {
          title: '考试日',
          dataIndex: 'examDate',
          key: 'examDate',
        },
        {
          title: '难易度',
          dataIndex: 'easy',
          key: 'easy',
        },
        {
          // reuse the perfect code of lagacy project fujitsu
          title: 'Action',
          className:'laoyaoziling',
          key: 'action',
          render: (text, record) => (
            <Fragment>
              <Popconfirm
                title={`删除 ${record.title}`} 
                description="你确定真的要删除吗?"
                onConfirm={() => deleteOneRecord(record.id)} okText='确定' cancelText='取消'
              >
                <Button type="primary" danger style={{fontSize:'12px'}}>删除</Button>
              </Popconfirm>

              <Button style={{marginLeft: '5px',backgroundColor:'green',fontSize:'12px'}} type='primary' onClick={() => editRecord(record)}>修改</Button>
            </Fragment>
          ),
        }                
];

  useEffect( ()=>{
    const zpddyz = async ()=> {
        try{
          setIsLoading(true);
          const res = await TableService.getAllExam(subject);
          // console.log(res.data);
          setUser(res.data);
          setIsLoading(false);
        } catch(err){
          setIsLoading(false);
          openNotificationWithIcon("error","获取后台试卷数据出错,请联系管理员")
          // setIsLoading(true);
          // console.log(err);
        }
    };
    zpddyz();
  },[xiaofang]);

  const getRowClassName = (_, index) => {
    let className = ''
    // oddRow 和 evenRow为我们css文件中的样式名称
    className = index % 2 === 0 ? "oddRow" : "evenRow"
    return className
  }

  return (
    <>
    <h1>{localStorage.getItem("branchDetail")}</h1>
    <div style={{background:'white'}}>
          {isLoading ?
          <>
            <h2>正在获取以往记录...</h2>
            <Spin style={{marginLeft:'23rem'}} size="large"/> 
          </>
          : 
          <>
            {/* <h2>光辉的足迹</h2> */}
            <Table columns={columns} 
              dataSource={user} 
              rowClassName={getRowClassName}  
              rowKey={rec=>rec.id} 
              />
          </>
          }
          <div style={{display:'flex',justifyContent:'center'}}>
            <Button style={{width:'8rem',marginTop:'1rem',marginBottom:'2rem'}}  type="primary" onClick={()=>navigate('/nav/exam/input')}>
              我要追加
            </Button>
          </div>
    </div>
    </>
  );
}
export default ExamList;