// cell renderer class
function NameRenderer() {
}

// init method gets the details of the cell to be renderer
NameRenderer.prototype.init = function(params) {
    this.eGui = document.createElement('span');
	  const profileImage = params.value.image || "https://abs.twimg.com/sticky/default_profile_images/default_profile_x96.png"
    this.eGui.innerHTML = `<span><img width="32px" height="32px" style="display:inline;border-radius:50%;padding-bottom:3px" src='${profileImage}'/> ${params.value.name}</span>`;
};

NameRenderer.prototype.getGui = function() {
    return this.eGui;
};

export default NameRenderer;