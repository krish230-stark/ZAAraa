let phone = "918318812301";

function openModal(name, price, desc){
document.getElementById("modal").style.display="flex";

document.getElementById("mName").innerText=name;
document.getElementById("mPrice").innerText=price;
document.getElementById("mDesc").innerText=desc;

let msg = encodeURIComponent("Namaste! Mujhe "+name+" ("+price+") order karna hai.");
document.getElementById("orderBtn").href="https://wa.me/"+phone+"?text="+msg;
}

function closeModal(){
document.getElementById("modal").style.display="none";
}

window.onclick=function(e){
if(e.target==document.getElementById("modal")){
closeModal();
}
}