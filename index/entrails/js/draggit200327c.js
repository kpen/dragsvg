//>>-drg191102.js
/*
requires jquery...
just do in index.html
<script src="js/draggit180219.js"></script>
and write ... somewhere:  var dr = new draggit;
  
*/
var superDX = 0; 
var superDY = 0;
//>>-square() - - - - - - - - - - - - - - -
function square(boss,x1,y1,wi,he){ /*->square_object*/
	this.boss = boss;
  this.Bx=this.cX=x1; /*->initiate_x_y_w_h*/
  this.By=this.cY=y1; 
  this.nX=x1;
  this.nY=y1;
  this.wi=wi; this.he=he; 
  this.pressed=0;
  this.draG=false;
  this.visible = false;//don't know yet what for
  this.active = true; /*<-*/

//this.pont = diVo;
//pont.move(this.nX, this.nY); //using SVGJS - move "the tool" to the actual XY-position

  this.setSize = function(wi,he){
    	this.wi=wi; this.he=he;   
  }
  this.setBasePos = function(x23,y23){
    	this.Bx=this.cX=this.nX=x23; 
    	this.By=this.cY=this.nY=y23;
            this.Time_move(x23,y23);
  }
  this.setCurrentPos= function(nx,ny){
        this.Time_move(nx,ny);
        this.cX=this.nX; 
    	this.cY=this.nY;
  }
  this.setOff = function(){
    	this.active = false;
    	$(this.id).hide();
  }
  this.setOn = function(){
    	this.active = true;
    	$(this.id).show();
  }
  

  this.B_down = function(x,y){;}
  this.B_up0 = function(x,y){;}
  this.B_up2 = function(x,y){;}
  this.N_move = function(x,y){;}
  this.Time_move = function(x,y){;}
  
  
//>>-G_down - - - - - - - - - - - - - - - - - - - -  
  this.G_down = function (x,y) {
    console.log(x+","+y+"\n"+this.Bx+","+this.By+"\n"+this.wi+","+this.he)
    if ((x > this.Bx) && (x < this.Bx+this.wi) &&
  (y > this.By) && (y < this.By+this.he) ){
            $('#indic').css({'background-color':'#090909'});

      this.draG=true;
      this.A_down(x,y);
      this.B_down(x,y);
      return false;
  }
    else {return true;}

}
//>>-G_move - - - - - - - - - - - - - - - - - - - - 
  this.G_move = function (dx,dy) {
    	if (this.draG){
    		this.nX = this.Bx+dx;
    		this.nY = this.By+dy;
          	this.N_move(this.nX,this.nY);
    	}
    }
//>>-G_up - - - - - - - - - - - - - - - - - - - - -
  this.G_up = function (x,y) {
    if (this.draG){
      
          $('#indic').css({'background-color':'#FFFFF6'});
    this.draG=false;
      
               // var ob = s.M[i];
               // if ((ob.nX!=ob.cX) || (ob.nY!=ob.cY)) {
                        //ob.setCurrentPos(this.nX,this.nY);
                        //console.log("i="+i);
              //  }
    this.setBasePos(this.nX,this.nY);
    if (boss.mousePath > -4){this.B_up0(x,y);}
      					else {this.B_up2(x,y);}
    }
  }
//>>- - - - - - - - - - - - - - - - - - - - -
  this.A_down = function(x,y){
  this.Bx=this.cX;
  this.By=this.cY;
   }

//  -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
}

