// test cases are described in fixtures.js
describe("parseJSON", function(){

  // it("should match the result of calling JSON.parse", function(){
  //   validObjects.forEach(function(obj){
  //     var result = parseJSON(JSON.stringify(obj));
  //     var equality = _.isEqual(result, obj); // why can't we use `===` here?
  //     expect(equality).toBeTruthy();
  //   });

  it("should catch simple numbers", function() {
    var test_num_string = '13450'
    var result = parseJSON(test_num_string);
    var realParse = JSON.parse(test_num_string);
    // var equality = _isEqual(result, realParse);
    expect(result).toBe(realParse);
  });

    // if you really want to stress test your code, try this...
    // extraCreditStrings.forEach(function(string){
    //   var expected = JSON.parse(string);
    //   var result = parseJSON(string);
    //   var equality = _.isEqual(result, expected);
    //   expect(equality).toBeTruthy();
    // });
  // });

  // it("should error out sometimes", function(){
  //   invalidStrings.forEach(function(test){
  //     // expect(parseJSON(test)).toBe(undefined); // you can use this test if you'd prefer
  //     expect(function(){
  //       parseJSON(test);
  //     }).toThrow();
  //   });
  // });

});
