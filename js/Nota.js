function Nota(id,time,color,duration){
  this.id = id;
  this.time = time;
  this.color = color;
  this.duration = duration;
}

Nota.prototype = {
  getElement: function(){
    this.element = document.createElement("div");
    this.element.onmousedown =
    function(e){
      color = this.color;
      if(color!=null){
        document.querySelector("#"+color).style.webkitTransform = "rotateX(1deg)";
        document.querySelector("#c-f-"+color).style.webkitTransform = "scale(1.7)";
        for(i = 0;i<notas_c[color].length;i++){
          if((notas_c[color][i] >= new Date().getTime()-intial-150) && (notas_c[color][i] <= new Date().getTime()-intial+150) && !clicked_n[color]){
            notas_c[color][i] = 0;
            pontos.acertos++;
            act_next = true;
            clicked_n[color] = true;
          }
        }
      }
    }
    this.element.onmouseup=
    function(e){
      color = this.color;
      if(color!=null){
        document.querySelector("#"+color).style.webkitTransform = "rotateX(6deg)";
        document.querySelector("#c-f-"+color).style.webkitTransform = "scale(1)";
        if (!act_next){
          updateScore();
        }
        clicked_n[color] = false;
        act_next = false;
      }
    }
    var v = this.element;
    var n = this;
    var id = this.id;
    var color = this.color;
    var acert = this.acertou;
    v.id = "n"+this.id;
    v.setAttribute('class', 'nota nota-'+this.color);
    v.addEventListener("webkitTransitionEnd", function(){
      pontos.notas++;
      updateScore();
      v.remove();
      delete v;
      delete n;
    }, true);
    v.addEventListener("transitionend", function(){
      pontos.notas++;
      updateScore();
      document.getElementById(this.color).removeChild(v);
      delete v;
      delete n;
    }, true);
    return v;
  },
  goNota: function(intial){
    var id = this.id;
    var color = this.color;
    var n = this;
    var e = this.getElement();
    this.time +=  new Date().getTime() - intial ;
    var to1 = window.setTimeout( 
      function(){
        document.getElementById(color).appendChild(e);
        var to2 = window.setTimeout( function(){
          e.setAttribute('class', e.getAttribute('class')+' go-nota');
          delete to1;
          delete to2;
        },100);
      } 
      ,  this.time - 1600 );
  }
}