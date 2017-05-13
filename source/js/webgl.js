//WebGL
const webglContainer = document.getElementById("webgl");

forElement(webglContainer).then(function () {
	window.onload = function() {
		Player.init();
	};

	let Player = {
		init: function() {
			//сцена
			this.container = webglContainer;
			this.scene = new THREE.Scene();

			//камера
			let aspect = this.container.offsetWidth / this.container.offsetHeight;
			this.camera = new THREE.PerspectiveCamera(45.0, aspect, 1, 1000);
			this.camera.position.z = 100;
			this.scene.add(this.camera);

			//свет
			let light = new THREE.AmbientLight();
			let pointLight = new THREE.PointLight(0xf9fbd5, 0, 200);
			pointLight.position.set(50, 50, 80);
			this.scene.add(light);
			this.scene.add(pointLight);
			//let pointLightHelper = new THREE.PointLightHelper(pointLight, 2);
			//this.scene.add(pointLightHelper);

			//рендер
			this.renderer = new THREE.WebGLRenderer();
			this.container.appendChild(this.renderer.domElement);

			//текстура
			this.texture();
			
			//запуск анимации
			this.animate();
		},

		//текстура
		texture: function() {
			let textureLoader = new THREE.TextureLoader();
			textureLoader.load("/assets/img/webgl/water.jpg", function(texture) {
				let geometry = new THREE.PlaneGeometry(177, 100, 1);
				let material = new THREE.MeshPhongMaterial({map: texture});
				Player.mesh = new THREE.Mesh(geometry, material);
				Player.scene.add(Player.mesh);
			});
		},

		//изменение размеров контейнера
		updateSize: function() {
			this.renderer.setPixelRatio(window.devicePixelRatio);
			this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
		},

		//постоянная переотрисовка сцены
		animate: function() {
			requestAnimationFrame(this.animate.bind(this));
			this.updateSize();
			//отрисовка
			this.renderer.render(this.scene, this.camera);
		}
	};
});



/*window.onload = function() {
	Player.init();
};

let Player = {
	init: function() {
		//сцена
		let container = document.getElementById("webgl");
		this.scene = new THREE.Scene();

		//оси для ориентации в пространстве
		let axisHelper = new THREE.AxisHelper(500);
		this.scene.add(axisHelper);

		//камера
		let aspect = container.offsetWidth / container.offsetHeight;
		this.camera = new THREE.PerspectiveCamera(45.0, aspect, 1, 1000);
		//отодвинуть камеру от сцены по оси Z, чтобы видно было то, что находится в начальной точке (0,0)
		this.camera.position.z = 80;
		//разместить камеру на сцене
		this.scene.add(this.camera);

		//свет
		let light = new THREE.AmbientLight(0xffffff);
		//разместить свет на сцене
		this.scene.add(light);

		let pointLight = new THREE.PointLight(0xffffff, 2, 80);
		pointLight.position.set(30, 30, 10);
		this.scene.add(pointLight);

		let pointLightHelper = new THREE.PointLightHelper(pointLight, 2);
		this.scene.add(pointLightHelper);

		//рендер
		this.renderer = new THREE.WebGLRenderer();
		//создать canvas
		container.appendChild(this.renderer.domElement);
		//размер пикселя
		this.renderer.setPixelRatio(window.devicePixelRatio);
		//размер полотна
		this.renderer.setSize(container.offsetWidth, container.offsetHeight);

		//текстура
		let textureLoader = new THREE.TextureLoader();
		textureLoader.load("/assets/img/webgl/water.jpg", function(texture) {
			//создать фигуру
			//геометрия фигуры
			let geometry = new THREE.SphereGeometry(30, 100, 100);
			//материал фигуры
			let material = new THREE.MeshPhongMaterial({map: texture});
			//сама 3D фигура
			//Player - чтобы иметь доступ к переменной из других методов
			Player.mesh = new THREE.Mesh(geometry, material);

			//разместить фигуру на сцене
			Player.scene.add(Player.mesh);
		});

		//контролы для интерактивности
		this.controls = new THREE.TrackballControls(this.camera, container);
		//настройки контрола
		this.controls.zoomSpeed = 0.2;

		//запуск анимации
		this.animate();
	},

	//постоянная переотрисовка сцены
	animate: function() {
		requestAnimationFrame(this.animate.bind(this));
		this.controls.update();
		//вращение фигуры
		Player.mesh.rotation.y += 0.005;
		//движение вдоль оси
		Player.mesh.position.z -= 0.1;
		//отрисовка
		this.renderer.render(this.scene, this.camera);
	}
};*/