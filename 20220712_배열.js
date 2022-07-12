//2차원 배열 선언
const data = [
    ["2022", "71", "초등부", "피아노", 1, "정승호", ""],
    ["2022", "71", "초등부", "피아노", 2, "김채령", ""],
    ["2022", "71", "초등부", "피아노", 3, "유아림", ""],
    ["2022", "71", "초등부", "바이올린", 1, "김현서", ""],
    ["2022", "71", "초등부", "바이올린", 2, "박하엘,정현준", ""],
    ["2022", "71", "초등부", "비올라", 1, "박소율", ""],
    ["2022", "71", "초등부", "비올라", 2, "홍라희", ""]
];

// 검색기능
// console.log("data[0].indexOf(정승호) :", data[0].indexOf("정승호"));
// console.log("data[0].indexOf(김채령) :", data[0].indexOf("김채령"));
// const test = data[0].indexOf("정승호");
// console.log(data[0][test]);

const result = "";
const inputValue = "김채령";

for(let i=0; i < data.length; i++){
  if (data[i].indexOf(inputValue) !== -1){
    // console.log(inputValue, " 검색완료");
    // console.log("검색 값의 행 : ", i);
    }
 }

// 검색함수
function mySearch() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("textInput"); //입력값 가져오기
  filter = input.value; //입력 값 filter에 저장
  table = document.getElementById("dataTable"); //html의 테이블 가져와서 저장
  tr = table.getElementsByTagName("tr"); //행 데이터 가져오기
  
  for (i = 0; i < tr.length; i++) { //행을 순회하는 반복문
    td = tr[i].getElementsByTagName("td")[5]; //검색할 열
    if (td) { 
      txtValue = td.textContent || td.innerText;
      if (txtValue.indexOf(filter) > -1) { //입력 값과 테이블 값이 같지않다면
        tr[i].style.display = ""; 
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}


// 필터기능

// var selectOption = document.getElementById("first");
// selectOption = selectOption.options[selectOption.selectedIndex].value;
// console.log(selectOption); //선택한 값의 value값 가져오기

function test(){
  myFilter();
  myFilter2();
  myFilter3();
}

function myFilter3() {
  var input, filter1, filter2, filter3, table, tr, td, td1, td2, td3, i, txtValue;
  var selectOption1 = document.getElementById("mySelector1"); 
  var selectOption2 = document.getElementById("mySelector2"); 
  var selectOption3 = document.getElementById("mySelector3"); 
  selectOption1 = selectOption1.options[selectOption1.selectedIndex].value;
  selectOption2 = selectOption2.options[selectOption2.selectedIndex].value;
  selectOption3 = selectOption3.options[selectOption3.selectedIndex].value;
  
  filter1 = selectOption1; //filter에 선택한 값 저장
  filter2 = selectOption2; 
  filter3 = selectOption3; 
  
  table = document.getElementById("dataTable"); //html에서 테이블 가져오기
  tr = table.getElementsByTagName("tr"); //행 데이터 가져오기
  
  let filter1_index = [];
  for (i = 0; i < tr.length; i++) { //행을 순회하는 반복문
    td = tr[i].getElementsByTagName("td")[3]; //검색할 열
    if (td) { 
      // txtValue = td.textContent || td.innerText;
      txtValue =  td.innerText; //td의 값을 가져와서 txtValue에 저장
      console.log("txtValue :", txtValue, i);
      if (txtValue.indexOf(filter3) > -1) { //선택 값과 테이블 값이 같다면
        tr[i].style.display = ""; // i번째 행(tr)을 테이블에 그대로 표시
        filter1_index.push(i);
      } else { //선택한 값과 테이블 값이 같지 않다면
        tr[i].style.display = "none"; //none으로 숨긴 뒤 안보이게 함
      }
      console.log(filter1_index);
    }       
  }  
  
}

 

function myFilter2() {
  console.log("click");

  var input, filter1, filter2, filter3, table, tr, td, td1, td2, td3, i, txtValue;
  var selectOption1 = document.getElementById("mySelector1"); 
  var selectOption2 = document.getElementById("mySelector2"); 
  var selectOption3 = document.getElementById("mySelector3"); 
  selectOption1 = selectOption1.options[selectOption1.selectedIndex].value;
  selectOption2 = selectOption2.options[selectOption2.selectedIndex].value;
  selectOption3 = selectOption3.options[selectOption3.selectedIndex].value;
  
  filter1 = selectOption1; //filter에 선택한 값 저장
  filter2 = selectOption2; 
  filter3 = selectOption3; 
  
  table = document.getElementById("dataTable"); //html에서 테이블 가져오기
  tr = table.getElementsByTagName("tr"); //행 데이터 가져오기
  
  for (i = 0; i < tr.length; i++) { //행을 순회하는 반복문
    td = tr[i].getElementsByTagName("td")[2]; //검색할 열
    if (td) { 
      // txtValue = td.textContent || td.innerText;
      txtValue =  td.innerText; //td의 값을 가져와서 txtValue에 저장
      console.log("txtValue :", txtValue, i);
      if (txtValue.indexOf(filter2) > -1) { //선택 값과 테이블 값이 같다면
        tr[i].style.display = ""; //테이블(tr)에 그대로 표시
      } else { //선택한 값과 테이블 값이 같지 않다면
        tr[i].style.display = "none"; //none으로 숨긴 뒤 안보이게 함
      }
    }       
  }  
}

// 필터함수
function myFilter() {
  var input, filter1, filter2, filter3, table, tr, td, td1, td2, td3, i, txtValue;
  var selectOption1 = document.getElementById("mySelector1"); 
  var selectOption2 = document.getElementById("mySelector2"); 
  var selectOption3 = document.getElementById("mySelector3");
  
  var tr_show = [];
  selectOption1 = selectOption1.options[selectOption1.selectedIndex].value;
  selectOption2 = selectOption2.options[selectOption2.selectedIndex].value;
  selectOption3 = selectOption3.options[selectOption3.selectedIndex].value;
  
  filter1 = selectOption1; //filter에 선택한 값 저장
  filter2 = selectOption2; 
  filter3 = selectOption3; 
  
  console.log(filter1);
  console.log(filter2);
  console.log(filter3);
  
  table = document.getElementById("dataTable"); //html에서 테이블 가져오기
  tr = table.getElementsByTagName("tr"); //행 데이터 가져오기
  
  
  for (i = 0; i < tr.length; i++) { //행을 순회하는 반복문
    // td = tr[i].getElementsByTagName("td")[1];
    td = tr[i].getElementsByTagName("td")[1]; //검색할 열의 값 가져와서 td에 저장
    
    if (td) { 
      // txtValue = td.textContent || td.innerText;
      txtValue =  td.innerText; //td의 값을 가져와서 txtValue에 저장
      //console.log("txtValue :", txtValue, i);
      
      if (txtValue.indexOf(filter1) > -1) { //선택 값과 테이블 값이 같다면 (-1보다 크면 인덱스가 리턴된것)
        // tr[i].style.display = ""; //테이블(tr)에 그대로 표시
        console.log("테스트:",tr[i].getElementsByTagName("td")[2]);
        td = tr[i].getElementsByTagName("td")[2];
        txtValue = td.innerText;
        
        console.log("txtValue2:",txtValue);
        
        if(txtValue.indexOf(filter2) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.dispaly ="none";
        }

      } 
      // console.log("td1:",td);
    }

    
  }
}

function textFilter(){
  
}


// document.addEventListener("DOMContentLoaded", function() {
//     var $listTbody = document.querySelector(".list1 tbody");
//     data.forEach(function(val) {
//         $listTbody.innerHTML +=
//           "<tr><td>" + val[0] 
//           + "</td><td>" + val[1]
//           + "</td><td>" + val[2]
//           + "</td><td>" + val[3]
//           + "</td><td>" + val[4]
//           + "</td><td>" + val[5]
//           + "</td><td>" + val[6]
//           + "</td></tr>";
//     });
// });
