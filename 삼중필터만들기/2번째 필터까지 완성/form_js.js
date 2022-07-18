    //Filtering region dropdown #1 첫번째 필터 - 필터가 change되어 select 되면 함수 실행
    // #regionDropdown : 1번째 셀렉트 태그 id값
var filter_test = '';

//3개 필터 함수
//$('body').on('change', '#numberDropdown', function() {
$('body').on('change', '#numberDropdown', function() {
        var filter, table, tr, td, i;
        filter = $(numberDropdown).val(); //필터에 선택값 넣어주기
        table = document.getElementById("download-forms-table-tbody"); //바디에 붙인 태그를 통해 table에 값 tbody값 저장
        tr = table.getElementsByTagName("tr"); //tr태그 가져와서 저장
        // console.log("tr", tr);
      
        if (filter == "All") { //선택한 filter값이 All이라면
            // Loop through all table rows, and show anyrows that is hidden
            for (i = 0; i < tr.length; i++) { 
                tr[i].style.display = ""; //모든 값을 보여준다
            }
        } else { //All이 아니라면 
            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) { //tr의 길이만큼 반복(표의 행 갯수)
                td = tr[i].getElementsByTagName("td")[1]; //차례대로 1번째 인덱스의 값을 가져와서 td에 저장
                // console.log("td", td, i);
                if (td) { //가져온 td값이
                    if (td.innerHTML.indexOf(filter) > -1) { //일치해서 -1 보다큰 숫자를 반환한다면 
                        tr[i].style.display = ""; //해당 행은 보여준다
                    } else { // 그게 아니라면 
                        tr[i].style.display = "none"; //해당 행은 보여주지 않는다
                    }
                } else { //td값이 없다면 오류 출력
                    var a = "No Records Found!!!";
                }
            }
        }
    });


    //Filtering role dropdown #2 두번째 필터 함수
    //#roleDropdown : 2번째 셀릭트 태그 id값
   $('body').on("change", '#divisionDropdown', function() {
        var filter, table, tr, td, i;
        var regionval = $('#numberDropdown :selected').val();  //첫번째 필터에서 선택한 값이 있으면 가져와서 저장 (기본값 all)
        //console.log(regionval, "regionval");
        filter = $(divisionDropdown).val(); //두번째 필터의 선택 값에 해당하는 td 데이터 가져오기
        console.log(filter, "filter2");
        table = document.getElementById("download-forms-table-tbody"); //테이블 정보 가져오기
        tr = table.getElementsByTagName("tr"); //해당 테이블의 tr태그 값 가져와서 저장
        if (filter == "All") { //필터값이 ALL이라면
            // Loop through all table rows, and show anyrows that is hidden
            for (i = 0; i < tr.length; i++) { //tr행의 길이만큼 반복하면서
                tr[i].style.display = ""; //해당 tr의 i번째 행을 모두 보여준다.
            }
        } else { //두번째 필터 값이 ALL이 아니라면 
            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) { // tr 행 만큼 반복하면서
                var td1 = ''; //빈 변수 td1 선언 -> 첫번째 필터가 선택되지 않는다면 값은 ''이다.
                if (regionval != 'All') { //앞서 선택한 첫번째 필터 값이 ALL이 아니라면, (값을 선택했다면)
                    td1 = tr[i].getElementsByTagName("td")[1]; //새로 생성한 변수 td1에 1번째 td값을 저장한다.
                    //console.log(td1) //즉, td1에는 1번째 필터값을 적용할 td 테이블데이터가 저장된다.
                }
              
                td = tr[i].getElementsByTagName("td")[2]; //td 태그의 2번째 값을 가져와서 td에 저장
                //console.log("td:", td); // td에는 2번째 열의 데이터가 한개 씩 담겨진다.
                if (td) { //td 데이터가 있다면 
                    if (td.innerHTML.indexOf(filter) > -1) { //해당 데이터가 선택한 필터의 값과 일치한다면
                        //console.log("td.innerHTML.indexOf(filter)", td.innerHTML.indexOf(filter));
                        //첫번째 필터 관련 조건
                        if (td1 != '') { //그리고 첫번째 필터의 값이 공백이 아니라면 = 선택되었다면
                            if (td1.innerHTML.indexOf(regionval) > -1) { //그리고 첫번째 필터의 값이 현재 tr 행과 일치한다면 
                                //console.log(td1.innerHTML.indexOf(regionval), "td1.innerHTML.indexOf(regionval)");
                                tr[i].style.display = ""; //다시한 번 보여준다 -> 이는 하드코딩으로 데이터를 넣어놔서 다시 설정하는 부분인듯
                            } else { // 첫번채 필터의 값과 같지 않은 행은
                                tr[i].style.display = "none"; //보이지 않게 설정한다.
                            }
                        }// 첫번째 필터 관련 조건 끝
                      
                        // td1의 값(첫번째 필터값)이 선택되지 않았다면 필터링 하지 않아도 되므로
                        if (td1 == '') {
                            tr[i].style.display = ""; //모두 보여준다
                        }
                    } else {
                        tr[i].style.display = "none"; //두번째 필터의 값이 일치하지 않는 행은 모두 가려준다.
                    }
                }
            }
        }
    });

    //Show active inactive users #3 세번째 필터링 함수
    //'#associateStatusDropdown' : 3번째 셀렉트 태그 id 값
    $('body').on("change", '#sectorDropdown', function() { //change 될 때 실행되고, 
                var filter, table, tr, td, i;
                filter = $(sectorDropdown).val(); // 세번째 필터에서 선택한 값에 해당하는 td의 값 (테이블데이터)
                console.log(filter, "filter3"); 
                table = document.getElementById("download-forms-table-tbody"); //현재 document의 table 태그 안의 html 가져옴
                //console.log("table", table);
                tr = table.getElementsByTagName("tr"); // table 안의 tr태그의 html 가져옴
      
                //:selected 옵션은 제이쿼리에서 select 태그의 선택값을 가져오는 방식이다.
                var regionval = $('#numberDropdown :selected').val(); //첫번째 필터의 선택값 가져옴
                var roleval = $('#divisionDropdown :selected').val(); //두번째 필터의 선택값 가져옴
                if (filter == "All") { //세번째에서 선택한 필터가 all 이라면
                    // Loop through all table rows, and show anyrows that is hidden
                    for (i = 0; i < tr.length; i++) { //해당 행은 모두 노출시킨다
                        tr[i].style.display = "";
                    }
                } else { // all이 아닌 값을 선택했다면,
                    // Loop through all table rows, and hide those who don't match the search query
                    for (i = 0; i < tr.length; i++) { //행의 길이만큼 반복하며
                        td = tr[i].getElementsByTagName("td")[3]; //3번째 인덱스의 td 데이터를 td에 저장한다.
                      
                        var td1 = ''; //위와 같이 빈 td1 변수를 선언해준다 -> 첫번째 필터 선택값 필터링용
                        if (regionval != 'All') { //첫번째 필터의 선택 값이 all이 아니라면 = 무언가를 선택했다면
                            td1 = tr[i].getElementsByTagName("td")[1]; //선택한 값의 행안의 td 데이터를 td1에 저장
                        }

                        var td2 = ''; //위와 동일하게, td2 변수를 선언해준다 -> 두번째 필터  선택값 필터링용
                        if (roleval != 'All') { //두번째 필터의 선택 값이 all이 아니라면 = 무언가를 선택했다면
                            td2 = tr[i].getElementsByTagName("td")[2]; // 선택한 값의 행 안의 td 데이터를 td2에 저장
                        }
                        if (td) { // 3번째 인덱스의 td 데이터가 있다면!
                            if (td.innerHTML.indexOf(filter) > -1) { //filter 선택한 값과 td 데이터가 일치한다면 
                                //첫번째 필터링 관련 
                                if (td1 != '') { // 그리고 첫번째에 선택한 필터 값이 있다면 == ''이 아니란 것은 어떠한 값을 선택했다는 것이다
                                    if (td1.innerHTML.indexOf(regionval) > -1) { //첫번째 필터에서 선택한 값과 td1의 데이터가 일치한다면
                                        tr[i].style.display = ""; //해당 데이터는 보여준다
                                    } else { //일치하지 않는다면
                                        tr[i].style.display = "none"; //그 행의 데이터는 보여주지 않는다.
                                    }
                                }// 첫번째 필터링 관련 끝
                                    
                                    //두번째 필터링 관련
                                    if (td2 != '') { //두번째 필터에서 어떠한 값을 선택했다면
                                        if (td2.innerHTML.indexOf(roleval) > -1) { //그 선택 값이(releval) td2의 테이블 데이터와 일치한다면
                                            tr[i].style.display = ""; //해당 데이터는 보여준다
                                        } else { //일치하지 않는다면
                                            tr[i].style.display = "none"; //그 행의 데이터는 보여주지 않는다.
                                        }
                                    }
                                    //두번째 필터링 관련 끝
                              
                                    //첫번째와 두번째 필터를 모두 선택한 경우에 실행하는 부분
                                    if (td1 == '' || td2 == '') {
                                        tr[i].style.display = ""; //첫번째와 두번째 필터를 모두 선택하지 않았다면 테이블의 데이터를 모두 보여준다.
                                    }
                                } else { //세번째 필터 값과 td 데이터가 일치하지 않는다면
                                    tr[i].style.display = "none"; //그 행(tr[i])의 데이터는 보여주지 않는다.
                                }
                            } else { //그것도 아니라면 오류를 출력해준다.
                                var a = "No Records Found!!!";
                            }
                        }
                    }
                });

