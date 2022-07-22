import React, { Fragment, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import { MainHeader } from "../../components/atom/Header";
import { fetchJson, Loading, useUser } from "../../util";
import useSWR from "swr";
import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import TimerBox from "../../components/atom/Box/TimerBox";
import TeacherColumnListComponent from "../../components/organism/Letter/TeacherColumnListComponent";
import LetterColumnListComponent from "../../components/organism/Letter/LetterColumnListComponent";



const DynamicBottomContiner = dynamic(() =>
  // import("../../components/molecules/Container/BottonContainer")
  import("../../components/molecules/Container/TimeContainer")
);

const DynamicBottomSwiper = dynamic(() =>
  import("../../components/organism/Swiper/BottomSwiper")
);

const DynamicColumnComponent = dynamic(() =>
  import("../../components/organism/Main/ColumnComponentLayout")
);

const DynamicLetterComponent = dynamic(() =>
  import("../../components/organism/Main/LetterComponent")
);

const DynamicImageComponent = dynamic(() =>
  import("../../components/organism/Main/ImageComponent")
);

const DynamicSpeechComponent = dynamic(() =>
  import("../../components/organism/Main/SpeechComponent")
);

const DynamicYoutubeComponent = dynamic(() =>
  import("../../components/organism/Main/YoutubeComponent")
);

const Mainlayout = inject(
  "MainStore",
  "CommonStore",
  "UserStore",
  "LetterStore",
  "ColumnStore"
)(
  observer((props) => {
    const [isTop, setIsTop] = useState(true);
    const [diagnosisLink, setDiagnosisLink] = useState(
      `https://form.redate.co.kr`
    );
    const [params, setCouns] = useState({ counselor: "" });
    const { data: getParams } = useSWR("/api/getParams");
    const { data: currentUser } = useSWR("/api/token");
    const { user } = useUser();
    const [randomCount, setRandomCount] = useState(8);
    const router = useRouter();

    useEffect(() => {
      const token = currentUser?.token;
      if (token) {
        const result = fetchJson(
          process.env.NEXT_PUBLIC_ENV_VARIABLE + `/api/speech/page/1`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((data) => props.MainStore.setMainSpeechList(data))
          .catch((e) => console.log(e));
      }
    }, [currentUser?.token]);

    useEffect(() => {
      if (user?.isLoggedIn !== undefined) {
        if (user?.isLoggedIn === false) {
          props.MainStore.getStateList(1).then((data) =>
            props.MainStore.setStateList(data)
          );
        } else {
          if (user?.user_diagnosis.length) {
            if (user?.user_diagnosis[0].type === "단회") {
              props.MainStore.getStateList(4).then((data) =>
                props.MainStore.setStateList(data)
              );
            } else {
              props.MainStore.getStateList(5).then((data) =>
                props.MainStore.setStateList(data)
              );
            }
          } else {
            props.MainStore.getStateList(2).then((data) =>
              props.MainStore.setStateList(data)
            );
          }
        }
      }
    }, [user?.isLoggedIn]);

    useEffect(() => {
      const url = new URL(window.location.href);
      const couns = url.searchParams.get("counselor");

      if (couns) {
        setDiagnosisLink(`https://form.redate.co.kr/?counselor=${couns}`);
        setCouns((params) => ({
          ...params,
          counselor: Number(couns),
        }));

        setParams();
      } else {
        if (getParams !== undefined && Object.keys(getParams).length !== 0) {
          const counselorNum = getParams.value.counselor;
          counselorNum &&
            setDiagnosisLink(
              `https://form.redate.co.kr/?counselor=${counselorNum}`
            );
        }
      }
    }, [params.counselor, getParams]);

    useEffect(() => {
      window.addEventListener("scroll", setScrollY, { passive: true });

      const ran = Math.ceil(Math.random() * 9);
      setRandomCount(ran);

      return () => {
        window.removeEventListener("scroll", setScrollY);
      };
    }, []);

    useEffect(() => {
      const date = new Date();
      const hours = date.getHours();
      const time = date.getTime();

      if (hours >= 4) {
        date.setDate(date.getDate() + 1);
        date.toUTCString();
      }

      props.CommonStore.setDeadLineDay(date);

      const endDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        4
      );

      const diffTime = endDate.getTime() - time;
      const diffDate = new Date(2000, 0, 1);
      diffDate.setTime(diffDate.getTime() + diffTime);

      props.CommonStore.setDiffDate(diffDate);
    }, []);

    const setScrollY = () => {
      if (window.scrollY === 0) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }
    };

    const setParams = () => {
      fetchJson("/api/setParams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          params,
        }),
      });
    };

    // console.log(props.LetterStore.letterList, "props.LetterStore.letterList");
    // console.log(props.LetterStore.letterList[1].name, "props.LetterStore.letterList[1].name");
    console.log(props, "props");

    return (
      <>
        <Head>
          <title>
            (test)리데이트 - 재회상담, 재회컨설팅, 이별상담을 전문으로 하는 법인
            회사입니다.
          </title>
          <meta name="theme-color" content="#000000" /> 
          <meta
            name="description"
            content="재회하려는 자의 최종 종착지, 재회상담을 전문으로 하는 리데이트입니다. 국내 최다 이별 사례 56,000건을 토대로 만든 200가지 솔루션을 제시합니다."
          />
          <meta
            property="og:title"
            content="리데이트 - 재회상담, 재회컨설팅, 이별상담을 전문으로 하는 법인 회사입니다."
          />
          <meta property="og:url" content="https://main.redate.co.kr/" />
          <meta
            property="og:image"
            content="https://elasticbeanstalk-ap-northeast-1-472936995240.s3-ap-northeast-1.amazonaws.com/redate/redateLogo.jpg"
          />
          <meta
            property="og:description"
            content="재회하려는 자의 최종 종착지, 재회상담을 전문으로 하는 리데이트입니다. 국내 최다 이별 사례 56,000건을 토대로 만든 200가지 솔루션을 제시합니다."
          />
          <meta
            name="naver-site-verification"
            content="5ff3261a300c21d7539e3aab10f1ad753a474d49"
          />
          <meta
            name="google-site-verification"
            content="P3Wz_EE--b6CVxdCGI0y3f9KSQ1TSKZDECn4SITThjE"
          />
        </Head>
        <MainHeader diagnosisLink={diagnosisLink} isTop={isTop} /> {/* 진단지 연결 링크 */ }
        <Wrap shadow={props.CommonStore.isSlide}>
          {/* <div className="main"> 
            <div className="guide"> 

            </div>
          </div> */}

          <div className="state_container"> {/* 이미지(성공사례, 진단시스템 ..) , 칼럼 표시 영역 */}
            {props.MainStore?.stateList.length ? (
              props.MainStore?.stateList?.map((state) => {
                {
                  switch (state.widget_info.type) {
                    case 1:
                      // return (
                      //   <div key={state.id}>
                      //     {state.widget_info.widget_extend_info?.map((item) => {
                      //       // return ( //이미지 출력부분 (1개)
                      //       //   <DynamicImageComponent
                      //       //     item={item}
                      //       //     key={item.id}
                      //       //   />
                      //       // );
                      //     })}
                      //   </div>
                      // );
                    case 2:
                      // return (
                      //   <div key={state.id}>
                      //     {state.widget_info.widget_extend_info?.map((item) => {
                      //       // return ( //이미지 출력부분 (2개)
                      //       //   <DynamicImageComponent
                      //       //     item={item}
                      //       //     key={item.id}
                      //       //   />
                      //       // );
                      //     })}
                      //   </div>
                      // );
                    case 3:
                      // return (
                      //   <Swiper
                      //     spaceBetween={7}
                      //     slidesPerView={"auto"}
                      //     loop={true}
                      //     pagination={{ clickable: true }}
                      //     key={state.id}
                      //     className="slide_container"
                      //   >
                      //     {state.widget_info.widget_extend_info?.map((item) => {
                      //       return (
                      //         <SwiperSlide className="item" key={item.id}>
                      //           <Link
                      //             href={
                      //               item.isExternal
                      //                 ? `${item.link_name}`
                      //                 : props.CommonStore.redateURL
                      //                 ? `${props.CommonStore.redateURL}${item.link_name}`
                      //                 : `${item.link_name}`
                      //             }
                      //             key={item.id}
                      //           >
                      //             <a>
                      //               <figure className="thum_box">
                      //                 <img
                      //                   // src={`${process.env.NEXT_PUBLIC_ENV_VARIABLE}/api/common/image/${item.image_name}/type/widget`}
                      //                   src={`https://back.redate.co.kr/api/common/image/74b5bf48-e346-4be3-9cc4-770f9d6ae388.png/type/widget`}
                      //                   alt="이미지"
                      //                 />
                      //               </figure>
                      //             </a>
                      //           </Link>
                      //         </SwiperSlide>
                      //       );
                      //     })}
                      //   </Swiper>
                      // );
                    case 4:
                      // return <DynamicColumnComponent key={state.id} />;
                    case 5:
                      // return <DynamicSpeechComponent key={state.id} />;
                    case 6:
                      // return (
                      //   <div key={state.id}>
                      //     {state.widget_info.widget_extend_info?.map((item) => {
                      //       return (
                      //         <DynamicYoutubeComponent
                      //           item={item}
                      //           key={item.id}
                      //         />
                      //       );
                      //     })}
                          
                      //   </div>
                      // );
                    case 7:
                    case 8:
                    case 9:
                      // return (
                      //   // <DynamicBottomContiner
                      //   //   key={state.id}
                      //   //   diagnosisLink={diagnosisLink}
                      //   //   bottomType={state.widget_info.type}
                      //   //   randomCount={randomCount}
                      //   // />

                      //   <Fragment>
                      //     <div className="timer_box">
                      //       <link rel="preconnect" href="https://fonts.googleapis.com" />
                      //       <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                      //       <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400&display=swap" rel="stylesheet"></link>

                      //       <div className='text_box'>
                      //           <div className="time_text1">
                      //           <span>➡ 이별진단 마감까지</span>
                      //           </div>
                      //           <div className="time_text2">
                      //           <span>전문가가 재회만 전문적으로 진단합니다.</span>
                      //           </div>
                      //       </div>
                      //       <TimerBox></TimerBox>
                      //     </div>
                          
                          
                      //   </Fragment>
                      // );
                    case 10:
                    case 11:
                      // props.CommonStore.setTypeId(state);
                      // break;
                    case 12:
                    case 13:
                    case 14:
                      // return (
                      //   <Fragment key={state.id}>
                      //     <DynamicBottomSwiper
                      //       bottomType={state.widget_info.type}
                      //       diagnosisLink={diagnosisLink}
                      //       randomCount={randomCount}
                      //     />
                      //     <div className="bg"></div>
                      //   </Fragment>
                      // );
                    default:
                      return <Fragment key={state.id}></Fragment>;
                  }
                }
              })
            ) : (
              <Loading />
            )}
          </div>

          <Fragment>

            <div className="img_slider_1"> 
              <Swiper
                          spaceBetween={7}
                          slidesPerView={"auto"}
                          loop={true}
                          pagination={{ clickable: true }}
                          className="slide_container"
                        >
                              <SwiperSlide className="item" >
                                <Link
                                  href={`https://back.redate.co.kr/api/common/image/74b5bf48-e346-4be3-9cc4-770f9d6ae388.png/type/widget`}>
                                  <a>
                                    <figure className="thum_box">
                                      <img
                                        src={`/organism/Mainlayout/main_banner.svg`}
                                        alt="이미지"/>
                                    </figure>
                                  </a>
                                </Link>
                              </SwiperSlide>
                        </Swiper>
            </div>


            <div className="form_box">

              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
              <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400&display=swap" rel="stylesheet"></link>

              <img className="box_img" src="/organism/Mainlayout/form_btn.svg" href={`https://form.redate.co.kr/`}></img>

              <div className="timer">
                <TimerBox></TimerBox>
              </div>

            </div>

            <div class='v-line'></div>

            <div className="search_bar">
                <input type="text" placeholder="       어떤 이별로 힘드신가요?"></input>
                <img className="search_img" src="/organism/Mainlayout/search_btn.svg"></img>
              <div className="search_tag1">
                <button className="tag1">장거리</button>
                <button className="tag2">환승이별</button>
                <button className="tag3">마음 정리한 여자 잡는 법</button>
              </div>
            </div>

            <div className="swipe_column">  
              <DynamicColumnComponent></DynamicColumnComponent>
            </div>


            <div className="short_review_box">
              
              <div className="review_box">
                <img className="review_img" src="/organism/Mainlayout/default_counselee.svg"></img>
                <div className="counselee_id">
                    <span>내담자 wfho**님, OO쌤</span>
                </div>
                <div className="review_content">
                    <span>상담 잘받았습니다^^ 너무 친절해용~</span>
                </div>
                <div className="review_date">
                   <span>오늘</span>
                </div>
              </div>

              <div className="review_box">
                <img className="review_img" src="/organism/Mainlayout/default_counselee.svg"></img>
                <div className="counselee_id">
                    <span>내담자 wfho**님, XX쌤</span>
                </div>
                <div className="review_content">
                    <span>만족해요~</span>
                </div>
                <div className="review_date">
                   <span>오늘</span>
                </div>
              </div>

              <div className="review_box">
                <img className="review_img" src="/organism/Mainlayout/default_counselee.svg"></img>
                <div className="counselee_id">
                    <span>내담자 wfho**님, ㅁㅁ쌤</span>
                </div>
                <div className="review_content">
                    <span>다음주에도 잘 부탁드리겠습니다~</span>
                </div>
                <div className="review_date">
                   <span>오늘</span>
                </div>
              </div>

              <div className="review_more">
                  <Link href={ props.CommonStore.redateURL ? `${props.CommonStore.redateURL}/review` : `/review`}>
                      <a>
                          <span>더 많은 후기 확인하기</span>
                          <img src="/organism/Main/arrow_right.svg" alt="바로가기"/>
                      </a>
                  </Link>
                </div>
                
            </div>


            <div className="counselor_letter">
              <div className="letter_title1">
                <span>쌤들의 편지</span>
              </div>
              <div className="letter_title2">
                <span>재회 상담을 수백, 수천건 한 쌤들의 이야기</span>
              </div>

              <div className="letter_swiper">
                {
                  
                  //props.LetterStore.letterList.map((letter) =>
                  <DynamicLetterComponent
                      // key={letter.id}
                      // letter={letter}
                      
                      letterStore = {props.LetterStore}
                      />
                //)
                }

                {/* {
                  <TeacherColumnListComponent 
                    letterStore = {props.LetterStore}                    
                    
                />
                }
                {
                <LetterColumnListComponent
                letterStore = {props.LetterStore} 
                />
                  
                } */}


              </div>

            </div>

          </Fragment>
        </Wrap>
      </>
    );
  })
);

