/*    ToDo: Old code, update to be better.         -Erik*/var NUMBER_OF_IMAGES = 0;var IMAGE_TIMEOUT = 5000;var OPACITY_DELTA = 1;var FADE_RATE     = 5;var DIRECTION     = 0;var which_image_loaded = 0;var next_image = 0;var image_ready = true;var imageId = 'gallery';var textId = 'gallerytxt';var image;var text;var next;var images;//document.write("<style type='text/css'>#" + imageId + " {visibility:hidden;}</style>");//document.write('<table border="0" cellspacing="0" cellpadding="0" style="visibility:hidden; width: 0%; height:0%;"><tr><td>');//document.write('<img style="visibility:hidden; width: 0px; height: 0px;" id="' + imageId + '_next" alt="" src="">');//document.write('</td></tr></table>');function load(img_now,img_next) {    image.style.background= "url("+images[img_now].image_b+") no-repeat 50%";    setOpacity(image, 100);    //image.style.zIndex = -1;    //$('.float').html("<h4>"+images[img_now].title+"</h4>");    // $('.main-image-div').click( function() {    // 	window.location = images[img_now].link;    // });    text.innerHTML = "<h4>"+images[img_now].title+"</h4>";    next.style.background = "url("+images[img_next].image_b+") no-repeat 50%";    //next.style.zIndex = -2;    //alert("Loaded!");}function initialize(allimages) {    images = allimages;    if (DIRECTION==0) {	which_image_loaded = generateRandom(-1);	next_image = generateRandom(which_image_loaded);    }    if (DIRECTION==-1) {	which_image_loaded = images.length - 1;	next_image = images.length - 2;    } else if (DIRECTION==1) {	next_image = 1;    }    if (document.images) {	image   = document.getElementById( imageId );	next    = document.getElementById( imageId + '_next' );		text    = document.getElementById( textId );	setOpacity(next, 0);	load(which_image_loaded,next_image);//	image.src = images[which_image_loaded].link;//	next.src  = images[next_image].link;	//initImage();	nextImage();    }    //alert("initialized!");}function generateRandom(current) {    var ran_number=current;    while (ran_number == current) {	ran_number=Math.round(Math.random()*(images.length-1));    }    return ran_number;}function changeImage(direction) {    which_image_loaded = next_image;    next_image += direction;    if (direction==0) {	next_image = generateRandom(next_image);    }	    if (next_image < 0)	next_image = images.length - 1;    if (next_image == images.length)	next_image = 0;	    exitImage();    setTimeout( "nextImage()",((100/OPACITY_DELTA)+1)*(FADE_RATE+1) );}function nextImage() {    if (!image_ready) {	setTimeout( "nextImage()", FADE_RATE );	return;    }    setOpacity(next, 100);    load(which_image_loaded,next_image);//    image.src = next.src;//    next.src  = images[next_image].link;	    //initImage();    setTimeout( "waitImage()",((100/OPACITY_DELTA)+1)*(FADE_RATE+1) );}function waitImage() {    if (!image_ready) {	setTimeout( "waitImage()", FADE_RATE );	return;    }    setTimeout( "changeImage(DIRECTION)", IMAGE_TIMEOUT );}function initImage() {    image_ready = false;    setOpacity(image, 0);//    image.style.visibility = "visible";    fade(imageId,0,OPACITY_DELTA);}function exitImage() {    image_ready = false;    setOpacity(image, 100);//    image.style.visibility = "visible";    fade(imageId,100,-OPACITY_DELTA);}function fade(objId,opacity,delta) {    if (document.getElementById) {	obj = document.getElementById(objId);	if (!obj) {	    alert("NO OBJ!");	}	if ( opacity <= 100 && opacity >= 0 ) {	    setOpacity(obj, opacity);	    opacity += delta;	    window.setTimeout("fade('"+objId+"',"+opacity+","+delta+")", FADE_RATE);	} else {	    image_ready = true;	}    }}function setOpacity(obj, opacity) {    opacity = (opacity == 100)?99.999:opacity;    // // IE/Win    // obj.style.filter = "alpha(opacity:"+opacity+")";    // // Safari<1.2, Konqueror    // obj.style.KHTMLOpacity = opacity/100;    // // Older Mozilla and Firefox    // obj.style.MozOpacity = opacity/100;    // // Safari 1.2, newer Firefox and Mozilla, CSS3    obj.style.opacity = opacity/100;}