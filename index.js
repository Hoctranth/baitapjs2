// ý tưởng: 
// tạo ra 1 object gồm các thành phần như:
// Số thứ tự: tự động tăng
// Biển số xe
// Loại xe
// Số giờ muốn đậu lại
function openForm(){
    document.getElementById("formPopup").style.display="block";
}
function closeForm(){
    document.getElementById("formPopup").style.display="none";
}

let arrListCar;
const result = document.getElementById("listCar");
var search = document.getElementById("search");
const bienso = document.getElementById('bienso');

var renderLocal =JSON.parse(localStorage.getItem('arrListCar'));
if(renderLocal){
    arrListCar = renderLocal;
}
else{
    arrListCar=[];
}

getListCar();

function getListCar(){
    //tạo table
    render(renderLocal)
}
// kiểm tra hàm renderLocal có dữ liệu hay không


// Viết function check giá trị trong radio
function getDataRadioInput(){
    const selecRadio = document.querySelector('input[name="loaixe"]:checked')
    if(selecRadio){
        return selecRadio.value
    }
}


function addListCar(){
    // khởi tạo object
    const listCar = {
        bienso: bienso.value,
        loaixe: getDataRadioInput(),
        giodauxe: giodauxe.value,
        lastModify:""
    }
    console.log(listCar)
    var flag = false;
    for(var i = 0; i<arrListCar.length;i++){
        console.log(i)
        var b = arrListCar[i];
        if(b.bienso==bienso.value){
            flag = true;
            break;
        }
    }
    if(flag ==false){
        arrListCar.push(listCar)
        localStorage.setItem('arrListCar', JSON.stringify(arrListCar));
    }
    getListCar();
    console.log(arrListCar)
}
console.log(search)

function seachListCar(){
    var arr2 =[];
    if(search.value==""){
        render(arrListCar);
    }else
    {
        for(var i = 0;i<arrListCar.length;i++){
            var b = arrListCar[i];
            if(b.bienso==search.value||b.loaixe==search.value){
                arr2.push(b);
            }
        }
        console.log(arr2)
        render(arr2)
        console.log(arr2)
    }
    
}//valu search > 0


function render(list){
    let table = '<table border ="1"><tr><th>STT</th><th>Biển số</th><th>Loại xe</th><th>Giờ đậu xe</th><th>Thời gian cập nhật</th><th>Chức năng</th></tr>';
    list.forEach((car,index) =>{
        console.log(car.bienso + "tôi là giá trị trong form")
        table += `<tr>
            <td>${index+1}</td>
            <td>${car.bienso}</td>
            <td>${car.loaixe}</td>
            <td>${car.giodauxe}</td>
            <td>${car.lastModify||"Chưa có"}</td>
            <td>
                <button class="btn open-button" onclick=" openForm1(); loadCar('${car.bienso}')">Sửa</button>
                <div id="formPopup1">
                    <label for="bienso1">Biển số xe</label>
                    <input type="text" id="bienso1" placeholder="Nhập biển số xe" name="bienso1" disabled>
    
                    <label for="loaixe1">Loại xe</label>
                    <input type="radio" class="loaixe1" name="loaixe1" value="HONDA"> HONDA
                    <input type="radio" class="loaixe1" name="loaixe1" value="MEC"> MEC
                    
                    <label for="giodau1">Giờ đậu xe</label>
                    <input type="text" id="giodauxe1" placeholder="Nhập giờ đậu xe" name="giodau1"  required>
                    
                    <button type="button" class="btn" onclick="updateCar()">Lưu</button>
                    <button type="button" class="btn btn-cancel" onclick="closeForm1()">Huỷ</button>
                </div>
                <button class="btn delete-button" onclick="deleteCar()">Xoá</button>
            </td>
        </tr>`
    });
    table+=`</table>`
    result.innerHTML=table;  
}

const giodauxe = document.getElementById('giodauxe');
const bienso1 = document.getElementById('bienso1');
const loaixe1 = document.getElementById('loaixe1');
const giodauxe1 = document.getElementById('giodauxe1');

function openForm1(){
    document.getElementById("formPopup1").style.display="block";
}
function closeForm1(){
    document.getElementById("formPopup1").style.display="none";
}
var selectBienSo = null;
function loadCar(bienso2){
    selectBienSo = bienso2;
    for(var i = 0; i<arrListCar.length;i++){
        var b = arrListCar[i];
        console.log(bienso2+ " tôi là giá trị update")
        if(b.bienso==bienso2){
            console.log(arrListCar[i])
            bienso1.value = b.bienso;
            giodauxe1.value = b.giodauxe;
            const checkRadio = document.querySelector(`input[name="loaixe1"][value="${b.loaixe}"]`);
            if(checkRadio){
                checkRadio.checked=true;
            }
            break;
        }
    }
}
function getDataRadioInput1(){
    const selecRadio = document.querySelector('input[name="loaixe1"]:checked')
    if(selecRadio){
        return selecRadio.value
    }
}
function updateCar(){
    for(var i = 0; i<arrListCar.length;i++){
        var b = arrListCar[i];
        if(b.bienso==selectBienSo){
            b.loaixe = getDataRadioInput1();
            b.giodauxe = giodauxe1.value;
            b.lastModify = new Date().toLocaleString();
            arrListCar[i] = b;
            localStorage.setItem('arrListCar', JSON.stringify(arrListCar));
            getListCar();
            loadCar(selectBienSo)
            break;
        }
    }
}
function deleteCar(){
    // tìm được vị trí cần xoá
    for(var i = 0; i< arrListCar.length; i++){
        var b = arrListCar[i];
        if(b.bienso == selectBienSo){
            arrListCar.splice(i,1)
            localStorage.setItem('arrListCar', JSON.stringify(arrListCar));
            // arrListCar[i] = b
            getListCar();
            break;
        }
    }
}

