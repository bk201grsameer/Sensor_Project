const Heap = require('heap')
// max heap for distance
module.exports.distance_heap = new Heap((a, b) => b.y - a.y)
