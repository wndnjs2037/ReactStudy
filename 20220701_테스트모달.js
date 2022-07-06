import React from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';

const ReviewLoginModal = (props) => {

    const router = useRouter();

    return(
        <Modal>
            <div className="background" onClick={()=>props.setIsModal(false)}></div>
            <div className="body">
                <div className="container">
                    <p className="top">로그인시 후기 작성 가능합니다.</p>
                </div>

                <div className='btn_box'>
                    <div>
                        <button className="login" onClick={()=>router.push("/login")}>로그인</button>
                        <button className="cancel" onClick={()=>props.setIsModal(false)}>취소</button>
                    </div>
                </div>
            
            </div>
        </Modal>
    );
};

const Modal = styled.div`
    position: fixed;
    top:0px;
    left:50%;
    transform: translateX(-50%);
    width: 375px;
    height:100vh;
    z-index:20;
    overflow: hidden;

    .background {
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height:100vh;
        background-color: rgba(0,0,0,0.78);
        overflow: hidden;
        z-index:21;
    }

    .body {
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%, -50%);
        width: 332.3px;
        height: 171.2px;
        box-sizing: border-box;
        padding:30px 20px 12px 20px;
        background-color: #fff;
        border-radius: 10px;
        z-index:22;
        display:flex;
        flex-wrap:wrap;
        align-content: space-around;
        justify-content : center;


        .container {
            display:flex;
            width: 100%;
            justify-content : center;
            border-top: 100px;
            


            .top {
                font-size: 14px;

                & + div {
                    margin-top: 7px;
                    p {
                        font-size: 14px;
                        font-weight: 500;
                        line-height: 1.29;
                        text-align: center;
                    }
                }
            }
            
            >div {
                margin-left:10px;
            }

            button {   
                align-self: flex-start;
                margin-left: auto;
                img {
                    vertical-align: top;
                }
            }
        }
        .btn_box {
            justify-content : center;
            text-align: center;
        }

        .login {
            margin-left: 2px;
            margin-right: 2px;
            margin-bottom: 20px;
            width: 90px;
            height: 35px;
            background-color: #592dad;
            border-radius: 0px;
            color: #fff;
            font-size: 13px;  
        }

        .cancel {
            margin-left: 2px;
            margin-right: 2px;
            margin-bottom: 20px;
            width: 90px;
            height: 35px;
            background-color: #D9D9D9;
            border-radius: 0px;
            color: #fff;
            font-size: 13px;
        }
    }
    @media screen and (max-width: 768px) {
        & {
            width: 100vw;
            margin: 0 auto;
        }
    }
`;

export default ReviewLoginModal;
