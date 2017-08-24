
function MyObj() {
  this.stuff = "hello";
}
MyObj.prototype.message = function(){
  alert(this.stuff);
}
