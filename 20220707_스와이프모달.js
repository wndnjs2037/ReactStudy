import { inject, observer } from "mobx-react";
import Link from "next/link";
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react';

const ColumnComponentLayout = inject("CommonStore", "MainStore")(observer((props) => {
    return (
        <Wrap>


            <Swiper
                spaceBetween={6}
                slidesPerView={2}
            >
                {
                    props.MainStore?.favoriteColumnList?.slice(0,5).map((item) => {
                        return (
                            <SwiperSlide key={item.id} className="swiper_item">
                                <Link href={ props.CommonStore.redateURL ? `${props.CommonStore.redateURL}/column/${item.id}` : `/column/${item.id}`}>
                                    <a>
                                        <figure>
                                            <img src={`https://okr.luvd.co.kr/api/common/image/thumb/${item.image_name}`} alt="썸네일"/>
                                        </figure>
                                    </a>
                                </Link>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>

            <div className="bottom_box">
                <Link href={ props.CommonStore.redateURL ? `${props.CommonStore.redateURL}/column` : `/column`}>
                    <a>
                        <span>바로읽기</span>
                        <img src="/organism/Main/arrow_right.svg" alt="바로가기"/>
                    </a>
                </Link>
            </div>
        </Wrap>
    );
}));

const Wrap = styled.div`
    width: 352px;
    margin: 6px;
    margin-top: 50px;
    padding: 5px;
    background: #FFFFFF;
    //box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    border-radius: 16px;
    overflow: hidden;

    .bottom_box { 
        font-family: 'Noto Sans KR';
        margin-top: 0px;
        padding: 0 0px;
        line-height: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        > a {
            display: flex;
            justify-content: space-between;
            align-items: left;
            //padding: 5px;
            
            span { //바로읽기
                margin-left: 10px;
                font-family: 'Noto Sans KR';
                font-size: 10px;
                /* line-height: 17px; */
                color: #000000;
                margin-right: 4.5px;
            }

            img {

            }
        }
    }

    .swiper-container {
        margin : 1px;
    }

    .swiper_item {
        width: 205px !important;
        border: 1px solid #F0F0F0;
        box-sizing: border-box;
        border-radius: 8px;
        min-height: 238px;

        figure {
            width: 205px;
            //height: 120px;
            overflow: hidden;
            border-radius: 8px 8px 8px 8px;

            img {
                width: 100%;
                height: 350px;
            }
        }


    }

    @media screen and (max-width: 868px) {
        width: 100vw;
    }
`;

export default ColumnComponentLayout;
