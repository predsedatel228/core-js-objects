/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns shallow copy of an object.
 *
 * @param {Object} obj - an object to copy
 * @return {Object}
 *
 * @example
 *    shallowCopy({a: 2, b: 5}) => {a: 2, b: 5}
 *    shallowCopy({a: 2, b: { a: [1, 2, 3]}}) => {a: 2, b: { a: [1, 2, 3]}}
 *    shallowCopy({}) => {}
 */
function shallowCopy(obj) {
  const newObj = {};
  Object.assign(newObj, obj);
  return newObj;
}

/**
 * Merges array of objects into a single object. If there are overlapping keys, the values
 * should be summed.
 *
 * @param {Object[]} objects - The array of objects to merge
 * @return {Object} - The merged object
 *
 * @example
 *    mergeObjects([{a: 1, b: 2}, {b: 3, c: 5}]) => {a: 1, b: 5, c: 5}
 *    mergeObjects([]) => {}
 */
function mergeObjects(objects) {
  const answer = {};
  const newObj = objects.map((el) => Object.entries(el)).flat();
  for (let i = 0; i < newObj.length - 1; i += 1) {
    for (let t = i + 1; t < newObj.length; t += 1) {
      if (newObj[i][0] === newObj[t][0]) {
        newObj[i][1] += newObj[t][1];
      }
    }
  }
  for (let i = 0; i < newObj.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(answer, newObj[i][0])) {
      const [first, second] = newObj[i];
      answer[first] = second;
    }
  }
  return answer;
}

/**
 * Removes a properties from an object.
 *
 * @param {Object} obj - The object from which to remove the property
 * @param {string[]} keys - The keys of the properties to remove
 * @return {Object} - The object with the specified key removed
 *
 * @example
 *    removeProperties({a: 1, b: 2, c: 3}, ['b', 'c']) => {a: 1}
 *    removeProperties({a: 1, b: 2, c: 3}, ['d', 'e']) => {a: 1, b: 2, c: 3}
 *    removeProperties({name: 'John', age: 30, city: 'New York'}, ['age']) => {name: 'John', city: 'New York'}
 *
 */
function removeProperties(obj, keys) {
  const newObj = obj;
  keys.forEach((el) => delete newObj[el]);
  return obj;
}

/**
 * Compares two source objects. Returns true if the objects are equal and false otherwise.
 * There are no nested objects.
 *
 * @param {Object} obj1 - The first object to compare
 * @param {Object} obj2 - The second object to compare
 * @return {boolean} - True if the objects are equal, false otherwise
 *
 * @example
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 2}) => true
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 3}) => false
 */
function compareObjects(obj1, obj2) {
  let answer = true;
  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);
  if (keysObj1.length !== keysObj2.length) answer = false;

  for (let i = 0; i < keysObj1.length; i += 1) {
    if (obj1[keysObj1[i]] !== obj2[keysObj1[i]]) answer = false;
  }

  return answer;
}

/**
 * Checks if the source object is empty.
 * Returns true if the object contains no enumerable own properties, false otherwise.
 *
 * @param {Object} obj - The object to check
 * @return {boolean} - True if the object is empty, false otherwise
 *
 * @example
 *    isEmptyObject({}) => true
 *    isEmptyObject({a: 1}) => false
 */
function isEmptyObject(obj) {
  let answer = false;
  if (Object.keys(obj).length === 0) answer = true;
  return answer;
}

/**
 * Makes the source object immutable by preventing any changes to its properties.
 *
 * @param {Object} obj - The source object to make immutable
 * @return {Object} - The immutable version of the object
 *
 * @example
 *    const obj = {a: 1, b: 2};
 *    const immutableObj = makeImmutable(obj);
 *    immutableObj.a = 5;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    delete immutableObj.a;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    immutableObj.newProp = 'new';
 *    console.log(immutableObj) => {a: 1, b: 2}
 */
function makeImmutable(obj) {
  return Object.freeze(obj);
}

/**
 * Returns a word from letters whose positions are provided as an object.
 *
 * @param {Object} lettersObject - An object where keys are letters and values are arrays of positions
 * @return {string} - The constructed word
 *
 * @example
 *    makeWord({ a: [0, 1], b: [2, 3], c: [4, 5] }) => 'aabbcc'
 *    makeWord({ H:[0], e: [1], l: [2, 3, 8], o: [4, 6], W:[5], r:[7], d:[9]}) => 'HelloWorld'
 */
