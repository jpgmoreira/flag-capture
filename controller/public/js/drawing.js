const stage = new Konva.Stage({
	container: 'container',
	width: 800,
	height: 800
});

const gridSpacing = 80;

const layer = new Konva.Layer();
stage.add(layer);

const obstaclesLayer = new Konva.Layer();
stage.add(obstaclesLayer);

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

const updateScreen = (state) => {
	robot.absolutePosition({
		x: state[0] * gridSpacing,
		y: state[1] * gridSpacing
	});
	flag.absolutePosition({
		x: state[2] * gridSpacing,
		y: state[3] * gridSpacing
	});
	layer.add(robot);
	layer.add(flag);
	layer.draw();
	layer.removeChildren();
}
