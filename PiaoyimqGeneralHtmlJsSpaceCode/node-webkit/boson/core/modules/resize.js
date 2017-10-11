var resize = this;
var bs, elements;
var resizeElement;
var sideBarWidth;

exports.init = function( core ) {

  bs = core.bs;
  elements = core.elements;
  sideBarWidth = core.config.sidebarWidth;

  resizeElement = window.document.createElement("div");
  resizeElement.className = "resize-element";
  resizeElement.setAttribute("draggable", "true");
  core.elements.body.appendChild(resizeElement);


  //Set sidebar width from config.
  resize.setWidthByConfig( core.config.sidebarWidth );

  resize.render();
  window.addEventListener("resize", function(e){
    resize.render();
  });

  resizeElement.addEventListener("drag", function(e){

    resize.setWidthByConfig(e.clientX);

  });
  resizeElement.addEventListener("dragend", function(e){

    bs.updateConfig("sidebarWidth", sideBarWidth);

  });

};

exports.render = function() {

  //Render the bar in the correct location.
  var sidebar_width, element_width, sidebar_offset, x;
  sidebar_width = window.getComputedStyle(elements.sidebar).width;
  element_width = window.getComputedStyle(resizeElement).width;
  x = parseInt(sidebar_width,10) - ( parseInt(element_width) );

  resizeElement.style.left = x + "px";

};

exports.setWidthByHook = function( event ) {

  if ( event.rect.width < 160 || event.rect.width > 639 ) {
    return;
  }

  var target = event.target,
    x = (parseFloat(target.getAttribute('data-x')) || 0),
    y = (parseFloat(target.getAttribute('data-y')) || 0);

  target.style.width  = event.rect.width + 'px';

  var calcString = "calc(100% - " + event.rect.width + "px)";
  elements.editorEntryPoint.style.width = calcString;
  elements.editorEntryPoint.style.left  = event.rect.width + 'px';
  elements.topbar.style.width = calcString;
  elements.topbar.style.left  = event.rect.width + 'px';

  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);

  sideBarWidth = event.rect.width;
  resize.render();

};


exports.setWidthByConfig = function( width ) {

  var ev = {};
  ev.rect = {};
  ev.rect.width = width;
  ev.target = elements.sidebar;

  resize.setWidthByHook(ev);

};
