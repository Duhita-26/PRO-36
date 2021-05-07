var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed;
var lastFeed;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,500);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(900,95);
  addFood.mousePressed(addFoods);

  feed = createButton("Feed the Dog");
  feed.position(800, 95);
  feed.mousePressed(feedDog)

}

function draw() {
  background(128, 246, 252);
  foodObj.display();

  //write code to read fedtime value from the database 
  feedTime = database.ref('FeedTime')
  feedTime.on("value", function(data){
    lastFeed = data.val()
    
  })
 
  //write code to display text lastFed time here
   fill(2255, 255, 254)
   textSize(20)

   if(lastFeed>=12){
     text("LAST FEED  "+ lastFeed + "PM", 300, 30)
   }else if(lastFeed==0){
    text("LAST FEED 12 AM", 350, 30)
   }
   else{text("LAST FEED "+ lastFeed + "AM", 300, 30)}
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val<=0){
     foodObj.updateFoodStock(food_stock_val*0);
  }
  else {foodObj.updateFoodStock(food_stock_val-1);}

  database.ref('/').update({
    Food : foodObj.getFoodStock(), 
    FeedTime : hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
