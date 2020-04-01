/*   */

  var svg_txts = {}
function upLoadSVGs(){
  var svg_names = [
	"settimeout1",   
	"while1", 
	"test123", 
	"test234", 
    "test345",
	"tool3",  
	"if1", 
	"else1",
	"cursor1",
    "menu1",
    "for1",
    "word00",    
    "word01",
    "word02",    
    "word03",
    "word04",
    "word05",
    "word06",
    "word07",
    "word08",
    "word09",
    "word10",
    "word11",
    "word12", 
    "word13",
    "word14",
    "wordfon1"
  ]
  var kl23 = svg_names.length
  svg_txts = {}
  
 function recur_svg_load(t22){  
  		var t23=t22; 
  		if (t23 >= kl23){ makeSVGobjects(); return; } 

			$.get("index/svgfiles/"+svg_names[t22]+".svg?nocach="
                  +Math.random()*10000, 
                    function(svg) {
	
	svg = svg.match(/<svg([^>]+)([\s\S]*)<\/svg>/)[2];
	svg = svg.substring(1);
	
	svg = svg.replace(/<sodipodi([^>]+>)/g,"\n");	
	
    svg_txts[svg_names[t22]] = svg
	///console.log("svg-success")	
    recur_svg_load(t23+1)
	}, 'text').fail(
    function(){
      svg_txts[svg_names[t22]] ='\
			<g id="g2892"> <circle r="5" cy="5" cx="5" id="p89" \
			style="fill:#f00;fill-opacity:1" /> </g>';
      ///console.log("svg-error=")	
      recur_svg_load(t23+1)
      });
    } 
  recur_svg_load(0)
} //function upLoadSVGs


function aDDsVG2(LN,fname,x,y,w,h){ //----------------LN - layer number 0=bottom
    var svgstr = svg_txts[fname]
  //var svgstr = '<g id="g2892"> <circle r="5" cy="5" cx="5" id="p89" style="fill:#f00;fill-opacity:1" /> </g>';
      
  
  //  console.log("SSS="+svgstr)
	//var square = dr.newSquare(LN,x,y,w,h);  
    console.log("JUMP")
    let square = dr.newSquare(LN,x,y,w,h);
    square.setPict(svgstr)
    square.pctName = fname
	square.svGroup.move(x,y)
	//kva1g.move(x,y);
	square.Time_move = function(x,y){
    	square.svGroup.move(square.cX,square.cY)
	}
  return square;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - -



var lsX = 510;
var lsY = 200;
var py23 = 0;
var pY = 0;
var Nsel = -1;
var crTrig = 0;

function makeSVGobjects(){
  
 
// - - - - - - - - - pan as background - - - - - - - - - -

  dr.Mt[0][0].Time_move = function(x,y){
   dr.ESX_0 += (dr.Mt[0][0].cX - dr.Mt[0][0].nX)//*dr.kf_DR;
   dr.ESY_0 += (dr.Mt[0][0].cY - dr.Mt[0][0].nY)//*dr.kf_DR;
   dr.DRW_0();    
  }
  dr.Mt[0][0].B_up2 = function(x,y){
  dr.Mt[0][0].setBasePos(0,0);
  }
  
  dr.Mt[0][0].B_up0 = function(x,y){
 // var sq23 = aDDsVG2(1,"menu1",510, 200,100,100) 
  
 // dr.Mt[1][t23].B_up0 = function(x,y){
//  sq23.B_up0 = function(x,y){
 //     aDDsVG2(0,"for1",x,y,160,30) 
 //  }
  }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 
//aDDsVG2(0,"if1",410, 250,110,30)  
//aDDsVG2(0,"else1",410, 300,110,30) 
//aDDsVG2(0,"while1",210, 300,110,60) 
//aDDsVG2(0,"settimeout1",305, 220,110,30)  

  
//aDDsVG2(0,"test345",320, 220,40,30) 
//aDDsVG2(0,"test123",400, 300,150,30)  
//aDDsVG2(0,"test234",350, 300,60,30)   
//aDDsVG2(0,"tool3",550, 300,40,30)  
 
//aDDsVG2(1,"cursor1",410, 300,30,30)
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
function add2List(nam){
    let squ = dr.newSquare(1,lsX,lsY,60,15);
    squ.setPict(svg_txts[nam])
    squ.pctName = nam
	squ.svGroup.move(lsX,lsY)
    squ.A_move = function(dx,dy){;}
  
	return squ
} 
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
function wordfon1a(){
  
  lstw = []
console.log("ls="+lsX+","+lsY)
    let square = dr.newSquare(1,lsX,lsY,60,140);
    square.setPict(svg_txts["wordfon1"])
	square.svGroup.move(lsX,lsY)
	lsX = 510; lsY = 200
  
      square.A_down = function(x,y){
        Nsel = Math.floor((y-(lsY+pY))/15)
        console.log(Nsel+"-!")
        		//bbx = x; bby = y
    }
  
        square.A_up = function(x,y){
//pY -= (bby - y)*0.5;
          pY += py23;
          console.log("pY="+y)
          crTrig = 0
    }
//- - - - - - - - - - - - - - - - - - - - - -       
	square.A_move = function(dx,dy){
      py23 = dy
        //pY = dy-bby;
        for (var i =0; i< 15; i++){
          if ((Nsel === i)&&(crTrig ===0)){
           
            
            if (((lstw[i].cX-lstw[i].Bx) < -70)||((lstw[i].cX-lstw[i].Bx) > 90)){
              
                          aDDsVG2(0,lstw[i].pctName,lstw[i].cX, lstw[i].nY,60,15)
              crTrig = 1
            lstw[i].cX = lstw[i].nX = lstw[i].Bx
              

              
            }
            else
            {lstw[i].cX = lstw[i].nX = lstw[i].Bx + dx;
             lstw[i].cY = lstw[i].nY = (pY+dy+lsY+i*15)
            }
            
            
          }
          
      		lstw[i].svGroup.move(lstw[i].cX,(pY+dy+lsY+i*15))
          
          
            if (((pY+dy+i*15) < 0) || ((pY+dy+i*15)>130)){              
              lstw[i].svGroup.hide()
            }
            else{
              lstw[i].svGroup.show()
            }
      }
    	//square.svGroup.move(square.cX,square.cY)
	}
  
  
 lstw[0] = add2List("word00")
  lstw[1] = add2List("word01")  
   lstw[2] = add2List("word02")
  lstw[3] = add2List("word03")
  lstw[4] = add2List("word04")
  lstw[5] = add2List("word05")
  lstw[6] = add2List("word06")
  lstw[7] = add2List("word07")
  lstw[8] = add2List("word08")
  lstw[9] = add2List("word09")
  lstw[10] = add2List("word10")
    lstw[11] = add2List("word11")
    lstw[12] = add2List("word12")
    lstw[13] = add2List("word13")
    lstw[14] = add2List("word14")

  return square;
}
  
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
wordfon1a().A_move(0,0) 
  
//aDDsVG2(1,"wordfon1",510, 200,60,150)    
//aDDsVG2(1,"word01",410, 300,60,15)  
//aDDsVG2(1,"word02",420, 300,60,15)
//aDDsVG2(1,"word03",430, 300,60,15)
//  aDDsVG2(1,"word04",430, 300,60,15)
//  aDDsVG2(1,"word05",430, 300,60,15)
//  aDDsVG2(1,"word06",430, 300,60,15)
}

