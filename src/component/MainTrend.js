import { React, useEffect, useState } from 'react'
import { Container, Col, Row} from 'react-bootstrap';
import { Link } from "react-router-dom";;

const MainTrend = ({detail}) => {
    let diaryDateData =  new Date(detail.created_at).toISOString().split('T')[0]; //다이어리 작성 날짜
    let diaryEmotionData = detail.mainEmotion; //다이어리 작성 날짜
    let diaryEmotionStaticData = ['50%'];

    const[emotionIcon, setEmotionIcon] =  useState("")
      
    const textEmotionToIcon = (emotion) => {
      if (emotion == 'happy'){
        setEmotionIcon("😄")
      }
      if (emotion == 'sad'){
        setEmotionIcon("😭")
      }
      if (emotion == 'angry'){
        setEmotionIcon("🤬")
      }
      if (emotion == 'hurt'){
        setEmotionIcon("🤕")
      }
      if (emotion == 'anxious'){
        setEmotionIcon("😨")
      }
      if (emotion == 'statrled'){
        setEmotionIcon("😳")
      }
      else{
        setEmotionIcon("🤪")
      }
    }
    useEffect(()=>{
      textEmotionToIcon(diaryEmotionData);
    }, [])
  
    return (
      
          <Container>
            <Link style={{ textDecoration : 'none'}} to={`/diary-detail/${detail.id}`}>
            <Row>
              <Col className="text-center" style={{fontSize : "15px"}}>{diaryDateData}</Col>
              <Col className="text-center" style={{fontSize : "20px"}}>{emotionIcon}</Col>
              <Col className="text-center" style={{fontSize : "15px"}}>{diaryEmotionStaticData}</Col>
            </Row>
            </Link>
          </Container>
    )
}

export default MainTrend