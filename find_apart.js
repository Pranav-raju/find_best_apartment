var blocks = [
    {
      gym: false,
      school: true,
      store: false,
    },
    {
      gym: true,
      school: false,
      store: false,
    },
    {
      gym: true,
      school: true,
      store: false,
    },
    {
      gym: false,
      school: true,
      store: false,
    },
    {
      gym: false,
      school: true,
      store: true,
    },
  ];
  
  var reqs = ["gym", "school", "store"];
  
  apartmentHunting(blocks,reqs);
  
  
  
  // function to return the short_listed blocks
  
  function apartmentHunting(blocks,reqs) {
    var scores = [];
    blocks.map((block) => {
      scores.push(getScore(block, reqs));
    });
  
    let max_score = findMax(scores);
  
    short_list(scores, max_score);
  }
  
  
  
  //function to get score of each block depending on satisfying reqs
  function getScore(block, reqs) {
      var point = 0;
      var missing = [];
      reqs.map((req) => {
        if (block[req] == true) {
          point++;
        } else {
          missing.push(req);
        }
      });
    
      return { missing: missing, score: point };
  }
  
  // finds the max of scores of blocks a/c to missing reqs
  
  function findMax(arr) {
      var max = arr[0].score;
      arr.map((ele) => {
        max = max >= ele.score ? max : ele.score;
      });
      return max;
  }
  
  
  
  //shortlists the blocks who has the max_score and returns their distance score a/c to missing reqs
  function short_list(scores, max_score) {
    var dist_scores = [];
    scores.map((block, index) => {
      if (block.score == max_score) {
        dist_scores.push(getDistanceScore(block.missing, index));
      }
    });
  
    let min_score = findMin(dist_scores);
  
    let best_blocks = dist_scores.map((obj) => {
      if (obj.dist == min_score) {
        return obj.index;
      }
    });
  
    console.log(best_blocks[0] + 1);
    // console.log(best_blocks);     //for all best blocks
  }
  
  
  //gets the distance scores of block a/c to missing reqs
  function getDistanceScore(missing, index) {
    var dist = 0;
    missing.map((miss_req) => {
      if (index != 0 && index != blocks.length - 1) {
        for (i = 1; i < blocks.length; i++) {
          if (blocks[index - i][miss_req] == true ||blocks[index + i][miss_req] == true) {
            break;
          } else {
            dist++;
          }
        }
      } else if (index == 0) {
        for (i = 1; i < blocks.length; i++) {
          if (blocks[index + i][miss_req] == true) {
            break;
          } else {
            dist++;
          }
        }
      } else {
        for (i = 1; i < blocks.length; i++) {
          if (blocks[index - i][miss_req] == true) {
            break;
          } else {
            dist++;
          }
        }
        // console.log({index:index,dist:dist});
      }
    });
    return { index: index, dist: dist };
  }
  
  
  //finds the min distance of given blocks
  function findMin(arr) {
    var min = arr[0].dist;
    arr.map((ele) => {
      min = min <= ele.dist ? min : ele.dist;
    });
    return min;
  }



  exports.apartmentHunting = apartmentHunting;
  
  
  //Hoping to hear from HR
  //thank you :)