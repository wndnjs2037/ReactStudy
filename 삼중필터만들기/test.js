    //Filtering region dropdown #1
    $('body').on("change", '#regionDropdown', function() {
        var filter, table, tr, td, i;
        filter = $(this).val(); //필터에 선택값 넣어주기
        table = document.getElementById("download-forms-table-tbody"); //바디에 붙인 태그를 통해 table에 값 tbody값 저장
        tr = table.getElementsByTagName("tr"); //tr태그 가져와서 저장
        console.log("tr", tr);
      
        if (filter == "All") { //선택한 filter값이 All이라면
            // Loop through all table rows, and show anyrows that is hidden
            for (i = 0; i < tr.length; i++) { 
                tr[i].style.display = ""; //모든 값을 보여준다
            }
        } else { //All이 아니라면 
            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) { //tr의 길이만큼 반복(표의 행 갯수)
                td = tr[i].getElementsByTagName("td")[1]; //차례대로 1번째 인덱스의 값을 가져와서 td에 저장
                console.log("td", td, i);
                if (td) { //가져온 td값이
                    if (td.innerHTML.indexOf(filter) > -1) { //일치해서 -1 보다큰 숫자를 반환한다면 
                        tr[i].style.display = ""; //해당 행은 보여준다
                    } else { //아니라면 
                        tr[i].style.display = "none"; //해당 행은 보여주지 않는다
                    }
                } else { //td값이 없다면 오류 출력
                    var a = "No Records Found!!!";
                }
            }
        }
    });

    //Filtering role dropdown
    $('body').on("change", '#roleDropdown', function() {
        var filter, table, tr, td, i;
        var regionval = $('#regionDropdown :selected').val();
        filter = $(this).val();
        console.log(filter, "filter");
        table = document.getElementById("download-forms-table-tbody");
        tr = table.getElementsByTagName("tr");
        if (filter == "All") {
            // Loop through all table rows, and show anyrows that is hidden
            for (i = 0; i < tr.length; i++) {
                tr[i].style.display = "";
            }
        } else {
            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) {
                var td1 = '';
                if (regionval != 'All') {
                    td1 = tr[i].getElementsByTagName("td")[1];
                    console.log(td1)
                }
                td = tr[i].getElementsByTagName("td")[2];
                console.log('td1' + td1)
                if (td) {
                    if (td.innerHTML.indexOf(filter) > -1) {
                        if (td1 != '') {
                            if (td1.innerHTML.indexOf(regionval) > -1) {
                                tr[i].style.display = "";
                            } else {

                                tr[i].style.display = "none";
                            }
                        }
                        if (td1 == '') {
                            tr[i].style.display = "";
                        }
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }
    });

    //Show active inactive users
    $('body').on("change", '#associateStatusDropdown', function() {
                var filter, table, tr, td, i;
                filter = $(this).val();
                table = document.getElementById("download-forms-table-tbody");
                tr = table.getElementsByTagName("tr");
                var regionval = $('#regionDropdown :selected').val();
                var roleval = $('#roleDropdown :selected').val();
                if (filter == "All") {
                    // Loop through all table rows, and show anyrows that is hidden
                    for (i = 0; i < tr.length; i++) {
                        tr[i].style.display = "";
                    }
                } else {
                    // Loop through all table rows, and hide those who don't match the search query
                    for (i = 0; i < tr.length; i++) {
                        td = tr[i].getElementsByTagName("td")[3];
                      
                    var td1 = '';
                    if (regionval != 'All') {
                        td1 = tr[i].getElementsByTagName("td")[1];
                    }

                    var td2 = '';
                    if (roleval != 'All') {
                        td2 = tr[i].getElementsByTagName("td")[2];
                    }
                        if (td) {
                            if (td.innerHTML.indexOf(filter) > -1) {
                                if (td1 != '') {
                                    if (td1.innerHTML.indexOf(regionval) > -1) {
                                        tr[i].style.display = "";
                                    } else {

                                        tr[i].style.display = "none";
                                    }
                                }
                                    if (td2 != '') {
                                        if (td2.innerHTML.indexOf(roleval) > -1) {
                                            tr[i].style.display = "";
                                        } else {
                                            tr[i].style.display = "none";
                                        }
                                    }
                                    if (td1 == '' || td2 == '') {
                                        tr[i].style.display = "";
                                    }
                                } else {
                                    tr[i].style.display = "none";
                                }
                            } else {
                                var a = "No Records Found!!!";
                            }
                        }
                    }
                });
