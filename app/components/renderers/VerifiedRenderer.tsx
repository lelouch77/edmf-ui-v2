// cell renderer class
function VerifiedRenderer() {
}

// init method gets the details of the cell to be renderer
VerifiedRenderer.prototype.init = function(params) {
    if(!params || typeof params.value === "undefined" ){
      return;
    }
    this.eGui = document.createElement('span');
    this.eGui.innerHTML =  params.value?`✔`:`✗`;
};

VerifiedRenderer.prototype.getGui = function() {
    return this.eGui;
};

export default VerifiedRenderer;