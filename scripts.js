//---------------------------------------------
//НАСТРОЙКИ НА СЦЕНАТА
//---------------------------------------------

a = orbit(600, 30);
a.maxDistance = 600;
a.minDistance = 200;

background("SkyBlue");

var isMoving = false;
var speed = 0.05;
var progress = 0; // от 0 до 1


//---------------------------------------------
//ПОЛЕ ЗА НАСТРОЙКИ И БУТОНИ
//---------------------------------------------

data = {
  size: 4,
  grid: false,
  distance: false,
  changeView: otherView,
  moveFly: moveFly,
  restart: restart,
};
gui = new lil.GUI({
  title: "Настройки на полето",
  container: element("panel"),
});
gui.add(data, "size", 1, 100).name("Страна").step(0.1);
gui.add(data, "grid").name("Мрежа");
gui.add(data, "distance").name("Дължина на пътя");
gui.add(data, "changeView").name("Смени изгледа");
gui.add(data, "moveFly").name("Покажи най-краткия път");
gui.add(data, "restart").name("Рестартирай сцената");

var totalLength3D = (-15/200) * data.size; //заради първоначалното разстояние, което мухата изминава до сиренето
//---------------------------------------------
//ГРАФИЧНИ ОБЕКТИ
//---------------------------------------------

var IMG = image("https://i.ibb.co/r28sMR1W/cheese.jpg");
var GRID_IMG = image("https://i.ibb.co/3y5Z84Sg/grid.png");

cheese = cube([0, 0, 0], 200, "yellow");
cheese.image = IMG;

cheeseWireframe = cube([0, 0, 0], 200, "black").style({ hidden: true });
cheeseWireframe.image = GRID_IMG;

//за да не влизат мухите вътре в истинския куб
cheeseOutline = cube([0, 0, 0], 230, "white").style({ hidden: true });

scene3D = group(cheese, cheeseWireframe, cheeseOutline);

scene2D = group(
  square([0, 0, 0], 70, "yellow").style({ image: IMG }),
  square([0, 0, 0], 70, "black").style({ wireframe: true }),
  square([0, 70, 0], 70, "yellow").style({ image: IMG }),
  square([0, 70, 0], 70, "black").style({ wireframe: true }),
  square([0, -70, 0], 70, "yellow").style({ image: IMG }),
  square([0, -70, 0], 70, "black").style({ wireframe: true }),
  square([-70, 0, 0], 70, "yellow").style({ image: IMG }),
  square([-70, 0, 0], 70, "black").style({ wireframe: true }),
  square([70, 0, 0], 70, "yellow").style({ image: IMG }),
  square([70, 0, 0], 70, "black").style({ wireframe: true }),
  square([140, 0, 0], 70, "yellow").style({ image: IMG }),
  square([140, 0, 0], 70, "black").style({ wireframe: true }),
);

wireframe2D = group(
  square([0, 0, 0], 70, "black").style({ image: GRID_IMG }),
  square([0, 70, 0], 70, "black").style({ image: GRID_IMG }),
  square([0, -70, 0], 70, "black").style({ image: GRID_IMG }),
  square([-70, 0, 0], 70, "black").style({ image: GRID_IMG }),
  square([70, 0, 0], 70, "black").style({ image: GRID_IMG }),
  square([140, 0, 0], 70, "black").style({ image: GRID_IMG }),
);
wireframe2D.hidden = true;
scene2D.add(wireframe2D);
scene2D.x = -35;
scene2D.hidden = true;

