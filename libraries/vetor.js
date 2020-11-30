class Vetor{
    constructor(x1,y1,x2,y2){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    show(){
        var dx = this.x2-this.x1;
        var dy = this.y2-this.y1;
        var angle = Math.atan2(dy,dx);
        strokeWeight(2);
        stroke(255, 204, 0);
        fill(255, 204, 0, 150);
        push();
        translate(this.x2,this.y2);
        strokeWeight(0);
        textSize(15);
        // text(""+round(dx*10)/10+","+round(-dy*10)/10,5,-5);
        text(""+round(this.x2*10)/10+","+round(this.x2*10)/10,5,-5);
        rotate(angle+PI/2);
        strokeWeight(2);
        triangle(-10,25, 10,25, 0,0);
        pop();
        push();
        strokeWeight(2);
        translate(this.x1,this.y1);
        line(0,0,dx,dy);
        pop();
    }
}