function makeWord(lettersObject) {
  const lettersArr = Object.values(lettersObject).flat();
  Object.keys(lettersObject).forEach((letter) => {
    lettersObject[letter].forEach((el) => {
      lettersArr[el] = letter;
    });
  });
  return lettersArr.join('');
}

/**
 * There is a queue for tickets to a popular movie.
 * The ticket seller sells one ticket at a time strictly in order and give the change.
 * The ticket costs 25. Customers pay with bills of 25, 50, or 100.
 * Initially the seller has no money for change.
 * Return true if the seller can sell tickets, false otherwise
 *
 * @param {number[]} queue - The array representing the bills each customer pays with
 * @return {boolean} - True if the seller can sell tickets to everyone, false otherwise
 *
 * @example
 *    sellTickets([25, 25, 50]) => true
 *    sellTickets([25, 100]) => false (The seller does not have enough money to give change.)
 */
function sellTickets(queue) {
  let twentyFive = 0;
  let fifty = 0;

  for (let i = 0; i < queue.length; i += 1) {
    const bill = queue[i];

    switch (bill) {
      case 25:
        twentyFive += 1;
        break;

      case 50:
        if (twentyFive === 0) {
          return false;
        }
        twentyFive -= 1;
        fifty += 1;
        break;

      case 100:
        if (fifty > 0 && twentyFive > 0) {
          fifty -= 1;
          twentyFive -= 1;
        } else if (twentyFive >= 3) {
          twentyFive -= 3;
        } else {
          return false;
        }
        break;
      default:
    }
  }

  return true;
}

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  return {
    width,
    height,
    getArea() {
      return this.width * this.height;
    },
  };
}

/**
 * Returns the JSON representation of specified object
 *
 * @param {Object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { height: 10, width: 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {Object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const protoObj = JSON.parse(json);
  const obj = Object.create(proto);
  Object.keys(protoObj).forEach((el) => {
    obj[el] = protoObj[el];
  });
  return obj;
}

/**
 * Sorts the specified array by country name first and city name
 * (if countries are equal) in ascending order.
 *
 * @typedef {{
 * country: string,
 * city: string
 * }} GeoEntity
 *
 * @param {GeoEntity[]} arr
 * @return {GeoEntity[]}
 *
 * @example
 *    [
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Saint Petersburg' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Belarus', city: 'Brest' }
 *    ]
 *                      =>
 *    [
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Russia',  city: 'Saint Petersburg' }
 *    ]
 */
function sortCitiesArray(arr) {
  const newArr = arr.sort((a, b) => {
    if (a.country > b.country) {
      return 1;
    }
    if (a.country < b.country) {
      return -1;
    }
    if (a.country === b.country) {
      if (a.city > b.city) {
        return 1;
      }
      if (a.city < b.city) {
        return -1;
      }
      return 0;
    }
    return arr;
  });
  return newArr;
}

/**
 * Groups elements of the specified array by key.
 * Returns multimap of keys extracted from array elements via keySelector callback
 * and values extracted via valueSelector callback.
 * See: https://en.wikipedia.org/wiki/Multimap
 *
 * @typedef {{
 * country: string,
 * city: string
 * }} GeoEntity
 *
 * @param {GeoEntity[]} array
 * @param {(item: GeoEntity) => string} keySelector
 * @param {(item: GeoEntity) => string} valueSelector
 * @return {Map<string, string[]>}
 *
 * @example
 *   group([
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Russia', city: 'Omsk' },
 *      { country: 'Russia', city: 'Samara' },
 *      { country: 'Belarus', city: 'Grodno' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland', city: 'Lodz' }
 *     ],
 *     item => item.country,
 *     item => item.city
 *   )
 *            =>
 *   Map {
 *    "Belarus" => ["Brest", "Grodno", "Minsk"],
 *    "Russia" => ["Omsk", "Samara"],
 *    "Poland" => ["Lodz"]
 *   }
 */
