import {assert} from 'chai';
import {genereteAnswers} from './answersGen.js';
import {calculatePoints} from './calculate-points';

const arr1 = genereteAnswers(10, {fast: 0, normal: 0, slow: 10});
const arr2 = genereteAnswers(10, {fast: 0, normal: 10, slow: 0});
const arr3 = genereteAnswers(10, {fast: 10, normal: 0, slow: 0});
const arr4 = genereteAnswers(7, {fast: 0, normal: 10, slow: 0});
const arr5 = genereteAnswers(8, {fast: 3, normal: 4, slow: 1})


describe('Result calculation', () => {

  describe('counts correctly', () => {

    it('correctly counts all slow answers', () => {
      assert.equal(calculatePoints(arr1, 3), 650);
    });

    it('correctly counts all normal answers', () => {
      assert.equal(calculatePoints(arr2, 3), 1150);
    });

    it('correctly counts all fast answers', () => {
      assert.equal(calculatePoints(arr3, 3), 1650);
    });

    it('should return -1 if incorrect is 3', () => {
      assert.equal(calculatePoints(arr4, 0), -1);
    });

    it('correctly counts mixed answers', () => {
      assert.equal(calculatePoints(arr5, 2), 1000);
    });




  })
})