fly = group(
  //тяло
  sphere([0, 0, 0], [15, 10, 37], "black").style({ spinV: 90 }),
  sphere([0, 20, 0], [10, 10, 10], "black").style({ spinV: 90 }),
  sphere([0, 10, 3], [12, 10, 20], "black").style({ spinV: 90 }),

  //антени
  cylinder([-0.7, 23, 0], [1.2, 4, 1.2], "black").style({ spinS: 30 }),
  cylinder([0.7, 23, 0], [1.2, 4, 1.2], "black").style({ spinS: -30 }),

  //очи
  sphere([-2.8, 22, 3], [3, 5, 3], "crimson").style({ spinS: -45, spinV: 45 }),
  sphere([2.8, 22, 3], [3, 5, 3], "crimson").style({ spinS: 45, spinV: 45 }),

  //крила
  sphere([8, -0.5, 4], [40, 1.5, 15], "#F5F5F2").style({
    spinV: 90,
    spinT: -50,
  }),
  sphere([-8, -0.5, 4], [40, 1.5, 15], "#F5F5F2").style({
    spinV: 90,
    spinT: 50,
  }),

  //пипала
  cylinder([5, 13, 2], [1, 6, 1], "brown").style({ spinS: -45 }),
  cylinder([9.2, 17, 2], [1, 6, 1], "brown"),
  cylinder([9, 22.5, 2], [1, 4, 1], "brown").style({ spinS: -45 }),

  cylinder([-5, 13, 2], [1, 6, 1], "brown").style({ spinS: 45 }),
  cylinder([-9.2, 17, 2], [1, 6, 1], "brown"),
  cylinder([-9, 22.5, 2], [1, 4, 1], "brown").style({ spinS: 45 }),

  cylinder([-9, -11, 2], [1, 6, 1], "brown").style({ spinS: -45 }),
  cylinder([-9, -16.8, 2], [1, 6, 1], "brown"),
  cylinder([-11.9, -19.4, 2], [1, 4, 1], "brown").style({ spinS: -45 }),

  cylinder([9, -11, 2], [1, 6, 1], "brown").style({ spinS: 45 }),
  cylinder([9, -16.8, 2], [1, 6, 1], "brown"),
  cylinder([11.9, -19.4, 2], [1, 4, 1], "brown").style({ spinS: 45 }),

  cylinder([-9, 10, 2], [1, 6, 1], "brown").style({ spinS: -60 }),
  cylinder([-15.8, 10, 2], [1, 7, 1], "brown").style({ spinS: -90 }),

  cylinder([9, 10, 2], [1, 6, 1], "brown").style({ spinS: 60 }),
  cylinder([15.8, 10, 2], [1, 7, 1], "brown").style({ spinS: 90 }),
);

flyClone = fly.clone;
fly.size = 0.8;
flyClone.size = 0.8;
fly.x = 230;
flyClone.x = -230;

distanceLine = line(fly.center, flyClone.center, "crimson").style({
  hidden: true,
});
scene2D.add(distanceLine);

invisible = point().style({ hidden: true });

//---------------------------------------------
//ФУНКЦИИ ЗА ПРЕВКЛЮЧВАНЕ НА ОПЦИИТЕ
//---------------------------------------------

var currentScene = 1;

function otherView(event) {
  showScene(currentScene === 1 ? 2 : 1);
}

function showScene(sceneNumber) {
  if (sceneNumber === 1) {
    restart();
    scene3D.hidden = false;
    scene2D.hidden = true;
    fly.size = 0.8;
    flyClone.size = 0.8;
    currentScene = 1;
  } else {
    restart();
    scene3D.hidden = true;
    scene2D.hidden = false;
    fly.size = 0.4;
    flyClone.size = 0.4;
    currentScene = 2;
  }
}

function toggleGrid() {
  if (data.grid) {
    cheeseWireframe.visible = true;
    wireframe2D.visible = true;
  } else {
    cheeseWireframe.visible = false;
    wireframe2D.visible = false;
  }
}

function showDistance() {
  const label = document.getElementById("distance-label");

  if (data.distance && currentScene === 2) {
    label.style.visibility = "visible";
    distanceLine.visible = true;
  } else {
    label.style.visibility = "hidden";
    distanceLine.visible = false;
  }
}

function restart() {
  clearPath();
  fly.center = startPosFly;
  flyClone.center = startPosFlyClone;
  fly.spin = [0, 0, 0, 0];
  flyClone.spin = [0, 0, 0, 0];
}

function moveFly() {
  isMoving = true;
  progress = 0;
}

//---------------------------------------------
// ИНТЕРАКТИВНОСТ
//---------------------------------------------

