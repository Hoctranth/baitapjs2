// ý tưởng: 
// tạo ra 1 object gồm các thành phần như:
// Số thứ tự: tự động tăng
// Biển số xe
// Loại xe
// Số giờ muốn đậu lại
function openForm() {
    document.getElementById("formPopup").style.display = "block";
}
function closeForm() {
    document.getElementById("formPopup").style.display = "none";
}

let arrListCar;
const result = document.getElementById("listCar");
var search = document.getElementById("search");
const bienso = document.getElementById('bienso');

var renderLocal = JSON.parse(localStorage.getItem('arrListCar'));
if (renderLocal) {
    arrListCar = renderLocal;
}
else {
    arrListCar = [];
}

getListCar();

function getListCar() {
    //tạo table
    render(renderLocal)
}
// kiểm tra hàm renderLocal có dữ liệu hay không


// Viết function check giá trị trong radio
function getDataRadioInput() {
    const selecRadio = document.querySelector('input[name="loaixe"]:checked')
    if (selecRadio) {
        return selecRadio.value
    }
}

function addListCar() {
    // khởi tạo object
    const objectCar = {
        bienso: bienso.value,
        loaixe: getDataRadioInput(),
        giodauxe: giodauxe.value,
        lastModify: ""
    }
    console.log(objectCar)
    var flag = searchArrListCar(arrListCar, bienso.value);
    if (flag == -1) {
        arrListCar.push(objectCar)
        localStorage.setItem('arrListCar', JSON.stringify(arrListCar));
    }
    getListCar();
    console.log(arrListCar)
}

function seachListCar() {
    var arr2 = [];
    if (search.value == "") {
        getListCar();
    } else {
        for (var i = 0; i < arrListCar.length; i++) {
            var b = arrListCar[i];
            if (b.bienso == search.value || b.loaixe == search.value) {
                arr2.push(b);
            }
        }
        console.log(arr2)
        var index = searchArrListCar(arrListCar, search.value)
        var b = arrListCar[index];
        render(arr2)
        console.log(arr2)
    }

}//valu search > 0
// index trar về -1 nếu không tim thấy
// giá trị thì trả về null 
function searchArrListCar(arrListCar1, bienso) {
    var index = -1;
    for (var i = 0; i < arrListCar1.length; i++) {
        var b = arrListCar1[i];
        if (b.bienso == bienso || b.loaixe == bienso) {
            return i;
        }
    }
    return index;
}
// index trar về -1 nếu không tim thấy
// giá trị thì trả về null 
function render(list) {
    let table = '<table border ="1"><tr><th>STT</th><th>Biển số</th><th>Loại xe</th><th>Giờ đậu xe</th><th>Thời gian cập nhật</th><th>Chức năng</th></tr>';
    list.forEach((car, index) => {
        console.log(car.bienso + "tôi là giá trị trong form")
        table += `<tr>
            <td>${index + 1}</td>
            <td>${car.bienso}</td>
            <td>${car.loaixe}</td>
            <td>${car.giodauxe}</td>
            <td>${car.lastModify || "Chưa có"}</td>
            <td>
                <button class="btn open-button" onclick="loadCar('${car.bienso}')">Sửa</button>
                <div id="formPopup-${car.bienso}" class="formPopup1">
                    <label for="bienso1">Biển số xe</label>
                    <input type="text" id="bienso-${car.bienso}" placeholder="Nhập biển số xe" name="bienso1" disabled>
    
                    <label for="loaixe1">Loại xe</label>
                    <input type="radio" class="loaixe1" name="loaixe1" value="HONDA"> HONDA
                    <input type="radio" class="loaixe1" name="loaixe1" value="MEC"> MEC
                    
                    <label for="giodau1">Giờ đậu xe</label>
                    <input type="text" id="giodauxe1" placeholder="Nhập giờ đậu xe" name="giodau1"  required>
                    
                    <button type="button" class="btn" onclick="updateCar()">Lưu</button>
                    <button type="button" class="btn btn-cancel" onclick="closeForm1(${car.bienso})">Huỷ</button>
                </div>
                <button class="btn delete-button" onclick="deleteCar()">Xoá</button>
            </td>
        </tr>`
    });
    table += `</table>`
    result.innerHTML = table;
}

const giodauxe = document.getElementById('giodauxe');
var selectBienSo = null;
function openForm1(bienso) {
    if (selectBienSo != null) {
        closeForm1(selectBienSo)
    }
    document.getElementById(`formPopup-${bienso}`).style.display = "block";
}
function closeForm1(bienso) {
    document.getElementById(`formPopup-${bienso}`).style.display = "none";
}
function loadCar(bienso2) {
    openForm1(bienso2);
    console.log(selectBienSo)
    selectBienSo = bienso2;
    var i = searchArrListCar(arrListCar, bienso2)
    if (i > -1) {
        var b = arrListCar[i];
        document.getElementById(`bienso-${b.bienso}`).value = b.bienso;
        document.getElementById('giodauxe1').value = b.giodauxe;
        const checkRadio = document.querySelector(`input[name="loaixe1"][value="${b.loaixe}"]`);
        if (checkRadio) {
            checkRadio.checked = true;
        }
    }
}
function getDataRadioInput1() {
    const selecRadio = document.querySelector('input[name="loaixe1"]:checked')
    if (selecRadio) {
        return selecRadio.value
    }
}
function updateCar() {
    var i = searchArrListCar(arrListCar, selectBienSo);
    if (i > -1) {
        var b = arrListCar[i]
        b.loaixe = getDataRadioInput1();
        b.giodauxe = document.getElementById('giodauxe1').value;
        b.lastModify = new Date().toLocaleString();
        arrListCar[i] = b;
        localStorage.setItem('arrListCar', JSON.stringify(arrListCar));
        getListCar();
        loadCar(selectBienSo)
    }
}
function deleteCar() {
    // tìm được vị trí cần xoá
    for (var i = 0; i < arrListCar.length; i++) {
        var b = arrListCar[i];
        if (b.bienso == selectBienSo) {
            arrListCar.splice(i, 1)
            localStorage.setItem('arrListCar', JSON.stringify(arrListCar));
            // arrListCar[i] = b
            getListCar();
            break;
        }
    }
    var i = searchArrListCar(arrListCar, selectBienSo);
    if (i > -1) {
        arrListCar.splice(i, 1)
        localStorage.setItem('arrListCar', JSON.stringify(arrListCar));
        // arrListCar[i] = b
        getListCar();
    }
}

