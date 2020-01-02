import { deepIterator, serialIterator } from '@/utility/iterator';
const data = { 'categories': [
  {
    'subCategories': [
      {
        'subCategories': {
          'categoryId': '810002'
        },
        'subChildCategories': []
      }, {
        'subCategories': {
          'categoryId': '810003'
        },
        'subChildCategories': []
      }, {
        'subCategories': {
          'categoryId': '810004'
        },
        'subChildCategories': []
      }
    ],
    'topLevelCategory': {
      'categoryId': '810001'
    }
  }, {
    'subCategories': [
      {
        'subCategories': {
          'categoryId': '1204'
        },
        'subChildCategories': []
      }, {
        'subCategories': {
          'categoryId': '1172'
        },
        'subChildCategories': []
      }
    ],
    'topLevelCategory': {
      'categoryId': '1205'
    }
  }]
};

describe('Utility for deep lookup into object', () => {
  describe('The "deepIterator" generator function', () => {
    it('must throw an error if not an array given as 1-st argument', () => {
      expect(function () {
        let iter = deepIterator({}).next();
      }).toThrow();
    });

    it('should not iterate empty array', () => {
      let iter = deepIterator([]);
      let index = 0;
      for (let i of iter) {
        index++;
      }
      expect(index).toEqual(0);
    });

    it('should iterate array', () => {
      let arr = [1, 2, 3, 4, 5, 'x'];
      let iter = deepIterator(arr);
      let arr2 = [];

      for (let i of iter) {
        arr2.push(i);
      }
      expect(arr).toEqual(arr2);
    });

    it('should iterate over deep arrays 1 level', () => {
      let arr = [1, 2, 3, 4, {sub: [5, 6]}];
      let iter = deepIterator(arr, ['sub'], true);
      let arr2 = [];

      for (let i of iter) {
        arr2.push(i);
      }
      expect(arr2).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should iterate over deep arrays 1 level with several props', () => {
      let arr = [1, 2, 3, 4, {sub: [5, 6]}, {pub: [7, 8]}];
      let iter = deepIterator(arr, ['sub', 'pub'], true);
      let arr2 = [];

      for (let i of iter) {
        arr2.push(i);
      }
      expect(arr2).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it('should iterate over deep arrays several levels with several props', () => {
      let arr = [1, 2, 3, 4, {sub: [5, {pub: [6, 7]}]}];
      let iter = deepIterator(arr, ['sub', 'pub'], true);
      let arr2 = [];

      for (let i of iter) {
        arr2.push(i);
      }
      expect(arr2).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

  });
  describe('The "serialIterator":', () => {
    it('should accept no arguments', () => {
      let iterator = serialIterator();
      let invoked = false;
      for (let val of iterator) {
        invoked = true;
      }
      expect(invoked).toBeFalsy();
    });

    it('should iterate over array', () => {
      let testData = [1, 2, 3, 4];
      let iterator = serialIterator(testData);
      let result = [];
      for (let val of iterator) {
        result.push(val);
      }
      expect(testData).toEqual(result);
    });

    it('should iterate over any type by making it wrapped into array', () => {
      let iterator = serialIterator(1);
      let result = [];
      for (let val of iterator) {
        result.push(val);
      }
      expect([1]).toEqual(result);
    });

    it('should iterate into inner values for one property', () => {
      let testData = [1, 2, {sub: 3}, 4];
      let iterator = serialIterator(testData, 'sub');
      let result = [];
      for (let val of iterator) {
        result.push(val);
      }
      expect([1, 2, 3, 4]).toEqual(result);
    });

    it('should iterate into inner values for given properties', () => {
      let testData = [1, 2, {sub: 3}, {pub: 4}];
      let iterator = serialIterator(testData, ['sub', 'pub']);
      let result = [];
      for (let val of iterator) {
        result.push(val);
      }
      expect([1, 2, 3, 4]).toEqual(result);
    });

    it('should iterate into inner arrays for given properties', () => {
      let testData = [1, 2, {sub: [3, 4]}];
      let iterator = serialIterator(testData, ['sub', 'pub']);
      let result = [];
      for (let val of iterator) {
        result.push(val);
      }
      expect([1, 2, 3, 4]).toEqual(result);
    });

    it('should iterate into deep arrays for given properties', () => {
      let testData = [1, 2, {sub: [3, {pub: [4]}]}];
      let iterator = serialIterator(testData, ['sub', 'pub']);
      let result = [];
      for (let val of iterator) {
        result.push(val);
      }
      expect([1, 2, 3, 4]).toEqual(result);
    });
  });
});
