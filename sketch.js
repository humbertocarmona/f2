
// module aliases
let	Engine = Matter.Engine,
	Events = Matter.Events,
	Render = Matter.Render,
	Runner = Matter.Runner,
	Composite = Matter.Composite,
	Composites = Matter.Composites,
	Common = Matter.Common,
	MouseConstraint = Matter.MouseConstraint,
	Mouse = Matter.Mouse,
	World = Matter.World,
	Body = Matter.Body,
	Bodies = Matter.Bodies,
	Vector = Matter.Vector;


const windowX=1200,
	  windowY=500;
let engine,
	world, 
	render, 
	runner,
	mouse;
let ground,
	box1;

let p5canvas;
let chao;
let carro;
// let capturing = true;

function setup() {
	p5canvas = createCanvas(windowX, windowY);

	Matter.use(
		'matter-wrap'
	);

	
	engine = Engine.create();
	world = engine.world;
	world.gravity.y=1;
	world.gravity.x=2;
    world.gravity.scale = 0.0001;

	render = Render.create({
		element: document.body,
		engine: engine,
		canvas: p5canvas.canvas,
		options:{
			width: windowX,
			height: windowY,
			wireframes: false,
			showAxes: false,
			pixelRatio: 1,
            background: '#eeeeee',
			showVelocity: true,
			showAngleIndicator: true
		}
	});
	Render.run(render);
    runner = Runner.create();
    Runner.run(runner, engine);

	// add bodies
	var floorH = 50;
	var floorY = windowY-floorH; // posição do topo do chao
	var chao = Bodies.rectangle(0.5*windowX, floorY+0.5*floorH, 2*windowX, floorH, { isStatic: true }); // floor - center of the retangle?
	
	var scale = 2.0;
	carro = Composites.car(scale*(40+25), floorY-scale*25, // posição do centro - chassi
		scale*100, // comprimento  do chassi
		scale*25,  // largura do chassi
		scale*25	// raio da roda
		)

		carro.bodies[1].render.fillStyle="#555555"; // bodies[1] = roda traseira
		carro.bodies[1].render.lineWidth=2; // bodies[1] = roda traseira
		carro.bodies[2].render.fillStyle="#555555"; // bodies[2] = roda dianteira
		carro.bodies[2].render.lineWidth=2; // bodies[1] = roda traseira
		console.log(carro);
	World.add(world, chao);
	World.add(world, carro);

   // add mouse control
    mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
	World.add(world,mouseConstraint);
   	// keep the mouse in sync with rendering
   	render.mouse = mouse;

	// fit the render viewport to the scene
	Render.lookAt(render, {
		min: { x: 0, y: 0 },
		max: { x: windowX, y: windowY }
	});

    
	Engine.run(engine);



	// esse é o equivalente da função "draw"
	// canvas = render.canvas;
	// if (capturing==true) capturer.start();

	Events.on(render, 'afterRender', function() {

		// if (capturing==true)  capturer.capture(canvas);
		// carro.bodies[1].force.x=0.01;

		var tempo = engine.timing.timestamp/100;// tempo em segundos
		tempo = int(tempo)/10;

		var x = carro.bodies[1].position.x; //posição da roda dianteira
		x = int(x);

		text("x="+x+", t="+tempo, width / 2, 10);
		if (x > windowX){
			// if (capturing==true) {
			// 	capturer.stop();
			// 	capturer.save();
			// }

			Runner.stop(runner);
			Render.stop(render);

		}

	});


	noLoop();
}

function draw() {

}