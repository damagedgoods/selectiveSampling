PImage photo, photo2;
File file = new File(sketchPath()+"/data/");
String image = "p1.jpg";
int current = 1;
int total = 8;

int n1 = 25;
int n2 = 50;
int rows; 
int cols; 

void setup() {
    
  size(1000, 1000);
  background(255);
  photo = loadImage(image);
  photo.loadPixels();
  rows = photo.height / n2;
  cols = photo.width / n2; 
  photo2 = createImage(cols*n1, rows*n1, RGB);
  image(photo, 0, 0);
  for (int i= 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
      photo2.copy(photo,i*n2,j*n2,n1,n1,i*n1,j*n1,n1,n1);
    }
  }  
  image(photo2, 600, 0);
}


void mouseClicked() {
  current++;
  if (current > total) current = 1;
  image = "p"+current+".jpg";
  setup();
}
