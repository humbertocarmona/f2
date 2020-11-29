
// module aliases
let	Engine = Matter.Engine,
	Render = Matter.Render,
	Runner = Matter.Runner,
	Composite = Matter.Composite,
	Composites = Matter.Composites,
	Common = Matter.Common,
	MouseConstraint = Matter.MouseConstraint,
	Mouse = Matter.Mouse,
	World = Matter.World,
	Bodies = Matter.Bodies;


const windowX=1200,
	  windowY=1200;
let engine,
	world, 
	render, 
	runner,
	mouse;
let ground,
	boxA, boxB,
	stack;


function setup() {
	var p5c = createCanvas(windowX, windowY);
	// rectMode(CENTER);
	Matter.use(
		'matter-wrap'
	);

	
	engine = Engine.create();
	world = engine.world;
	world.gravity.y=0.3;

	render = Render.create({
		element: document.body,
		engine: engine,
		options:{
			width: windowX,
			height: windowY,
			wireframes: false,
            background: '#222',
			showVelocity: true,
			showAngleIndicator: true
		}
	});
	Render.run(render);
    runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
	// stack = Composites.stack(10, 0, 20, 3, 0, 0, function(x, y) {
    //     return Bodies.circle(x, y, random(15, 15), { friction: 0.00001, restitution: 0.5, density: 0.001 });
    // });
    // add bodies
	stack = Composites.stack(10, 0, 20, 3, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, 20, 20, { 
			friction: 0.00001, 
			restitution: 0.3, 
			density: 0.001,
			render: {
				strokeStyle: '#C44D58',
				// fillStyle: '#4ECDC4',
				fillStyle: 'transparent',
				lineWidth: 1
			} 
		});
    });


	World.add(world, stack);
	World.add(world, [
        Bodies.rectangle(200, 150, 700, 20, { 
			isStatic: true, 
			angle: Math.PI * 0.06,
			render: {
			strokeStyle: '#fff',
			fillStyle: '#111',
			lineWidth: 5
		} }),
        Bodies.rectangle(500, 350, 900, 20, { 
			isStatic: true, 
			angle: -Math.PI * 0.06,
			render: {
			strokeStyle: '#fff',
			fillStyle: '#111',
			lineWidth: 5
		} }),
        Bodies.rectangle(140, 580, 500, 20, { 
			isStatic: true, 
			angle: Math.PI * 0.06,
			render: {
			strokeStyle: '#fff',
			fillStyle: '#111',
			lineWidth: 5
		} })
    ]);

	// boxA = Bodies.rectangle(300, 610-40, 80, 80, { isStatic: true });
	// boxB = Bodies.rectangle(450, 610-40, 80, 80, { isStatic: true });
	// ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

	// World.add(world, [boxA, boxB]);
	// World.add(world, ground);

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
	// Render.lookAt(render, {
	// 	min: { x: 0, y: 0 },
	// 	max: { x: windowX, y: windowY }
	// });
    Render.lookAt(render, Composite.allBodies(world));

    // wrapping using matter-wrap plugin
    for (var i = 0; i < stack.bodies.length; i += 1) {
        stack.bodies[i].plugin.wrap = {
            min: { x: render.bounds.min.x, y: render.bounds.min.y },
            max: { x: render.bounds.max.x, y: render.bounds.max.y }
        };
	}
	
	console.log(stack);
	Engine.run(engine);
	console.log(boxA);

}

function draw() {
	// background(51);
	// push();
	// 	translate(boxA.position.x, boxA.position.y);
	// 	stroke(255);
	// 	fill(32);
	// 	rect(0,0,80,80);
	// pop();
}