var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sun-dried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sun-dried tomatoes", "goat cheese", "rosemary"], containsNuts: false },
       { name: "South of the Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */

      productsICanEat = _(products).filter(function(product){
          return !_(product.ingredients).any(function(ingredient){
              return ingredient === "mushrooms";
          }) && !product.containsNuts;
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _.range(1000).reduce(function(sum, num){
                               if(num % 3 === 0 || num % 5 == 0) {
                                   sum += num;
                               }
                               return sum;
                               });

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */

      _(products).chain()
                 .map(function(product){return product.ingredients;})
                 .flatten()
                 .reduce(function(dict, ingredient){
                    if(dict[ingredient] === undefined) {
                        dict[ingredient] = 0;
                    }
                    dict[ingredient]++;
                    return dict;
                 }, ingredientCount)
                 .value();

    expect(ingredientCount.mushrooms).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it('should find the largest prime factor of a composite number', function() {
    //TODO: implement a more efficient algorithm, e.g., Pollard-Strassen

    var primeSieve = function(n) {
      var numbers = _.range(2, Math.floor(Math.sqrt(n)) + 1);
      for (var index = 0; index < numbers.length; index++) {
        if (numbers[index] === undefined) {
          break;
        }
        numbers = numbers.filter(function(candidate) {
          return candidate === numbers[index] || candidate % numbers[index] !== 0;
        });
      }
      // n may have at most one prime factor > √n, so find the next prime and include it
      var isNotPrime = function(x) {
        // a for loop might be cheaper
        return _(numbers).any(function(prime) {
          return x % prime === 0;
        });
      };
      // _.last() might be cheaper
      var i = _(numbers).max();
      while (isNotPrime(i)) {
        i++;
      }
      numbers.push(i);
      return numbers;
    };

    /* An alternative approach would be to iterate backwards through the array of primes
     * until reaching one that evenly divides n. Intuitively this should be faster, but
     * it was substantially slower during testing. Perhaps the test was flawed?
     */
    var largestPrime = function(n) {
      var primes = primeSieve(n);
      // Chaining caused extremely long run times. Why?
      var primeFactors = primes.filter(function(p) {
        return n % p === 0;
      });
      // _.last() might be cheaper
      return primeFactors.length === 0 ? n : _(primeFactors).max();
    };
    expect(largestPrime(Math.pow(2, 15) - 1)).toBe(151);
  });
  /*
  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
  });
 */
  it('should find the 10001st prime', function() {
    // Using a variation on the 'next prime' sequence in primeSieve above
    var p = function(n) {
      var primes = [];
      var i = 2;
      while (primes.length < n) {
        if (_(primes).every(function(prime) {
          return i % prime !== 0;
        })) {
          primes.push(i);
        }
        i++;
      }
      return _(primes).last();
    };
    // runs in 2.76 seconds
    expect(p(10001)).toBe(104743);
  });

});
