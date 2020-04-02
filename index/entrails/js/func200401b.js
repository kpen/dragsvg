/*   */
var svg_txts = {}

//----------------------------------------------------------------------
function upLoadSVGs(){
  var svg_names = [
	"settimeout1", "while1", "test123", 
	"test234", "test345", "tool3",  "if1", 
	"else1", "cursor1", "menu1", "for1",
    "word00", "word01", "word02", "word03", 
    "word04", "word05", "word06", "word07",
    "word08",	"if02", "equal02", "lqual02",
    "word09",	"nqual02",	"bqual02", "funct02",
    "word10",
    "word11",
    "word12", 
    "word13",
    "word14",
    "wordfon1",    "wordfon2"
  ]
  var kl23 = svg_names.length
  svg_txts = {}
 // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
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
					recur_svg_load(t23+1)
				}, 'text').fail(
				function(){
					svg_txts[svg_names[t22]] ='\
					<g id="g2892"> <circle r="5" cy="5" cx="5" id="p89" \
					style="fill:#f00;fill-opacity:1" /> </g>';
					recur_svg_load(t23+1)
				});
  }
   // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  recur_svg_load(0)
} //											end of function upLoadSVGs
//----------------------------------------------------------------------

function aDDsVG2(LN,fname,x,y,w,h){ //----------------LN - layer number 0=bottom
  
    var svgstr = svg_txts[fname]
  //var svgstr = '<g id="g2892"> <circle r="5" cy="5" cx="5" id="p89" style="fill:#f00;fill-opacity:1" /> </g>';
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
//----------------------------------------------------------------------


//----------------------------------------------------------------------

function scrList(dr,name,x,y,w,h){ //scrollList  Object
 this.a = 1
  var s = this
  s.lsX = x
  s.lsY = y
  s.lsW = w
  s.lsH = h
  s.lstw =[] //array of items of the list
  s.Nsel = -1 //the number of the selected item from the list
  s.pY = 0 //vertical bias for the list
  s.py23 = 0 //something to serve for vertical bias
  s.crTrig = 0 //a trigger to avoid multi-firing the grag_outside_event
  
  s.addItem = function(dr,nam){
  
    var sq = dr.newSquare(0,s.lsX,s.lsY,0,0);
    //boss.svGroup.add(squ.svGroup)
    sq.setPict(svg_txts[nam])
    sq.pctName = nam
	sq.svGroup.move(s.lsX,s.lsY+s.lstw.length*15)
    sq.A_move = function(dx,dy){;}
  
    s.lstw.push(sq)
	return sq
   
  }
  
    s.square = dr.newSquare(0,s.lsX,s.lsY,s.lsW,s.lsH);
    s.square.setPict(svg_txts[name])
	s.square.svGroup.move(s.lsX,s.lsY)
  
  
  	s.square.Time_move = function(x,y){
    	s.square.svGroup.move(s.square.cX,s.square.cY)
	}
  
  
  //- - - - - - - - - - - - - - - - - - - - - -
    s.square.A_down = function(x,y){
      if(Math.abs(y-s.lsY) < 15){
      s.square.statE = 1  //dragg the whole scroll-list over general-svg-field
        s.square.A_move = s.A_move2
        s.square.A_up = s.A_up2
      } else {
        s.square.statE = 0 // dragg only list of items
        s.Nsel = Math.floor((y-(s.lsY+s.pY))/15)
        console.log("lEEE="+s.lstw.length)
        s.square.A_move = s.A_move1
        s.square.A_up = s.A_up1
      }
    }
  //- - - - - - - - - - - - - - - - - - - - - -
    s.A_up1 = function(x,y){
          s.pY += s.py23;
          //console.log("pY="+y)
          s.crTrig = 0
    }
    //- - - - - - - - - - - - - - - - - - - - - -
    s.A_up2 = function(x,y){
        s.lsX=s.square.nX
        s.lsY=s.square.nY
    	s.square.setBasePos(s.square.nX,s.square.nY);
      
		for (var i =0; i< s.lstw.length; i++){
            var ob = s.lstw[i]
            
            ob.cX = ob.nX = ob.Bx = s.lsX
            ob.cY = ob.nY = ob.By = s.pY+s.lsY+i*15
         
			ob.svGroup.move(s.lsX,(s.pY+s.lsY+i*15))
			if (((s.pY+i*15) < 15) || ((s.pY+i*15)>130)){              
					ob.svGroup.hide() }
            else{	ob.svGroup.show() }
		}
	}
//- - - - - - - - - - - - - - - - - - - - - - 
  
      s.A_move2 = function(dx,dy){
            s.square.nX = s.square.Bx+dx;
    		s.square.nY = s.square.By+dy;
          	//this.N_move(this.nX,this.nY);
      }
//- - - - - - - - - - - - - - - - - - - - - -       
	//s.square.A_move = function(dx,dy){
      s.A_move1 = function(dx,dy){
//      console.log("MMMMMOVE")
      s.py23 = dy
        //pY = dy-bby;
        for (var i =0; i< s.lstw.length; i++){
            var ob = s.lstw[i]
            if ((s.Nsel === i)&&(s.crTrig ===0)){           

                  if (((ob.cX-ob.Bx) < -70)||((ob.cX-ob.Bx) > 60)){

                      aDDsVG2(0,ob.pctName, ob.cX, ob.nY, 60,15)
                      s.crTrig = 1
                      ob.cX = ob.nX = ob.Bx
                  }
                  else{
                      ob.cX = ob.nX = ob.Bx + dx;
                      ob.cY = ob.nY = (s.pY+dy+s.lsY+i*15)
                  }
			}
          
			ob.svGroup.move(ob.cX,(s.pY+dy+s.lsY+i*15))
			if (((s.pY+dy+i*15) < 15) || ((s.pY+dy+i*15)>130)){              
				ob.svGroup.hide()
            }
            else{
				ob.svGroup.show()
            }
      }
    	//square.svGroup.move(square.cX,square.cY)
	}
//- - - - - - - - - - - - - - - - - - - - - - -s.square.A_move 
  
}
//------------------------------scrList object-------------------------------




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
 

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
  
  
var scLst1 = new scrList(dr,"wordfon2",350,200,60,140)

 scLst1.addItem(dr,"funct02")
 scLst1.addItem(dr,"word01")
 scLst1.addItem(dr,"word02")
 scLst1.addItem(dr,"if02")
scLst1.addItem(dr,"nqual02")
scLst1.addItem(dr,"equal02")
 scLst1.addItem(dr,"bqual02")
 scLst1.addItem(dr,"lqual02")
  scLst1.addItem(dr,"word08") 
   scLst1.addItem(dr,"word09")
   scLst1.addItem(dr,"word10")
   scLst1.addItem(dr,"word11")
   scLst1.addItem(dr,"word12")
   scLst1.addItem(dr,"word13")
   scLst1.addItem(dr,"word14")
  scLst1.A_move1(0,0)
  aDDsVG2(1,"cursor1",310, 300,30,30)
  
//aDDsVG2(1,"wordfon1",510, 200,60,150)    
//aDDsVG2(1,"word01",410, 300,60,15)  
//aDDsVG2(1,"word02",420, 300,60,15)
//aDDsVG2(1,"word03",430, 300,60,15)
//  aDDsVG2(1,"word04",430, 300,60,15)
//  aDDsVG2(1,"word05",430, 300,60,15)
//  aDDsVG2(1,"word06",430, 300,60,15)
}

