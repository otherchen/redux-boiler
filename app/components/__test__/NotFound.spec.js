import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'

/*
  FrontEnd Testing Stack
  1. Mocha
  2. Chai
  3. Sinon
  4. Enzyme
  5. jsDOM
*/

import NotFound from '../NotFound'

describe('<NotFound />', () => {
  it('contains not found text', () => {
    const wrapper = mount(<NotFound />);
    expect(wrapper.find('h1').text()).to.equal('404 Page Not Found');
  });
  it('calls render', () => {
    spy(NotFound.prototype, 'render');
    const wrapper = mount(<NotFound />);
    expect(NotFound.prototype.render.calledOnce).to.equal(true);
  });
});
