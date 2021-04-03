//Create variables here
var dog, happyDog, database, foods, foodStock, dogimg, happyDogimg, feed, addFood,lastFed;
function preload()
{
  //load images here
  dogimg = loadImage("images/dogImg.png");
  happyDogimg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  dog = createSprite(250,250,10,10);
  dog.addImage(dogimg);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readstock)
  dog.scale = 0.25;
  foodClass = createSprite();
  feed = createButton("feedTheDog")
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood = createButton("AddFood");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  foodObj = new Food();
}


function draw() {  
  background(46,139,87);
  

  drawSprites();
  //add styles here
  fill(255,255,254);
  textSize()
  if(lastFed>=12){
    text("Last Fed : "+lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
    text("Last Fed : 12 AM",350,30);
  }else{
    text("Last Fed : "+ lastFed + "AM",350,30);
  }
fedTime=database.ref('FeedTime')
fedTime.on("value",function(data){
  lastFed=data.val();
})
}

function readstock(data){
foods = data.val()
}

function writeStock(x){
  if(x>=0){
    x = 0
  } else{
    x = x-1;
  }

  database.ref('/').update({
    Food : x
  });
}

function feedDog(){
  dog.addImage(happyDogimg);

 foodObj.updateFoodStock(foodObj.getFoodStock()-1);
 database.ref('/').update({
   food:foodObj.getFoodStock(),
   FeedTime:hour()
 }) 
}

function addFoods(){
  foods++;
  database.ref('/').update({
    Food:foods
  })
}