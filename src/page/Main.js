import React, { useState , useEffect} from 'react'
import Navigation from '../component/Navigation'
import { Routes, Route, Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import moment from 'moment';

//캘린더 임포트
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

//파이차트 그리기
import ReactApexChart from "react-apexcharts"; 
//1. 오늘 날짜, 날씨 가져오기(이거 프론트 단에서 마무리 하면 되는건지?)
//2. 배너 : 오늘 날짜로 일기가 안쓰여있으면 "일기쓰러가기 버튼" 및 일반 이미지 보여주기, 일기가 쓰여있으면 "일기보러가기 버튼" 보여주기 및 감정에 맞는 이미지 보여주기
//3. 프롤로그 : 최근 기준으로 일기 보여주기, 만약 일기가 없으면 일기 쓰러가라는 버튼 보여주기
//4. 타임라인 캘린더 : 일기 쓴 날 그날 대표 감정 이모티콘 보여주기, 만약 아이콘이 비어있는 곳을 클릭 시, 해당 날짜로 일기 쓰기 페이지로 이동


const Main = () => {
  const [value, onChange] = useState(new Date());

  //오늘 날짜 가져오기
  let now = new Date();
  let todayYear = now.getFullYear();
  let todayMonth = now.getMonth() + 1;
  let todayDate = now.getDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  let dayOfweek = week[now.getDay()];


  //현재 날짜 기준으로 근 7일간
  const donutData = {
    series: [2, 1, 2, 1, 1, 0],
    options: {
      chart: {
        type: 'donut',
      },
      legend: {
        position: 'right'
      },
      // responsive: [{
      //   breakpoint: 480,
      // }],
      // plotOptions: {
      //   pie: {
      //     donut: {
      //       // hollow: {  
      //       //   margin: 15,
      //       //   size: '70%',
      //       //   image: '../../css/images/a-icon.jpg',
      //       //   imageWidth: 64,
      //       //   imageHeight: 64,
      //       //   imageClipped: false
      //       // },
      //     }
      //   }
      // },
      labels: ["기쁨", "슬픔", "화남", "상처", "불안" ,"당황"]
      // title: {
      //   text: '이벤트별 통계',
      //   align: 'center'
      // },
    },
  }


  return (
    <div>
      <Navigation />
      <Container>
        <Col className="body">
          <Row>
            <p>{todayYear}년 {todayMonth}월 {todayDate}일 {dayOfweek}요일
              | 서울 18.0 대체로 청명함</p>
            {/* 사용자가 설정한 위치로 날씨 보여주기 */}
          </Row>

          <Row className='box'>
            <Col>
              <h4>이딘두님, 오늘 하루 어떠셨나요? 일상을 기록하고 근사한 밤을 보내세요</h4>
              <Button>일기 쓰러가기</Button>
            </Col>
            <Col className='bannerImage'>
              <img src="" />
            </Col>
          </Row>

          <Row>
            {/* 프롤로그 내용 누르면 상세페이지로 이동*/}
            <Col>
              <h3>Prologue✨</h3>
              <Row className='box'>
                <Col>
                  <h5>제목부분</h5>
                  <p>상세내용 미리보기</p>
                  <p>날짜</p>

                </Col>
                <Col>
                  <h5>제목부분</h5>
                  <p>상세내용 미리보기</p>
                  <p>날짜</p>
                </Col>
                <Col>
                  <h5>제목부분</h5>
                  <p>상세내용 미리보기</p>
                  <p>날짜</p>
                </Col>
              </Row>
            </Col>


              <Col>
              <h3>최근 나의 흔적</h3>
                <Col className='box'>
                  <Row>
                    <Col>        
                    <ReactApexChart
                      options={donutData.options}
                      series={donutData.series}
                      type="donut"
                      width="400"
                    />
                    </Col>
                    <Col>퍼센테이지</Col>
                  </Row>
                </Col>
              </Col>
            </Row>


          <Col>


          </Col>

        </Col>

      </Container>
    </div>

  )
}

export default Main