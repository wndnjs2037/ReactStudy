const isSuccess = [1,1,0,0,0,0];
console.log(isSuccess, "isSuccess", typeof(isSuccess));


// 트루이면 해당 값을 뽑아서 새로운 배열에 추가하는 함수
function isTrue(element){

	return (element === 1);
}

//console.log(isSuccess.some(isTrue));

const found = isSuccess.map((element) => {
	return element === 1 ? true : false;
})

// F와 T값으로 분류하여 배열 새로 생성
const filter_isTrue = isSuccess.filter((value)=> {return value == true }); 
const filter_isFalse = isSuccess.filter((value)=> {return value == false }); 
console.log(filter_isTrue, typeof(filter_isTrue));
console.log(filter_isFalse, typeof(filter_isFalse));

const result = [];
// for문으로 생성한 배열을 번갈아 순회하며 하나씩 요소를 뽑아서 새로운 배열에 저장


// 두개 배열의 총 길이 따로 구하기
const filter_length = [ 
	...filter_isTrue,
  ...filter_isFalse
  ];
  
console.log(filter_length.length, "filter_length");

// 번갈아 가면서 값 가져오기
for(let i = 0; i < filter_length.length; i++) {
	result.push(filter_isTrue[i]);
  result.push(filter_isFalse[i]);
  
}

// undefined 값 제거하기
result_new = result.filter(function(item){
	return item !== undefined;
});

console.log(result, "result");
console.log(result_new, "result_new");

// test 
const a = [1,1,1];
const b = [0,0,0];

let test = filter_isTrue.map((element, index) => {
			console.log(element, "filter_isTrue의 값"); 
      console.log(filter_isFalse[index], "filter_isFalse의 값");
      });
      
console.log(test);

let c = [];
a.forEach(function(e, i){
	if(e == 1){
  	c.push(e);
  }
  if(e == 0){
  	c.push(b[i]);
  }
});
console.log(c, "c");
