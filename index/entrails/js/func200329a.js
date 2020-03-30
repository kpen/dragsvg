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
    "for1"
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
	square.svGroup.move(x,y)
	//kva1g.move(x,y);
	square.Time_move = function(x,y){
    	square.svGroup.move(square.cX,square.cY)
	}
  return square;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - -



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
  var sq23 = aDDsVG2(1,"menu1",510, 200,100,100) 
  
 // dr.Mt[1][t23].B_up0 = function(x,y){
  sq23.B_up0 = function(x,y){
      aDDsVG2(0,"for1",x,y,160,30) 
   }
  }
// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 
aDDsVG2(0,"if1",410, 250,110,30)  
aDDsVG2(0,"else1",410, 300,110,30) 
aDDsVG2(0,"while1",210, 300,110,60) 
aDDsVG2(0,"settimeout1",305, 220,110,30)  

  
//aDDsVG2(0,"test345",320, 220,40,30) 
aDDsVG2(0,"test123",400, 300,150,30)  
aDDsVG2(0,"test234",350, 300,60,30)   
aDDsVG2(0,"tool3",550, 300,40,30)  
 
  
aDDsVG2(1,"cursor1",410, 300,30,30)  
}

