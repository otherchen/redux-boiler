'use strict';

var React = require('react');
var mount = require('enzyme').mount;
var expect = require('chai').expect;
var spy = require('sinon').spy;

/*
  FrontEnd Testing Stack
  1. Mocha
  2. Chai
  3. Sinon
  4. Enzyme
  5. jsDOM
*/

var HelloWorld = require('../HelloWorld.jsx');

describe('<HelloWorld />', function() {
  it('contains hello world text', function() {
    var wrapper = mount(<HelloWorld />);
    expect(wrapper.find('h1').text()).to.equal('Hello World!');
  });
  it('calls render', function() {
    spy(HelloWorld.prototype, 'render');
    var wrapper = mount(<HelloWorld />);
    expect(HelloWorld.prototype.render.calledOnce).to.equal(true);
  });
});