const Wrap = styled.main`
  background-color: #ffffff;
  padding-bottom: 79px;
  overflow: hidden;

  //타이머(진단폼 이동) 박스
  .form_box {
    z-index: 1;
    position: relative;

    .box_img{
      z-index: 0;
      position: absolute;
    
    }
    .timer{
      position: relative;
      top:27px;
      left:90px;
    }
  }

  //쌤들의 편지 영역 스타일
  .counselor_letter{

    .letter_title1{
      text-align: center;
      font-size: 12pt;
      font-family: "Noto Sans KR";
      font-weight: bold;
      margin: 5px;
    }

    .letter_title2{
      text-align: center;
      font-size: 10pt;
      font-family: "Noto Sans KR";
      margin: 5px;
    }

  }

  .v-line {
    border-left : solid #eeeeee;
    height : 50px;
    margin-left: 185px;
    margin-top: 110px;
    margin-bottom: 50px;
  }

  .short_review_box { // 짧은 후기 영역 스타일
      position: relative;
      margin-top: 100px;
      margin-bottom: 100px;
      margin-left: 12px;

      .review_box{
        width: 350px;
        height: 60px;
        border: 1.5px solid transparent;
        border-radius: 8px;
        background-image: linear-gradient(#ffffff, #ffffff), linear-gradient(to right, #9D86E1, #D7D1E8); //외곽선 그라데이션
        background-origin: border-box;
        background-clip: content-box, border-box;
        margin-top: 10px;
        margin-bottom: 10px;
        //position: absolute;
        z-index: 2;
      }

      .review_img{
          position: absolute;
          z-index: 2;
          width: 40px;
          height: 40px;
          padding: 3px;
          margin-left: 10px;
          margin-top: 7px;
        }

      .counselee_id {
          z-index: 2;
          //position: absolute;
          font-size: 8pt;
          font-family: "Noto Sans KR";
          color: #B6AEB3;
          margin-top: 12px;
          margin-left: 70px;
          margin-bottom: 5px;
          

        }
    
      .review_content{
          z-index: 2;
          position: absolute;
          font-size: 10pt;
          font-family: "Noto Sans KR";
          color: #434343;
          margin-left: 70px;
          margin-bottom: 5px;
          
        }

      .review_date{
          z-index: 2;
          position: absolute;
          font-size: 8pt;
          font-family: "Noto Sans KR";
          color: #D5D5D5;
          margin-left: 310px;
          margin-bottom: 20px;
          

        }

        .review_more{
          z-index: 2;
          position: absolute;
          top: 21em;
          left: 12em;
          text-align: center;
          margin: 5px;
          font-size: 8pt;
          font-family: "Noto Sans KR";
          color:#868184;
        }
    }


  //상단 첫번째 이미지 슬라이더 스타일
  .img_slider_1 {
    z-index: 1;
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
    margin-top: 95px;
    
    img {
      z-index: 1;
      width: 100%;
      height: 100%;
    }

  }

  //검색창 스타일
  .search_bar {
    position: relative;
    text-align: center;
    width: 265px;
    margin-right: 45px;
    margin-left: 45px;
    
    }

    input {
        width: 100%;
        border-radius: 20px;
        border: 1px solid #bbb;
        margin: 10px 0;
        padding: 10px 10px;
    }

    input::placeholder {
      font-size: 12px;
      color:black;
    }


    .search_img {
      position : absolute;
      width: 50px;
      top: 17px;
      right: -10px;
      box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.3);
      border-radius: 20px;
    }

    .tag1 {
      width: 20%;
      border-radius: 20px;
      border: 1px solid #bbb;
      border-color: #A58AF6;
      padding: 5px 5px;
      font-size: 10px;
      color: #A58AF6;
      margin: 2px;
    }

    .tag2 {
      width: 25%;
      border-radius: 20px;
      border: 1px solid #bbb;
      border-color: #A58AF6;
      padding: 5px 5px;
      font-size: 10px;
      color: #A58AF6;
      margin: 2px;
    }

    .tag3 {
      width: 45%;
      border-radius: 20px;
      border: 1px solid #bbb;
      border-color: #A58AF6;
      padding: 5px 5px;
      font-size: 10px;
      color: #A58AF6;
      margin: 2px;
    }


  .bg { 
    content: "";
    position: fixed;
    z-index: 1;
    width: 375px;
    height: 150vh;
    left: 50%;
    transform: translateX(-50%);
    top: -255px;
    background: #6324e6; //6324e6
    display: ${(props) => (props.shadow ? "block" : "none")};
  }

  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 54px;
    left: 0;
    padding-top: 80px;
    // background: linear-gradient(to right, #5236A7, #9B89C6); // 그라데이션 배경
    width: 100%;
    height: 200px;
  }

  .main {
    position: relative;
    z-index: 1;
    margin-bottom: 20px;
    overflow: hidden;

    .guide {
      position: relative;
      padding-top: 80px;
      margin-top: 86px;
      margin-left: 26px;
      color: #f4f4f4;
      font-size: 26px;
      line-height: 34px;
      letter-spacing: -0.055em;
      p {
        font-family: "NotoKrL";

        &:last-child {
          font-family: "NotoKrR";
        }
      }
    }
  }

  .state_container {
    position: relative;
    z-index: 2;

    > .swiper-container {
      overflow: initial;
      margin-top: 0px; //60px

      &.item {
        box-shadow: 0px 0px 0px 0px !important;
      }

      .swiper-wrapper {
        margin: 0px; //margin-left: 28px

        .swiper-slide {
          &.swiper-slide-active {
            margin-top: -70px; //-33px
          }
        }
      }
    }

    .item {
      position: relative;
      border-radius: 8px;
      width: 320px;
      height: 320px;
      overflow: hidden;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);

      .thum_box {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .num {
      position: absolute;
      right: 48px;
      bottom: 0;
      font-family: NotoKrM;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: -0.03em;
      color: #565656;
    }
    .slide_container {
      .swiper-pagination-bullet {
        &.swiper-pagination-bullet-active {
          background-color: #6324e6;
        }
      }

      .swiper-pagination {
        margin-top: 20px !important; 

        .swiper-pagination-bullet {
          width: 14px; 
          height: 14px;
        }
      }

      --swiper-theme-color: #6324e6; 
    }
  }

  .bottom_container {
    width: 375px;
    height: 48px;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    background: #373139;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 22px;

    .text_box {
      color: rgba(255, 255, 255, 0.8);
      font-size: 14px;
    }

    .time_box {
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;

      > div {
        width: 28px;
        height: 28px;
        border: 1px solid rgba(242, 242, 242, 0.8);
        box-sizing: border-box;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        &:last-child {
          &::after {
            content: "";
          }
        }

        &::after {
          content: ":";
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: -6px;
        }

        & + div {
          margin-left: 6px;
        }

        span {
          font-size: 14px;
        }
      }
    }

    .bt_box {
      color: #ffffff;
      width: 65px;
      height: 33px;
      background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.2) 100%,
          rgba(0, 0, 0, 0.2) 100%
        ),
        #7858f8;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 6px;
    }
  }


  //타이머 박스 스타일
  .timer_box{
    width: 350px;
    height: 62px;
    // position: ${(props) => props.from ? 'relative' : 'fixed'};
    // bottom:0;
    // left:50%;
    // transform: translateX(-50%);
    z-index: 100;
    background: #9D86E1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 0 0 20px;
    border-radius: 3px;
    margin-left : 12px;
    //margin-right: 50px;

    .text_box {
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;

        &.from {
            color: rgba(255, 255, 255, 1);

            > span {
                color: rgba(255, 255, 255, 1);
                font-weight: 700;
            }

            > div {
                font-size: 14px;
                font-weight: 700;
                line-height: 20px
            }
            
        }

        .time_text1{
            font-size: 13pt;
            text-align: center;
            font-family: 'Noto Sans KR';
            color: white;
            font-weight: 800;
            
        }

        .time_text2{
            font-size: 7pt;
            text-align: center;
            font-family: 'Noto Sans KR';
            margin-top: 3px;
            color: #D1C8EC;
        }

    
    }
  }

  @media screen and (max-width: 768px) { //
    .bottom_container {
      width: 100vw;
    }

    .bg {
      width: 100vw;
    }
  }
`;




export async function getServerSideProps() {
  const favoriteColumnList = await fetchJson(
    `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/api/main/column`,
    {
      method: "GET",
    }
  );

  const letterList = await fetchJson(`${process.env.NEXT_PUBLIC_ENV_VARIABLE}/api/letter`, {
      method: 'GET',
  });

  const letter = await fetchJson(`${process.env.NEXT_PUBLIC_ENV_VARIABLE}/api/letter`, {
    method: 'GET',
  });


  return {
    props: {
      initialState: {
        favoriteColumnList,
        letterList: letterList,
      },
    },


  };
}

export default Mainlayout;
