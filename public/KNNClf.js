
//KNN regression algorithm;

function KNNClf(n){

  this.num = n;
  this.examples = [];
  this.output = [];

  //Data examples come as 2D PVectors;

  this.addExample = function(x, y){
    var obj = {x: x, value : y};
    this.examples.push(obj);
  }

  //Predict function;

  this.predict = function(x){
    var lengths = [];
    for (var i = 0; i < this.examples.length; i++){

      var other = this.examples[i];
      var d = x.dist(other.x);
      var obj = {d: d, value: other.value};
      lengths.push(obj);

    }

    //Sorting array;

    var ordered = lengths.sort( (a, b) => a.d - b.d );

    //Choosing a minimum between the value K and the number of data examples;

    var m = min(n, ordered.length);

   //Initialize an output vector;

    var output = new p5.Vector(0, 0, 0);

    for (var i = 0; i < m; i ++){
      var p = ordered[i];
      output.add(p.value);
    }

      //Returns average output;

      return output.mult(1.0/m);
  }


}