// 조회 버튼 클릭시


// 검색 함수
$('body').on("click", '#search', function()  {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("textInput"); //입력값 가져오기
  filter = input.value; //입력 값 filter에 저장
  //console.log("filter", filter);
  //table = document.getElementById("table"); //html의 테이블 가져와서 저장
  table = document.getElementById("download-forms-table-tbody");
  console.log(table, "table");
  tr = table.getElementsByTagName("tr"); //행 데이터 가져오기
  
  for (i = 0; i < tr.length; i++) { //행을 순회하는 반복문
    td = tr[i].getElementsByTagName("td")[5]; //검색할 열 - 5번째 이름열
    if (td) { 
      txtValue = td.textContent || td.innerText;
      if (txtValue.indexOf(filter) > -1) { //입력 값과 테이블 값이 같지않다면
        tr[i].style.display = ""; // "" 출력
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
});


var data = [
    ["2022", "71","초등부", "비올라","1", "정승호",""],
    ["2022", "69","중등부", "피아노","2", "김재석",""],
    ["2022", "70","중등부", "바이올린","3", "이채령",""],
    ["2022", "70","고등부", "피아노","1", "이민수",""],
    ["2022", "71","중등부", "바이올린","2", "박다혜",""],
    ["2022", "69","고등부", "비올라","2", "송민지",""]

];


// 배열로 테이블 생성 - 제이쿼리
// $(document).ready(function() {
//     var $listTbody = $(".table tbody");
//     data.forEach(function(val) {
//         $listTbody.append("<tr><td>" + val[0] +
//                           "</td><td>" + val[1] +
//                           "</td><td>" + val[2] +
//                           "</td><td>" + val[3] +
//                           "</td><td>" + val[4] +
//                           "</td><td>" + val[5] +
//                           "</td><td>" + val[6] +
//                           "</td></tr>");
//     });
// });

// 바닐라로 테이블 생성
document.addEventListener("DOMContentLoaded", function() {
    var $createTbody = document.querySelector(".table tbody");
    data.forEach(function(val) {
        $createTbody.innerHTML +=
          "<tr><td>" + val[0] + 
          "</td><td>" + val[1] + 
          "</td><td>" + val[2] + 
          "</td><td>" + val[3] + 
          "</td><td>" + val[4] + 
          "</td><td>" + val[5] + 
          "</td><td>" + val[6] + 
          "</td></tr>";
    });
});
