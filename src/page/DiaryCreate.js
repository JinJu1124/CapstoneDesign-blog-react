import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Navigation from '../component/Navigation'
import { Routes, Route, Link } from "react-router-dom";

//datepicker 불러오기
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

//editer 불러오기
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


//부트스트랩
import { Container, Form, Row, Col } from 'react-bootstrap';

//antd
import { UploadOutlined } from '@ant-design/icons';
import { Space, Upload, notification } from 'antd';
import { Axios } from 'axios';

//etc
import {useNavigate} from 'react-router-dom';
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";

const DiaryCreate = ({setNavVisible}) => {
  setNavVisible(true);
  //다이어리 날짜  
  const [created_at, setDate_time] = useState(new Date());

  //다이어리 title과 content
  const [diaryContent, setDiaryContent] = useState({
    title: '',
    content: ''
  })

  const navigate = useNavigate();

  //event가 생기면 값을 받아오는 것
  const getValue = (event) => {
    const { name, value } = event.target;
    setDiaryContent({
      ...diaryContent,
      [name]: value
    })
  }


  const onSubmit =async (event) => {
    event.preventDefault();
    console.log(created_at,diaryContent);

    let {title, content} = diaryContent;

    try {
      await Axios.post(`${process.env.REACT_APP_LOCAL_DJ_IP}post/create/`,{created_at, title, content})
      notification.open({
        message:"회원가입 성공",
        description:"로그인 페이지로 이동합니다.",
        icon:<SmileOutlined/>
      }); 
      navigate('/DiaryDetail')
    }
    catch(e){
      if(e.response){
        notification.open({
          message:"회원가입 실패",
          description:"아이디/비밀번호를 확인해주세요.",
          icon:<FrownOutlined/>
        })};
    }
  }



  return (
    <div>
      <Container>
        <Col>
          <Row className="mt-3"> <h2>일기 작성</h2></Row>

          <Row>
            <Col lg={9}><DatePicker selected={created_at} onChange={(date) => setDate_time(date)} /></Col>
            {/* <DatePicker defaultValue={moment({startDate}, dateFormat)} format={dateFormat} /> */}
          
          </Row>

          <Row>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="diaryCreateTitle">
                <Form.Control name='title' type="text" placeholder="제목" onChange={getValue} />
              </Form.Group>

              <CKEditor
                editor={ClassicEditor}
                // config={{editorConfiguration,
                // placeholder: "내용을 입력하세요."}}
                config={{
                  removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed", "Table", "TableToolbar", "BlockQuote"],
                  placeholder: "내용을 입력하세요."
                }}

                onReady={editor => {
                  console.log('Editor is ready to use!', editor);

                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDiaryContent({
                    ...diaryContent,
                    content: data
                  })

                }}
                onBlur={(event, editor) => {
                  //   console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  //   console.log('Focus.', editor);
                }}
              />
              <Upload
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76" 이미지 업로드 url
                listType="picture"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>이미지 올리기</Button>
              </Upload>

              <div className='mt-3'>
                {/* <Link to="/diary-detail"><Button type="submit" variant="info">저장</Button></Link> */}
                <Button type="submit" variant="info">저장</Button>
                <Link to="/diary-list"><Button variant="info">취소</Button></Link>
              </div>
            </Form>
          </Row>
        </Col>

      </Container>
    </div>

  )
}

export default DiaryCreate