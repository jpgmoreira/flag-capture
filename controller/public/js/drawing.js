const stage = new Konva.Stage({
	container: 'container',
	width: 800,
	height: 800
});

const gridSpacing = 80;

const layer = new Konva.Layer();
const obstaclesLayer = new Konva.Layer();

stage.add(obstaclesLayer);
stage.add(layer);

const robotImg = new Image();
robotImg.src = '/assets/robot.png';

const flagImg = new Image();
flagImg.src = '/assets/flag.png';

const robot = new Konva.Image({
	x: 0,
	y: 0,
	image: robotImg,
	width: gridSpacing,
	height: gridSpacing
});

const deadRobot = robot.clone({
	offsetX: gridSpacing / 4,
	offsetY: gridSpacing / 4,
	width: gridSpacing / 2,
	height: gridSpacing / 2,
	rotation: 45
});

const flag = new Konva.Image({
	x: 0,
	y: 0,
	image: flagImg,
	width: gridSpacing,
	height: gridSpacing
});

const obstaclesDrawing = (obstacles) => {
	obstacles.forEach((obs) => {
		obstaclesLayer.add(new Konva.Rect({
			x: obs[0] * gridSpacing,
			y: obs[1] * gridSpacing,
			width: gridSpacing,
			height: gridSpacing,
			fill: 'black'
		}));
	});
	obstaclesLayer.draw();
}

const updateScreen = (state, isDead) => {
	let robotDraw = robot;
	let offset = 0;
	if (isDead) {
		robotDraw = deadRobot;
		offset = gridSpacing / 2;
	}
	robotDraw.absolutePosition({
		x: state[0] * gridSpacing + offset,
		y: state[1] * gridSpacing + offset
	});
	flag.absolutePosition({
		x: state[2] * gridSpacing,
		y: state[3] * gridSpacing
	});
	layer.add(robotDraw);
	layer.add(flag);
	layer.draw();
	layer.removeChildren();
}