function group(array, keySelector, valueSelector) {
  const keys = array.map(keySelector);
  const values = array.map(valueSelector);
  const map = new Map();
  keys.filter((el, index) => {
    if (!map.has(el)) {
      map.set(el, [values[index]]);
    } else {
      const value = map.get(el);
      value.push(values[index]);
      map.set(el, value);
    }
    return el;
  });
  return map;
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

class CssSelector {
  constructor(value = null, type = null) {
    this.parts = {};
    this.hasElement = false;
    this.hasId = false;
    this.hasPseudoElement = false;
    this.lastAdded = null;
    this.combined = null;

    if (value !== null && type !== null) {
      this.addPart(type, value);

      if (type === 'element') {
        this.hasElement = true;
      } else if (type === 'id') {
        this.hasId = true;
      } else if (type === 'pseudoElement') {
        this.hasPseudoElement = true;
      }

      this.lastAdded = type;
    }
  }

  element(value) {
    this.validateOrder('element');
    if (this.hasElement) {
      throw new Error(
        'Element, id and pseudo-element should not occur more than one time inside the selector'
      );
    }
    this.addPart('element', value);
    this.hasElement = true;
    this.lastAdded = 'element';
    return this;
  }

  id(value) {
    this.validateOrder('id');
    if (this.hasId) {
      throw new Error(
        'Element, id and pseudo-element should not occur more than one time inside the selector'
      );
    }
    this.addPart('id', value);
    this.hasId = true;
    this.lastAdded = 'id';
    return this;
  }

  class(value) {
    this.validateOrder('class');
    this.addPart('class', value);
    this.lastAdded = 'class';
    return this;
  }

  attr(value) {
    this.validateOrder('attr');
    this.addPart('attr', value);
    this.lastAdded = 'attr';
    return this;
  }

  pseudoClass(value) {
    this.validateOrder('pseudoClass');
    this.addPart('pseudoClass', value);
    this.lastAdded = 'pseudoClass';
    return this;
  }

  pseudoElement(value) {
    this.validateOrder('pseudoElement');
    if (this.hasPseudoElement) {
      throw new Error(
        'Element, id and pseudo-element should not occur more than one time inside the selector'
      );
    }
    this.addPart('pseudoElement', value);
    this.hasPseudoElement = true;
    this.lastAdded = 'pseudoElement';
    return this;
  }

  combine(combinator, selector) {
    const combined = new CssSelector();
    combined.combined = {
      selector1: this,
      combinator,
      selector2: selector,
    };
    return combined;
  }

  stringify() {
    if (this.combined) {
      const selector1Str = this.combined.selector1.stringify();
      const selector2Str = this.combined.selector2.stringify();
      return `${selector1Str} ${this.combined.combinator} ${selector2Str}`;
    }

    let result = '';

    const outputOrder = [
      'element',
      'id',
      'class',
      'attr',
      'pseudoClass',
      'pseudoElement',
    ];

    outputOrder.forEach((type) => {
      if (this.parts[type]) {
        let prefix = '';
        let suffix = '';

        switch (type) {
          case 'element':
            prefix = '';
            break;
          case 'id':
            prefix = '#';
            break;
          case 'class':
            prefix = '.';
            break;
          case 'attr':
            prefix = '[';
            suffix = ']';
            break;
          case 'pseudoClass':
            prefix = ':';
            break;
          case 'pseudoElement':
            prefix = '::';
            break;
          default:
            prefix = '';
        }

        this.parts[type].forEach((value) => {
          result += `${prefix}${value}${suffix}`;
        });
      }
    });

    return result;
  }

  addPart(type, value) {
    if (!this.parts[type]) {
      this.parts[type] = [];
    }
    this.parts[type].push(value);
  }

  validateOrder(nextType) {
    const order = [
      'element',
      'id',
      'class',
      'attr',
      'pseudoClass',
      'pseudoElement',
    ];
    const currentIndex = order.indexOf(this.lastAdded);
    const nextIndex = order.indexOf(nextType);

    if (currentIndex > nextIndex) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
  }
}

const cssSelectorBuilder = {
  element(value) {
    return new CssSelector(value, 'element');
  },

  id(value) {
    return new CssSelector(value, 'id');
  },

  class(value) {
    return new CssSelector(value, 'class');
  },

  attr(value) {
    return new CssSelector(value, 'attr');
  },

  pseudoClass(value) {
    return new CssSelector(value, 'pseudoClass');
  },

  pseudoElement(value) {
    return new CssSelector(value, 'pseudoElement');
  },

  combine(selector1, combinator, selector2) {
    const combined = new CssSelector();
    combined.combined = { selector1, combinator, selector2 };
    return combined;
  },
};

module.exports = {
  shallowCopy,
  mergeObjects,
  removeProperties,
  compareObjects,
  isEmptyObject,
  makeImmutable,
  makeWord,
  sellTickets,
  Rectangle,
  getJSON,
  fromJSON,
  group,
  sortCitiesArray,
  cssSelectorBuilder,
};