//>>-draggit() --------------------------------------------------
function draggit(name,wTH,hTH,draw, draw2){
  
 this.host_div = document.getElementById(name); //where to put our new divs
 this.name = name;

  this.pressed=0;
  this.Mx=0; this.My=0;
  //this.visible = false;//don't know yet what for
  this.active = true; /*<-*/

 this.mousePath = -1; //did user moved the mouse between btnDOWN and btnUP
 this.tOuched = -1; //the number of the 'selected' square in M[]array 

 this.dMx = 0;
 this.dMy = 0;
 this.DX = $(this.host_div).offset().left; 
 this.DY = $(this.host_div).offset().top;
 var s = this;
  

  	this.down1 = function(){;}
	this.move1 = function(x,y){;}
	this.move2 = function(x,y){;}
	this.up1 = function(x,y){;}
	this.up2 = function(x,y){;}
  	this.up3 = function(x,y){;}
	this.up4 = function(x,y){;}
  
    this.M = []
    this.M[0] = new square(this, -1, -1, 0, 0); //will be background
  
  this.svgLinks; //for showing and hiding golink rectangles
this.lnks=[];  //lnk objects to compare coordinates
this.countSvgLinks = 0; //the counter for lnk objects
  
  /*this.M[0] = new square(this, 250, 250,150,150);
  this.M[0].B_move = function(x,y){this.boss.move1(x,y);}
  this.M[0].setCurrentPos(250,250);
  
  this.M[1] = new square(this, 0, 0,1500,1500);
  this.M[1].B_move = function(x,y){this.boss.move2(x,y);}
  this.M[1].setCurrentPos(0,0);
  this.M[1].A_up = function(x,y){console.log("Bx="+this.Bx);}
    this.M[1].A_down = function(x,y){console.log("Bx="+this.Bx);}
  */
  //>>-svg_SX_TO - - - - - - - - - - 
  this.ESX_TO = wTH/2;
  this.ESY_TO = hTH/2;
  this.kf_TO = 0.5;
  this.draw_TO = draw;
  this.wTH = wTH;
  this.hTH = hTH;
// - - - - - - - - - - - - - - - - - - - - - - - - - - 
  this.ESX_DR = wTH/2;
  this.ESY_DR = hTH/2;
  this.kf_DR = 0.5;
  this.draw_DR = draw2;
// - - - - - - - - - - - - - - - - - - - - - - - - - - 
  //s.draw = SVG(s.name).size(s.wTH, s.hTH);
// - - - - - - - - - - - - - - - - - - - - - - - - - -   
  this.DRW_TO = function(){
    s.draw_TO.viewbox(s.ESX_TO-s.kf_TO*s.wTH/2,
    s.ESY_TO-s.kf_TO*s.hTH/2,s.wTH*s.kf_TO, s.hTH*s.kf_TO);}
// - - - - - - - - - - - - - - - - - - - - - - -
    this.DRW_DR = function(){
    s.draw_DR.viewbox(s.ESX_DR-s.kf_DR*s.wTH/2, s.ESY_DR-s.kf_DR*s.hTH/2,
    s.wTH*s.kf_DR, s.hTH*s.kf_DR);}
// - - - - - - - - - - - - - - - - - - - - - - -
this.clcX = function (x){return /*Math.round*/(s.ESX_DR+(x-s.wTH/2)*s.kf_DR);}
this.clcY = function (y){return /*Math.round*/(s.ESY_DR+(y-s.hTH/2)*s.kf_DR);}

//----------------------------------------------------------------------
  this.GRopenSvG = function(namE){
   var kva1g = s.draw_DR.group();
console.log(s.name+"=OPEN2="+namE)
    
$.get("index/svgfiles/" + namE+".svg?nocach="+Math.random()*10000, 
      function(svg) {
	
	svg = svg.match(/<svg([^>]+)([\s\S]*)<\/svg>/)[2];
	svg = svg.substring(1);
	
	svg = svg.replace(/<sodipodi([^>]+>)/g,"\n");	
	
	///console.log(svg);
	//s.draw_DR.clear();
	//s.draw_DR.svg(svg);
    kva1g.svg(svg)
  	//ictures[0] = svg; //for switching SVG-picture (Picture_Link)


	
	}, 'text').fail(
    function(){
   kva11 = s.draw_DR.circle(80).fill("#FF5500"); //.opacity(0.8);  
   kva1g.add(kva11)
      });
    
return kva1g    
    

}  
//------------------------------------------------------
  this.newSquare = function(N, x, y, w, h){
    	this.M[N] = new square(this, x, y, w, h);
   
    }  
  
  
  
//------------------------------------------------------  
  //>>-touchEvents
this.touchAndTimeEvents = function(div23){ /*->touchEvents_*/
NeedMove();
 console.log("222DX="+this.DX+"  DY="+this.DY)
  superDX = this.DX; superDY = this.DY; 
//-------------------------------------------------------------------
    document.addEventListener('touchmove', function(event) {
		G_move(event.changedTouches[0].pageX-superDX,
               event.changedTouches[0].pageY-superDY);
        event.preventDefault();
    }, {passive: false});
//-------------------------------------------------------------------
	document.addEventListener('touchstart', function(event) {
      //eHub.Move =  
      dr = s;
      Whos_Touched(event.changedTouches[0].pageX-superDX,
               event.changedTouches[0].pageY-superDY,
                   s);
		//G_Down(event.changedTouches[0].pageX-superDX,
         //      event.changedTouches[0].pageY-superDY);
		event.preventDefault();
  }, {passive: false});
 //-------------------------------------------------------------------
 	 document.addEventListener('touchend', function(event) {
		G_up(event.changedTouches[0].pageX-superDX,
             event.changedTouches[0].pageY-superDY);
        event.preventDefault();
    }, {passive: false});
 //-------------------------------------------------------------------
 	 document.addEventListener('mousedown', function(event) {
       dr = s;
       console.log(superDX+">DOWN<"+superDY)
		///G_Down(event.pageX-superDX,event.pageY-superDY);
       Whos_Touched(event.pageX-superDX,event.pageY-superDY,
                   s);
        event.preventDefault();
    }, true);
 //-------------------------------------------------------------------
	 document.addEventListener('mouseup', function(event) {
       console.log("UP")
		 G_up(event.pageX-superDX,event.pageY-superDY);
        event.preventDefault();
    }, true);
 //-------------------------------------------------------------------
	document.addEventListener('mousemove', function(event) {
      console.log("MOVE")
		G_move(event.pageX-superDX,event.pageY-superDY);
		event.preventDefault();
    }, true);
 //-------------------------------------------------------------------

 //-------------------------------------------------------------------
function G_move(x,y){
   if(s.mousePath >= 0){s.mousePath++;}
  // s.dMx = x-s.Mx; 
  // s.dMy = y-s.My;
     s.dMx = (x-s.Mx)*s.kf_DR; 
   s.dMy = (y-s.My)*s.kf_DR;
  if (s.tOuched >=0){
    //console.log("s.tOuched="+s.tOuched);
   s.M[s.tOuched].G_move(s.dMx,s.dMy);
  }
}
 //-------------------------------------------------------------------
function G_up(x,y){
  //console.log("PUNY3");

   s.mousePath = (-1)*s.mousePath;
	s.M[s.tOuched].G_up(x,y);
	s.tOuched = -1;
	s.mousePath = -1;
  
  if (kan23!=undefined){kan23.remove();}
}
 //---------------------------------------------------------------

  
function NeedMove(){
for (var i = 0; i < s.M.length; i++){
  if (s.M[i]!== undefined) {
          var ob = s.M[i];
                if ((ob.nX!=ob.cX) || (ob.nY!=ob.cY)) {
                        ob.setCurrentPos(ob.nX,ob.nY);
                        //console.log("i="+i);
                }
  }
  }
setTimeout(NeedMove,50);
}

 //-----------------------------------------------------
 }

this.touchAndTimeEvents();

}//function_draggit()
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

//-------------------------------------------------------------------  
kan23 = undefined
function Whos_Touched(x,y,s){
 
 // kva = s.draw_DR.circle(50).fill("#000000").opacity(0.2).move(s.clcX(x),s.clcY(y)); //.opacity(0.8);
  
  s.mousePath = 0;
  s.Mx = x; 
  s.My = y;
  var j23 = s.M.length-1;
  for (; j23 > 0; j23--) {
		if(!s.M[j23].G_down(s.clcX(x),s.clcY(y))){
          kan23 = s.draw_DR.rect(s.M[j23].wi,s.M[j23].he).
          fill("none").stroke({width:1,color:"green"}).
          move(s.M[j23].Bx,s.M[j23].By)
        	break;
		}
  }
  if (j23 == 0){
    s.M[0].draG = true;
    s.M[0].A_down(x,y);
	}
  console.log(x+">>"+j23+"<<"+y)     
  s.tOuched = j23;
}
 //-------------------------------------------------------------------

