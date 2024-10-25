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

const arrListCar =[]
const result = document.getElementById("listCar");
var search = document.getElementById("search");
function addListCar(){

    //Lấy các giá trị trong các ô input
    const bienso = document.getElementById("bienso").value;
    const loaixe = document.getElementById("loaixe").value;
    const giodauxe = document.getElementById("giodauxe").value;

    // khởi tạo object
    const listCar = {
        bienso: bienso,
        loaixe: loaixe,
        giodauxe: giodauxe
    }
    console.log(listCar)
    var flag = false;
    for(var i = 0; i<arrListCar.length;i++){
        console.log(i)
        var b = arrListCar[i];
        if(b.bienso==bienso){
            flag = true;
        }
    }
    if(flag ==false){
        arrListCar.push(listCar)
    }
    getListCar();
    console.log(arrListCar)
}
console.log(search)
function getListCar(){
    //tạo table
    render(arrListCar)
}
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
    }
    
}//valu search > 0


function render(list){
    let table = '<table border ="1"><tr><th>STT</th><th>Biển số</th><th>Loại xe</th><th>Giờ đậu xe</th><th>Chức năng</th></tr>';
    list.forEach((car,index) =>{
        table += `<tr>
            <td>${index+1}</td>
            <td>${car.bienso}</td>
            <td>${car.loaixe}</td>
            <td>${car.giodauxe}</td>
            <td>
                <button class="btn open-button" onclick="updateCar('${car.bienso}')">Sửa</button>
                <button class="btn open-button" onclick="deleteCar(${index})">Xoá</button>
            </td>
        </tr>`
    });
    table+=`</table>`
    result.innerHTML=table;
}
function updateCar(bienso){
    for(var i = 0; i<arrListCar.length;i++){
        var b = arrListCar[i];
        if(b.bienso==bienso){
            console.log(arrListCar[i])
            b.bienso = 113
            console.log(b)   
            arrListCar[i] = b
            render(arrListCar)
        }
    }
}
function deleteCar(index){
    arrListCar.splice(index,1)
    getListCar();
}
console.log(arrListCar)