var draggedFly = null;
var targetPos = [0, 0, 0];
var startPosFly = [230, 0, 0];
var startPosFlyClone = [-230, 0, 0];

function onPointerDown(event) {
  draggedFly = findObject(event, [fly, flyClone]);
}

function onPointerUp(event) {
  draggedFly = null;
}

function onPointerMove(event) {
  if (!draggedFly) return;

  if (currentScene === 1) {
    var onObj = findObject(event, [cheeseOutline]);

    if (onObj && onObj.intersectData) {
      var p = onObj.intersectData.point;
      targetPos = [p.x, p.y, p.z];
    } else {
      targetPos = findPosition(event);
    }
  }
  if (currentScene === 2) {
    var p = findPosition(event);
    targetPos = [p[0], p[1], draggedFly.z];
  }
}

lastPos = null;
shortestPath = [];

function loop(t, dT) {
  toggleGrid();
  showDistance();

  //обновяване на линията в 2Д
  distanceLine.from = [fly.x + 35, fly.y, fly.z];
  distanceLine.to = [flyClone.x + 35, flyClone.y, flyClone.z];
  var d = getDistance2D(fly, flyClone);
  invisible.center = lerp(fly.center, flyClone.center, 0.5);
  p = invisible.screenPosition();
  var label = document.getElementById("distance-label");
  label.style.left = p[0] + "px";
  label.style.top = p[1] + "px";
  label.innerHTML = d.toFixed(2);

  //плавно придвижване на мухата
  if (draggedFly && targetPos) {
    draggedFly.center = lerp(draggedFly.center, targetPos, 10 * dT);

    if (currentScene === 1) {
      draggedFly.lookAt(cheese.center);
    }
  }

  //показване на най-кратък път
  if (currentScene === 1) {
    if (isMoving) {
      var label3d = document.getElementById("distance3D-label");
      if(data.distance){
        label3d.style.visibility = "visible";
      }

      var currentPos = fly.center;
      if (lastPos) {
        var segment = line(lastPos, currentPos, "crimson");
        shortestPath.push(segment);

        totalLength3D += getDistance3D(lastPos, currentPos);
        invisible.center = lerp(fly.center, flyClone.center, 0.5);
        p = invisible.screenPosition();
        label3d.style.left = p[0] + "px";
        label3d.style.top = p[1] + "px";
        label3d.innerHTML = totalLength3D.toFixed(2);
      }
      lastPos = currentPos;
      console.log(totalLength3D);

      progress += speed * dT * 2;
      if (progress >= 1) {
        restart();
        progress = 0;
        isMoving = false;
        return;
      }
      var directPath = lerp(fly.center, flyClone.center, progress);
      fly.center = getSurfacePoint(directPath, 200);
      fly.lookAt(cheese.center);
    } else {
      lastPos = null;
    }
  }
}

// функция, която намира координатите на повърхността
function getSurfacePoint(p, size) {
  var half = size / 2;
  var absX = Math.abs(p[0]),
    absY = Math.abs(p[1]),
    absZ = Math.abs(p[2]);
  var max = Math.max(absX, absY, absZ);

  if (max === absX) return [p[0] > 0 ? half : -half, p[1], p[2]];
  if (max === absY) return [p[0], p[1] > 0 ? half : -half, p[2]];
  return [p[0], p[1], p[2] > 0 ? half : -half];
}

function clearPath() {
  shortestPath.forEach((segment) => segment.style({ visible: false }));
  shortestPath = [];
  totalLength3D = (-15/200) * data.size; //заради първоначалното разстояние, което мухата изминава до сиренето
  document.getElementById("distance3D-label").style.visibility = "hidden";
}

function getDistance2D(p1, p2) {
  if (!p1 || !p2) return 0;
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;

  var dist = Math.sqrt(dx * dx + dy * dy);
  return (dist / 70) * data.size;
}

function getDistance3D(a, b) {
  var dx = a[0] - b[0];
  var dy = a[1] - b[1];
  var dz = a[2] - b[2];
  var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
  return (dist / 200) * data.size;
}

update();
